from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.services.current_user import get_current_user_optional

from app.schemas.chatbot import (

    ChatRequest,

    ChatResponse,

)

from app.chatbot.service import (

    chatbot,

)

router = APIRouter(

    prefix="/chatbot",

    tags=["AI Chatbot"],

)


@router.post(
    "/chat",
    response_model=ChatResponse,
)
def chat(

    request: ChatRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user_optional),

):

    answer = chatbot.chat(

        request.message,

        db,

        current_user,

    )

    return {

        "response": answer

    }
