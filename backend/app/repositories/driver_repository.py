from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.driver import Driver


def get_by_user_id(db: Session, user_id: int):

    stmt = (
        select(Driver)
        .where(Driver.user_id == user_id)
    )

    return db.execute(stmt).scalar_one_or_none()


def get_by_id(db: Session, driver_id: int):

    stmt = (
        select(Driver)
        .where(Driver.id == driver_id)
    )

    return db.execute(stmt).scalar_one_or_none()


def create(db: Session, driver: Driver):

    db.add(driver)

    db.commit()

    db.refresh(driver)

    return driver


def update(db: Session):

    db.commit()


def get_online_drivers(db):

    stmt = (
        select(Driver)
        .where(Driver.is_online == True)
    )

    return db.execute(stmt).scalars().all()

def update_driver(db, driver):

    db.add(driver)

    db.commit()

    db.refresh(driver)

    return driver


def increment_trip(db, driver):

    driver.total_trips += 1

    db.commit()


def update_rating(
    db,
    driver,
    rating,
):

    driver.rating = rating

    db.commit()


def update_idle_time(
    db,
    driver,
    minutes,
):

    driver.idle_minutes = minutes

    db.commit()