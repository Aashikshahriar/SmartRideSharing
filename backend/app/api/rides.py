from typing import List, Optional

from fastapi import APIRouter, HTTPException
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.services.current_user import (
    get_current_user,
)

from app.schemas.ride import (
    RideRequest,
    RideResponse,
)

from app.repositories.ride_repository import (
    get_active_ride,
    get_active_ride_for_driver,
)

from app.services.ride_service import (
    request_ride,
)

from app.repositories.ride_repository import (
    get_by_passenger,
)

from app.repositories.driver_repository import (
    get_by_user_id,
)

from app.repositories.ride_repository import (

    get_pending_rides,

    get_by_id,

)

from app.services.ride_service import (
    accept_ride,
    complete_ride,
    cancel_ride,
)

router = APIRouter(

    prefix="/rides",

    tags=["Rides"],

)


@router.post(
    "/request",
    response_model=RideResponse,
)
def create_ride(

    data: RideRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return request_ride(
        db,
        current_user,
        data,
    )


@router.get("/history", response_model=List[RideResponse])
def history(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return get_by_passenger(
        db,
        current_user.id,
    )

@router.get("/active", response_model=Optional[RideResponse])

def active(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return get_active_ride(

        db,

        current_user.id,

    )

@router.get("/pending", response_model=List[RideResponse])
def pending(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    driver = get_by_user_id(

        db,

        current_user.id,

    )

    if driver is None:

        raise HTTPException(
            404,
            "Driver profile not found."
        )

    return get_pending_rides(db)


@router.get("/driver/active", response_model=Optional[RideResponse])
def driver_active(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    driver = get_by_user_id(db, current_user.id)

    if driver is None:

        raise HTTPException(404, "Driver profile not found.")

    return get_active_ride_for_driver(db, driver.id)


def _get_ride_for_participant(db, ride_id, current_user):
    """Fetch a ride and make sure the caller is its passenger or driver."""

    ride = get_by_id(db, ride_id)

    if ride is None:

        raise HTTPException(404, "Ride not found.")

    driver = get_by_user_id(db, current_user.id)

    is_passenger = ride.passenger_id == current_user.id
    is_driver = driver is not None and ride.driver_id == driver.id

    if not (is_passenger or is_driver):

        raise HTTPException(403, "Not part of this ride.")

    return ride


@router.get("/{ride_id}", response_model=RideResponse)
def get_ride(

    ride_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return _get_ride_for_participant(db, ride_id, current_user)


@router.patch(
    "/{ride_id}/accept",
    response_model=RideResponse,
)
def accept(

    ride_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    driver = get_by_user_id(

        db,

        current_user.id,

    )

    if driver is None:

        raise HTTPException(
            404,
            "Driver profile not found."
        )

    ride = get_by_id(

        db,

        ride_id,

    )

    if ride is None:

        raise HTTPException(
            404,
            "Ride not found."
        )

    if ride.status != "REQUESTED":

        raise HTTPException(
            400,
            "Ride is no longer available.",
        )

    return accept_ride(

        db,

        ride,

        driver,

    )


@router.patch(
    "/{ride_id}/complete",
    response_model=RideResponse,
)
def complete(

    ride_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    driver = get_by_user_id(db, current_user.id)

    if driver is None:

        raise HTTPException(404, "Driver profile not found.")

    ride = get_by_id(db, ride_id)

    if ride is None:

        raise HTTPException(404, "Ride not found.")

    if ride.driver_id != driver.id:

        raise HTTPException(403, "Not your ride.")

    if ride.status != "ACCEPTED":

        raise HTTPException(400, "Ride is not currently active.")

    return complete_ride(db, ride)


@router.patch(
    "/{ride_id}/cancel",
    response_model=RideResponse,
)
def cancel(

    ride_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    ride = get_by_id(db, ride_id)

    if ride is None:

        raise HTTPException(404, "Ride not found.")

    if ride.passenger_id != current_user.id:

        raise HTTPException(403, "Not your ride.")

    if ride.status not in ("REQUESTED", "ACCEPTED"):

        raise HTTPException(400, "Ride can no longer be cancelled.")

    return cancel_ride(db, ride)
