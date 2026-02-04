from pydantic import BaseModel
from typing import Optional
import datetime

class GoalBase(BaseModel):
    name: str
    target_amount: float
    current_amount: Optional[float] = 0.0
    deadline: Optional[datetime.datetime] = None

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    name: Optional[str] = None
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None
    deadline: Optional[datetime.datetime] = None

class Goal(GoalBase):
    id: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True