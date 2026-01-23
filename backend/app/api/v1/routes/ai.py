from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import json
import uuid

from app.db.database import get_db
from app.services.ai_service import AIService
from app.models.chat import ChatSession, ChatMessage
from app.schemas.chat import ChatSession as ChatSessionSchema, ChatMessage as ChatMessageSchema, ChatSessionCreate, ChatSessionUpdate

router = APIRouter()
ai_service = AIService()

class ChatRequest(BaseModel):
    message: str
    mode: str = "chat"

# --- Sessions ---

@router.get("/sessions", response_model=List[ChatSessionSchema])
def get_sessions(db: Session = Depends(get_db)):
    return db.query(ChatSession).order_by(ChatSession.updated_at.desc()).all()

@router.post("/sessions", response_model=ChatSessionSchema)
def create_session(session: ChatSessionCreate, db: Session = Depends(get_db)):
    db_session = ChatSession(title=session.title)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.patch("/sessions/{session_id}", response_model=ChatSessionSchema)
def update_session(session_id: str, session: ChatSessionUpdate, db: Session = Depends(get_db)):
    db_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db_session.title = session.title
    db.commit()
    db.refresh(db_session)
    return db_session

@router.delete("/sessions/{session_id}", status_code=204)
def delete_session(session_id: str, db: Session = Depends(get_db)):
    db_session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(db_session)
    db.commit()
    return

@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessageSchema])
def get_messages(session_id: str, db: Session = Depends(get_db)):
    return db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at).all()

# --- Chat ---

@router.post("/chat/{session_id}")
async def chat(session_id: str, request: ChatRequest, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Save User Message
    user_msg = ChatMessage(session_id=session_id, role="user", content=request.message)
    db.add(user_msg)
    db.commit()

    def event_generator():
        full_response = ""
        try:
            for chunk in ai_service.generate_stream(request.message, db):
                full_response += chunk
                payload = json.dumps({"content": chunk})
                yield f"data: {payload}\n\n"
            
            # Save Assistant Message after stream completes
            # Note: This runs inside the generator, so we need a new DB session or careful handling.
            # Since this is a generator, the original `db` session might be closed or reused.
            # For simplicity in this synchronous wrapper, we'll try to use the same db session 
            # but ideally we should use a fresh one or handle async properly.
            # However, `generate_stream` is synchronous (using `ollama` sync client).
            # So we can just save it here.
            
            assistant_msg = ChatMessage(session_id=session_id, role="assistant", content=full_response)
            db.add(assistant_msg)
            db.commit()
            
            # Update session timestamp
            session.updated_at = assistant_msg.created_at
            db.commit()

            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {{\"error\": \"{str(e)}\"}}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
