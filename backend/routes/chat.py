from core.ai_engine import generate_response
from memory.store import save_memory
from database.db import conn

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(req: ChatRequest):
    reply = generate_response(req.message)
    return {"reply": reply}