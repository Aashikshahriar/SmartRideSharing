from app.models.vehicle import Vehicle

from app.repositories.vehicle_repository import (
    create,
    get_by_driver_id,
    update,
    delete,
)


def register_vehicle(db, driver, data):

    existing = get_by_driver_id(
        db,
        driver.id
    )

    if existing:
        raise ValueError(
            "Vehicle already registered."
        )

    vehicle = Vehicle(
        driver_id=driver.id,
        brand=data.brand,
        model=data.model,
        color=data.color,
        plate_number=data.plate_number,
    )

    return create(
        db,
        vehicle,
    )


def update_vehicle(
    db,
    vehicle,
    data,
):

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.color = data.color
    vehicle.plate_number = data.plate_number

    update(db)

    return vehicle


def remove_vehicle(
    db,
    vehicle,
):

    delete(
        db,
        vehicle,
    )