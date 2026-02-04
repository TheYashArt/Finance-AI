from sqlalchemy import Column, String, DateTime, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid
from datetime import datetime
import enum
from app.db.database import Base

class JobStatus(str, enum.Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    STOPPED = "stopped"

class TrainingJob(Base):
    __tablename__ = "training_jobs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    status = Column(SQLEnum(JobStatus), default=JobStatus.PENDING, nullable=False)
    dataset_path = Column(String, nullable=True)
    config = Column(JSON, nullable=True)
    metrics = Column(JSON, nullable=True)
    model_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)
