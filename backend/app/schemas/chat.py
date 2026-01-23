from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ChatMessageBase(BaseModel):
    role: str
    content: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessage(ChatMessageBase):
    id: str
    session_id: str
    created_at: datetime

    class Config:
        orm_mode = True

class ChatSessionBase(BaseModel):
    title: str

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSessionUpdate(BaseModel):
    title: str

class ChatSession(ChatSessionBase):
    id: str
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessage] = []

    class Config:
        orm_mode = True
