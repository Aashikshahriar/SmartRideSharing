from app.algorithms.matching import haversine

from app.repositories.driver_repository import (
    get_online_drivers,
)


def find_nearest_driver(
    db,
    pickup_lat,
    pickup_lon,
):

    drivers = get_online_drivers(db)

    if len(drivers) == 0:
        return None

    nearest = None

    best_distance = 999999

    for driver in drivers:

        distance = haversine(

            pickup_lat,

            pickup_lon,

            driver.current_lat,

            driver.current_lon,

        )

        if distance < best_distance:

            best_distance = distance

            nearest = driver

    return nearest