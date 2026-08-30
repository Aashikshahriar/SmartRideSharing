from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.schemas.user import (
    UserRegister,
    UserResponse,
)

from app.schemas.user import UserLogin
from app.schemas.user import Token

from app.services.auth_service import login_user

from app.services.auth_service import register_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):

    try:

        return register_user(db, user)

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):

    try:

        token = login_user(
            db,
            user.email,
            user.password,
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )