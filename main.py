```python
from fastapi import FastAPI, HTTPException
from supabase import create_client
import os

# Load environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="Sweetflips Control Panel API")

@app.get("/")
async def healthcheck():
    return {"status": "ok"}

@app.get("/messages")
async def get_messages(limit: int = 100):
    response = (
        supabase.table("Telegram")
        .select("*")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return response.data

@app.post("/send")
async def send_reply(chat_name: str, sender_username: str, message: str):
    payload = {
        "chat_name": chat_name,
        "sender_username": sender_username,
        "message": message,
        "account_source": "Amor"
    }
    res = supabase.table("Telegram").insert(payload).execute()
    if res.status_code not in (200, 201):
        raise HTTPException(status_code=500, detail="Insert failed")
    return {"inserted": res.data}
