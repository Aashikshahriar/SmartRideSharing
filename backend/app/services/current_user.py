from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.core.dependencies import oauth2_scheme

from app.core.security import decode_access_token

from app.models.user import User


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):

    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = (
        db.query(User)
        .filter(User.email == payload["sub"])
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user


def get_current_user_optional(
    request: Request,
    db: Session = Depends(get_db),
):

    auth = request.headers.get("Authorization")

    if not auth or not auth.lower().startswith("bearer "):
        return None

    payload = decode_access_token(auth.split(" ", 1)[1])

    if payload is None:
        return None

    return (
        db.query(User)
        .filter(User.email == payload["sub"])
        .first()
    )