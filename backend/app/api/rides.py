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


@router.get("/history")
def history(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return get_by_passenger(
        db,
        current_user.id,
    )

@router.get("/active")

def active(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user),

):

    return get_active_ride(

        db,

        current_user.id,

    )

@router.get("/pending")
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

    return accept_ride(

        db,

        ride,

        driver,

    )