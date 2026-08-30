from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle


def get_by_driver_id(db: Session, driver_id: int):

    stmt = select(Vehicle).where(
        Vehicle.driver_id == driver_id
    )

    return db.execute(stmt).scalar_one_or_none()


def create(db: Session, vehicle: Vehicle):

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle


def update(db: Session):

    db.commit()


def delete(db: Session, vehicle: Vehicle):

    db.delete(vehicle)
    db.commit()