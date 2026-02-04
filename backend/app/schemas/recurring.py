from pydantic import BaseModel
from typing import Optional
import datetime

class RecurringExpenseBase(BaseModel):
    name: str
    amount: float
    frequency: str
    next_due_date: datetime.datetime
    is_active: Optional[bool] = True

class RecurringExpenseCreate(RecurringExpenseBase):
    pass

class RecurringExpenseUpdate(BaseModel):
    name: Optional[str] = None
    amount: Optional[float] = None
    frequency: Optional[str] = None
    next_due_date: Optional[datetime.datetime] = None
    is_active: Optional[bool] = None

class RecurringExpense(RecurringExpenseBase):
    id: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True