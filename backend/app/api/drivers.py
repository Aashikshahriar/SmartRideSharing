from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.services.current_user import get_current_user

from app.repositories.driver_repository import (
    get_by_user_id,
)

from app.services.driver_service import (
    register_driver,
    update_status,
    update_location,
)

from app.schemas.driver import (
    DriverCreate,
    DriverStatus,
    DriverLocation,
    DriverResponse,
)

router = APIRouter(
    prefix="/drivers",
    tags=["Drivers"],
)


@router.post(
    "/register",
    response_model=DriverResponse,
)
def create_driver(
    data: DriverCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    try:

        return register_driver(
            db,
            current_user,
            data,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/me",
    response_model=DriverResponse,
)
def me(
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
            "Driver not found",
        )

    return driver


@router.patch(
    "/status",
    response_model=DriverResponse,
)
def status(
    data: DriverStatus,
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
            "Driver profile not found.",
        )

    return update_status(
        db,
        driver,
        data,
    )


@router.patch(
    "/location",
    response_model=DriverResponse,
)
def location(
    data: DriverLocation,
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
            "Driver profile not found.",
        )

    return update_location(
        db,
        driver,
        data,
    )