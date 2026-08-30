from app.models.driver import Driver

from app.repositories.driver_repository import (
    create,
    get_by_user_id,
    update,
)


def register_driver(db, user, data):

    existing = get_by_user_id(db, user.id)

    if existing:
        raise ValueError(
            "Driver already exists."
        )

    user.role = "driver"

    driver = Driver(
        user_id=user.id,
        license_number=data.license_number,
        nid=data.nid,
    )

    create(db, driver)

    update(db)

    return driver


def update_status(
    db,
    driver,
    status,
):

    driver.is_online = status.is_online

    update(db)

    return driver


def update_location(
    db,
    driver,
    location,
):

    driver.current_lat = location.latitude

    driver.current_lon = location.longitude

    update(db)

    return driver