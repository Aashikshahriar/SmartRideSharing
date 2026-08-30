from pydantic import BaseModel, ConfigDict


class DriverCreate(BaseModel):
    license_number: str
    nid: str


class DriverLocation(BaseModel):
    latitude: float
    longitude: float


class DriverStatus(BaseModel):
    is_online: bool


class DriverResponse(BaseModel):
    id: int
    rating: float
    total_trips: int
    is_online: bool
    current_lat: float
    current_lon: float

    model_config = ConfigDict(
        from_attributes=True
    )