from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


def register_user(db: Session, user: UserRegister):

    existing = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing:
        raise ValueError("Email already registered")

    db_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password),
        phone=user.phone,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def login_user(db: Session, email: str, password: str):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if user is None:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user.password_hash):
        raise ValueError("Invalid email or password")

    token = create_access_token(
        {
            "sub": user.email,
            "user_id": user.id,
            "role": user.role,
        }
    )

    return token