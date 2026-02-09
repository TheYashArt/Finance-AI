from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import json
import uuid

from app.db.database import get_db
from app.services.ai_service import AIService
from app.models.chat import (
    RAGChatSession, RAGChatMessage,
    AvatarChatSession, AvatarChatMessage,
    DashboardChatSession, DashboardChatMessage
)
from app.schemas.chat import ChatSession as ChatSessionSchema, ChatMessage as ChatMessageSchema, ChatSessionCreate, ChatSessionUpdate

router = APIRouter()
ai_service = AIService()

class ChatRequest(BaseModel):
    message: str
    mode: str = "chat" # This is for AI behavior (e.g. chat vs implementation)

def get_chat_models(section: str):
    section = section.lower()
    if section == "avatar":
        return AvatarChatSession, AvatarChatMessage
    elif section == "dashboard":
        return DashboardChatSession, DashboardChatMessage
    else: # Default to RAG
        return RAGChatSession, RAGChatMessage

# --- Sessions ---

@router.get("/sessions", response_model=List[ChatSessionSchema])
def get_sessions(section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, _ = get_chat_models(section)
    return db.query(SessionModel).order_by(SessionModel.updated_at.desc()).all()

@router.post("/sessions", response_model=ChatSessionSchema)
def create_session(session: ChatSessionCreate, section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, _ = get_chat_models(section)
    db_session = SessionModel(title=session.title)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.patch("/sessions/{session_id}", response_model=ChatSessionSchema)
def update_session(session_id: str, session: ChatSessionUpdate, section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, _ = get_chat_models(section)
    db_session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db_session.title = session.title
    db.commit()
    db.refresh(db_session)
    return db_session

@router.delete("/sessions/{session_id}", status_code=204)
def delete_session(session_id: str, section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, _ = get_chat_models(section)
    db_session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(db_session)
    db.commit()
    return

@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessageSchema])
def get_messages(session_id: str, section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, MessageModel = get_chat_models(section)
    # Verify session exists in this section
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
         raise HTTPException(status_code=404, detail="Session not found")

    return db.query(MessageModel).filter(MessageModel.session_id == session_id).order_by(MessageModel.created_at).all()

# --- Chat ---

@router.post("/chat/{session_id}")
async def chat(session_id: str, request: ChatRequest, section: str = Query("rag"), db: Session = Depends(get_db)):
    SessionModel, MessageModel = get_chat_models(section)

    # Verify session exists
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Save User Message
    user_msg = MessageModel(session_id=session_id, role="user", content=request.message)
    db.add(user_msg)
    db.commit()

    # Fetch recent history for context (last 10 messages, excluding current user msg)
    history = db.query(MessageModel).filter(
        MessageModel.session_id == session_id,
        MessageModel.id != user_msg.id
    ).order_by(MessageModel.created_at.desc()).limit(10).all()
    history = history[::-1] # Reverse to chronological order

    def event_generator():
        full_response = ""
        try:
            # Pass section and history to AI service
            for chunk in ai_service.generate_stream(request.message, db, section, history):
                full_response += chunk
                payload = json.dumps({"content": chunk})
                yield f"data: {payload}\n\n"
            
            # Save Assistant Message after stream completes
            assistant_msg = MessageModel(session_id=session_id, role="assistant", content=full_response)
            db.add(assistant_msg)
            db.commit()
            
            # Update session timestamp
            session.updated_at = assistant_msg.created_at
            db.commit()

            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {{\"error\": \"{str(e)}\"}}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
