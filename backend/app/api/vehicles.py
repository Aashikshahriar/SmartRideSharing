from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.services.current_user import get_current_user

from app.repositories.driver_repository import (
    get_by_user_id,
)

from app.repositories.vehicle_repository import (
    get_by_driver_id,
)

from app.schemas.vehicle import (
    VehicleCreate,
    VehicleResponse,
)

from app.services.vehicle_service import (
    register_vehicle,
    update_vehicle,
    remove_vehicle,
)

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"],
)


@router.post(
    "",
    response_model=VehicleResponse,
)
def create_vehicle(
    data: VehicleCreate,
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

    try:

        return register_vehicle(
            db,
            driver,
            data,
        )

    except ValueError as e:

        raise HTTPException(
            400,
            str(e),
        )


@router.get(
    "/me",
    response_model=VehicleResponse,
)
def my_vehicle(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    driver = get_by_user_id(
        db,
        current_user.id,
    )

    vehicle = get_by_driver_id(
        db,
        driver.id,
    )

    if vehicle is None:

        raise HTTPException(
            404,
            "Vehicle not found."
        )

    return vehicle


@router.put(
    "",
    response_model=VehicleResponse,
)
def edit_vehicle(
    data: VehicleCreate,
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

    vehicle = get_by_driver_id(
        db,
        driver.id,
    )

    if vehicle is None:
        raise HTTPException(
            404,
            "Vehicle not found."
        )

    return update_vehicle(
        db,
        vehicle,
        data,
    )


@router.delete("")
def delete_vehicle(
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

    vehicle = get_by_driver_id(
        db,
        driver.id,
    )

    if vehicle is None:
        raise HTTPException(
            404,
            "Vehicle not found."
        )

    remove_vehicle(
        db,
        vehicle,
    )

    return {
        "message": "Vehicle deleted."
    }