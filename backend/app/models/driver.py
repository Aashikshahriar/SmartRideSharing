from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class Driver(Base):

    __tablename__ = "drivers"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
    )

    license_number: Mapped[str]

    nid: Mapped[str]

    is_online: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    current_lat: Mapped[float] = mapped_column(
        Float,
        default=23.8103
    )

    current_lon: Mapped[float] = mapped_column(
        Float,
        default=90.4125
    )

    # ---------- AI FEATURES ----------

    rating: Mapped[float] = mapped_column(
        Float,
        default=5.0
    )

    total_trips: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    acceptance_rate: Mapped[float] = mapped_column(
        Float,
        default=1.0
    )

    idle_minutes: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationship
    user = relationship(
        "User",
        back_populates="driver"
    )