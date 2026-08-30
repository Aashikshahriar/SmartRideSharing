from datetime import datetime

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(
        String(120),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(String(255))

    phone: Mapped[str] = mapped_column(String(30))

    role: Mapped[str] = mapped_column(
        String(20),
        default="passenger"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationship
    driver = relationship(
        "Driver",
        back_populates="user",
        uselist=False
    )