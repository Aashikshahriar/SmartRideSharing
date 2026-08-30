from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.ride import Ride


def create(db: Session, ride: Ride):

    db.add(ride)
    db.commit()
    db.refresh(ride)

    return ride


def update(db: Session):

    db.commit()


def get_by_id(db: Session, ride_id: int):

    stmt = (
        select(Ride)
        .where(Ride.id == ride_id)
    )

    return db.execute(stmt).scalar_one_or_none()


def get_by_passenger(
    db: Session,
    passenger_id: int,
):

    stmt = (
        select(Ride)
        .where(Ride.passenger_id == passenger_id)
    )

    return db.execute(stmt).scalars().all()


def get_pending_rides(db: Session):

    stmt = (
        select(Ride)
        .where(Ride.status == "REQUESTED")
    )

    return db.execute(stmt).scalars().all()


def get_active_ride(
    db: Session,
    passenger_id: int,
):

    stmt = (
        select(Ride)
        .where(Ride.passenger_id == passenger_id)
        .where(Ride.status.in_(["REQUESTED", "ACCEPTED"]))
        .order_by(Ride.requested_at.desc())
    )

    return db.execute(stmt).scalars().first()


def get_active_ride_for_driver(
    db: Session,
    driver_id: int,
):

    stmt = (
        select(Ride)
        .where(Ride.driver_id == driver_id)
        .where(Ride.status == "ACCEPTED")
        .order_by(Ride.accepted_at.desc())
    )

    return db.execute(stmt).scalars().first()