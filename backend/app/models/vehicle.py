from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class Vehicle(Base):

    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True)

    driver_id: Mapped[int] = mapped_column(
        ForeignKey("drivers.id"),
        unique=True
    )

    brand: Mapped[str] = mapped_column(String(50))

    model: Mapped[str] = mapped_column(String(50))

    color: Mapped[str] = mapped_column(String(30))

    plate_number: Mapped[str] = mapped_column(
        String(30),
        unique=True
    )

    driver = relationship("Driver")