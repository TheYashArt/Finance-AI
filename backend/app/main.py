from fastapi import FastAPI, Depends, HTTPException, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.api.v1.routes import categories, transactions, goals, recurring, ai
from app.db.database import engine, Base

load_dotenv()

# This will create the tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance AI API", version="1.0")

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For personal use - open to all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Routers (No auth required for personal use) ---
api_v1_router = APIRouter()
api_v1_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_v1_router.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
api_v1_router.include_router(goals.router, prefix="/goals", tags=["Goals"])
api_v1_router.include_router(recurring.router, prefix="/recurring", tags=["Recurring Expenses"])
api_v1_router.include_router(ai.router, prefix="/ai", tags=["AI"])

app.include_router(api_v1_router, prefix="/api/v1")


# --- Health Checks ---
@app.get("/_health/live", tags=["Health"])
def health_live():
    return {"status": "ok"}

@app.get("/_health/ready", tags=["Health"])
def health_ready():
    # In a real app, you might check db connection here
    return {"status": "ready"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance AI API"}