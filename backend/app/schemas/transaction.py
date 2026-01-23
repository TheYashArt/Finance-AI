from pydantic import BaseModel
import uuid
import datetime
from typing import Optional

class TransactionBase(BaseModel):
    amount: float
    description: str
    date: datetime.datetime
    category_id: uuid.UUID
    notes: Optional[str] = None
    receipt_url: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    description: Optional[str] = None
    date: Optional[datetime.datetime] = None
    category_id: Optional[uuid.UUID] = None
    notes: Optional[str] = None
    receipt_url: Optional[str] = None

class Transaction(TransactionBase):
    id: uuid.UUID

    class Config:
        orm_mode = True