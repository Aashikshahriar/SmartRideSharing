from app.models.ride import Ride
from datetime import datetime

from app.repositories.ride_repository import create

from app.services.fare_service import (
    haversine,
    estimate_duration,
    estimate_fare,
)


from app.services.matching_service import (
    find_nearest_driver,
)

from app.repositories.ride_repository import (
    create,
    update,
)

def request_ride(
    db,
    passenger,
    data,
):

    distance = haversine(

        data.pickup_lat,
        data.pickup_lon,

        data.destination_lat,
        data.destination_lon,
    )

    duration = estimate_duration(distance)

    fare = estimate_fare(distance)

    driver = find_nearest_driver(

        db,

        data.pickup_lat,

        data.pickup_lon,

    )

    ride = Ride(

        passenger_id=passenger.id,

        driver_id=driver.id if driver else None,

        pickup_lat=data.pickup_lat,

        pickup_lon=data.pickup_lon,

        destination_lat=data.destination_lat,

        destination_lon=data.destination_lon,

        distance_km=distance,

        estimated_duration=duration,

        fare=fare,

        status="REQUESTED",

    )

    return create(
        db,
        ride,
    )

def accept_ride(

    db,

    ride,

    driver,

):

    ride.driver_id = driver.id

    ride.status = "ACCEPTED"

    ride.accepted_at = datetime.utcnow()

    update(db)

    return ride


def complete_ride(db, ride):

    ride.status = "COMPLETED"

    ride.completed_at = datetime.utcnow()

    update(db)

    return ride


def cancel_ride(db, ride):

    ride.status = "CANCELLED"

    update(db)

    return ride