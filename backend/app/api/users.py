from fastapi import APIRouter
from fastapi import Depends

from app.schemas.user import UserResponse
from app.services.current_user import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me", response_model=UserResponse)
def me(current_user=Depends(get_current_user)):

    return current_user
