import ollama
import os
import json
from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.models.goal import Goal
from app.models.recurring import RecurringExpense
from app.models.category import Category

class AIService:
    def __init__(self):
        self.model = os.getenv("OLLAMA_MODEL", "llama3.1:8b")

    def build_context(self, db: Session) -> str:
        # Fetch recent transactions (last 10)
        transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(10).all()
        tx_str = "\n".join([f"- {t.date.date()}: {t.description} ({t.amount})" for t in transactions])

        # Fetch goals
        goals = db.query(Goal).all()
        goals_str = "\n".join([f"- {g.name}: {g.current_amount}/{g.target_amount} (Due: {g.deadline})" for g in goals])

        # Fetch recurring
        recurring = db.query(RecurringExpense).all()
        rec_str = "\n".join([f"- {r.name}: {r.amount} ({r.frequency})" for r in recurring])

        # Fetch categories
        categories = db.query(Category).all()
        cat_str = "\n".join([f"- '{c.name}' (ID: {c.id})" for c in categories])

        context = f"""
You are a fast and helpful financial assistant for an INDIAN user. Currency is always INR (₹).

Recent Transactions:
{tx_str}

Financial Goals:
{goals_str}

Recurring Expenses:
{rec_str}

Available Categories:
{cat_str}

INSTRUCTIONS:
1. BE PROACTIVE: When user says something like "add expense food 100" or "spent 100 on food", just DO IT immediately.
2. DO NOT ask unnecessary questions. If user gives amount and category, act immediately.
3. For simple commands, infer missing details intelligently:
   - "add food 100" -> amount=100, description="food", find category with name containing "food"
   - "spent 500 on groceries" -> amount=-500, description="groceries", find matching category
   - "add expense chai 50" -> amount=-50, description="chai", use food category

4. ONLY ask questions if critical info is truly missing (like amount or description).

5. When executing an action, output JSON wrapped in markdown code blocks:

For adding expense/transaction:
```json
{{
  "action": "add_transaction",
  "data": {{
    "amount": -100,
    "description": "food",
    "category_id": "USE_ACTUAL_UUID_FROM_CATEGORIES"
  }}
}}
```

For adding income:
```json
{{
  "action": "add_transaction", 
  "data": {{
    "amount": 5000,
    "description": "salary",
    "category_id": "USE_ACTUAL_UUID_FROM_CATEGORIES"
  }}
}}
```

For creating goals:
```json
{{
  "action": "create_goal",
  "data": {{
    "name": "Vacation",
    "target_amount": 50000
  }}
}}
```

IMPORTANT RULES:
- Expenses are NEGATIVE amounts, Income is POSITIVE
- ALWAYS use actual UUID from Available Categories list
- If category name contains what user said (food, transport, etc), use that ID
- Respond naturally but take action immediately when possible
- DO NOT output JSON for read-only queries (like "how much did I spend")
"""
        return context

    def generate_stream(self, prompt: str, db: Session):
        context = self.build_context(db)
        full_prompt = f"{context}\n\nUser: {prompt}\nAssistant:"
        
        stream = ollama.chat(
            model=self.model,
            messages=[{'role': 'user', 'content': full_prompt}],
            stream=True,
        )

        for chunk in stream:
            yield chunk['message']['content']
