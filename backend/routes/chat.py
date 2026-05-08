from fastapi import APIRouter
from pydantic import BaseModel
from core.ai_client import client

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(req: ChatRequest):

    try:

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": req.message
                }
            ]
        )

        return {
            "reply": completion.choices[0].message.content
        }

    except Exception as e:

        return {
            "error": str(e)
        }