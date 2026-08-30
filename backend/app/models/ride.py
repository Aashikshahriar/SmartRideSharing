from datetime import datetime

from sqlalchemy import (
    Float,
    String,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base


class Ride(Base):

    __tablename__ = "rides"

    id: Mapped[int] = mapped_column(primary_key=True)

    passenger_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    driver_id: Mapped[int | None] = mapped_column(
        ForeignKey("drivers.id"),
        nullable=True,
    )

    pickup_lat: Mapped[float] = mapped_column(Float)

    pickup_lon: Mapped[float] = mapped_column(Float)

    destination_lat: Mapped[float] = mapped_column(Float)

    destination_lon: Mapped[float] = mapped_column(Float)

    distance_km: Mapped[float] = mapped_column(Float)

    estimated_duration: Mapped[float] = mapped_column(Float)

    fare: Mapped[float] = mapped_column(Float)

    status: Mapped[str] = mapped_column(
        String(20),
        default="REQUESTED"
    )

    requested_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    accepted_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )