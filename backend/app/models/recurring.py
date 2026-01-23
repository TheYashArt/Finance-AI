from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.database import Base
import uuid

class RecurringExpense(Base):
    __tablename__ = "recurring_expenses"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    amount = Column(Float)
    frequency = Column(String) # e.g., "Monthly", "Weekly"
    next_due_date = Column(DateTime)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())