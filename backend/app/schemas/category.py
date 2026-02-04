from pydantic import BaseModel
import uuid
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    is_income: bool = False

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    is_income: Optional[bool] = None

class Category(CategoryBase):
    id: uuid.UUID

    class Config:
        orm_mode = True