from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.database.base import Base


class FraudLog(Base):

    __tablename__ = "fraud_logs"

    id: Mapped[int] = mapped_column(primary_key=True)

    ride_id: Mapped[int] = mapped_column(
        ForeignKey("rides.id")
    )

    fraud: Mapped[bool] = mapped_column(Boolean)

    risk_score: Mapped[float] = mapped_column(Float)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )