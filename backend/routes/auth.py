from fastapi import APIRouter
from pydantic import BaseModel
from database.db import get_connection

router = APIRouter()

class User(BaseModel):
    username: str
    password: str


@router.post("/signup")
def signup(user: User):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (user.username, user.password)
        )
        conn.commit()
        return {"message": "User created"}

    except:
        return {"message": "User already exists"}

    finally:
        conn.close()


@router.post("/login")
def login(user: User):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (user.username, user.password)
    )

    result = cursor.fetchone()
    conn.close()

    if result:
        return {"message": "Login successful", "user_id": user.username}
    else:
        return {"message": "Invalid credentials"}