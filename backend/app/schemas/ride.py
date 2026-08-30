from pydantic import BaseModel
from pydantic import ConfigDict


class RideRequest(BaseModel):

    pickup_lat: float
    pickup_lon: float

    destination_lat: float
    destination_lon: float


class RideResponse(BaseModel):

    id: int

    driver_id: int | None

    distance_km: float

    estimated_duration: float

    fare: float

    status: str

    model_config = ConfigDict(
        from_attributes=True
    )