# Finance AI - Personal Finance Dashboard with AI Chat

A modern, minimalist personal finance application featuring a real-time AI assistant that can track expenses, create goals, and answer financial queries in Indian Rupees (₹).

![Finance AI Screenshot](https://via.placeholder.com/800x400?text=Finance+AI+Dashboard+Preview)

## 🚀 Features

### 1. AI Financial Assistant
- **Smart Chat**: Powered by **Llama 3.1**, the AI understands natural language.
- **Actionable**: Can perform actions like "Add a transaction for Coffee ₹20" or "Create a goal for Vacation ₹50,000".
- **Intelligent Categorization**: Automatically detects categories (e.g., "Uber" -> Transport) or asks for clarification if unsure.
- **Localized**: Fully optimized for Indian context (₹ currency, understands "Chai", "Ola", etc.).
- **Context Aware**: Knows your recent transactions and goals to provide personalized advice.

### 2. Dashboard & Analytics
- **Overview**: Real-time summary of Total Balance, Income, and Expenses.
- **Visualizations**: Interactive charts for Income vs. Expense trends and Category breakdowns.
- **Recent Activity**: Quick view of latest transactions.

### 3. Financial Management
- **Transactions**: Full CRUD (Create, Read, Update, Delete) support for income and expenses.
- **Goals**: Track progress towards financial targets with visual progress bars.
- **Recurring**: Manage monthly subscriptions and bills.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
1.  **Node.js** (v18 or higher)
2.  **Python** (v3.10 or higher)
3.  **Ollama** (for local AI model)
4.  **Git** (for version control)

---

## 📦 Installation Guide

### 1. Setup AI Model (Ollama)
Install Ollama from [ollama.com](https://ollama.com) then run this command to pull the model:
```bash
ollama pull gemma2:2b
```
*Note: Keep Ollama running in the background (`ollama serve`).*

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/finance-ai.git
cd finance-ai
```

### 3. Backend Setup
Navigate to the `backend` folder and set up the Python environment:
```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate Virtual Environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Initialize the database
python init_db.py
```

### 4. Frontend Setup
Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

### 5. .env setup
Create a .env file in backend folder and copy paste the following content
```bash
DATABASE_URL = "sqlite:///./finance.db"
OLLAMA_MODEL=gemma2:2b
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TOKEN=your_token_here
```

create a another .env file in frontend folder and copy paste the following content
``` bash 
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TOKEN=your_token_here
```


---

## ▶️ Running the Application

You need to run both the backend and frontend servers simultaneously in **two separate terminals**.

### Terminal 1: Backend Server
```bash
cd backend
# Ensure venv is activated (should see (venv) in terminal)
# If not activated: .\venv\Scripts\activate
uvicorn app.main:app --reload
```
*Backend runs on: `http://localhost:8000`*

### Terminal 2: Frontend Client
```bash
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---


## ❓ Troubleshooting

- **Ollama Error**: If the chat says "Model not found", ensure you ran `ollama pull llama3.1:8b` and that Ollama is running in the system tray.
- **Database Error**: If you see database errors, delete `finance.db` in the backend folder and run `python init_db.py` again.
- **CORS Error**: If the frontend cannot talk to the backend, check if the backend URL in `frontend/src/services/api.js` matches `http://localhost:8000`.

---

## 💡 tips 
- **Frontend**: Use login name 'admin' to access the training page

## 💡 Tech Stack
- **Frontend**: React, Tailwind CSS v4, Zustand, Recharts, Lucide React.
- **Backend**: FastAPI, SQLAlchemy (SQLite), Ollama.
