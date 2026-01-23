from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.db.database import get_db
from app.models.goal import Goal as GoalModel
from app.schemas.goal import Goal, GoalCreate, GoalUpdate

router = APIRouter()

@router.post("/", response_model=Goal, status_code=201)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    db_goal = GoalModel(**goal.dict())
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.get("/", response_model=List[Goal])
def read_goals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    goals = db.query(GoalModel).offset(skip).limit(limit).all()
    return goals

@router.get("/{goal_id}", response_model=Goal)
def read_goal(goal_id: str, db: Session = Depends(get_db)):
    db_goal = db.query(GoalModel).filter(GoalModel.id == goal_id).first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return db_goal

@router.patch("/{goal_id}", response_model=Goal)
def update_goal(goal_id: str, goal: GoalUpdate, db: Session = Depends(get_db)):
    db_goal = db.query(GoalModel).filter(GoalModel.id == goal_id).first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    update_data = goal.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_goal, key, value)
        
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.delete("/{goal_id}", status_code=204)
def delete_goal(goal_id: str, db: Session = Depends(get_db)):
    db_goal = db.query(GoalModel).filter(GoalModel.id == goal_id).first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(db_goal)
    db.commit()
    return
