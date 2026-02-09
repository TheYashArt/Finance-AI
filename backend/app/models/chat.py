from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship, declared_attr
from datetime import datetime
import uuid
from app.db.database import Base

class ChatSessionMixin(object):
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, default="New Chat")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ChatMessageMixin(object):
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    role = Column(String, nullable=False) # user, assistant
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# RAG
class RAGChatSession(Base, ChatSessionMixin):
    __tablename__ = "rag_chat_sessions"
    messages = relationship("RAGChatMessage", back_populates="session", cascade="all, delete-orphan")

class RAGChatMessage(Base, ChatMessageMixin):
    __tablename__ = "rag_chat_messages"
    session_id = Column(String, ForeignKey("rag_chat_sessions.id"), nullable=False)
    session = relationship("RAGChatSession", back_populates="messages")

# Avatar
class AvatarChatSession(Base, ChatSessionMixin):
    __tablename__ = "avatar_chat_sessions"
    messages = relationship("AvatarChatMessage", back_populates="session", cascade="all, delete-orphan")

class AvatarChatMessage(Base, ChatMessageMixin):
    __tablename__ = "avatar_chat_messages"
    session_id = Column(String, ForeignKey("avatar_chat_sessions.id"), nullable=False)
    session = relationship("AvatarChatSession", back_populates="messages")

# Dashboard
class DashboardChatSession(Base, ChatSessionMixin):
    __tablename__ = "dashboard_chat_sessions"
    messages = relationship("DashboardChatMessage", back_populates="session", cascade="all, delete-orphan")

class DashboardChatMessage(Base, ChatMessageMixin):
    __tablename__ = "dashboard_chat_messages"
    session_id = Column(String, ForeignKey("dashboard_chat_sessions.id"), nullable=False)
    session = relationship("DashboardChatSession", back_populates="messages")
