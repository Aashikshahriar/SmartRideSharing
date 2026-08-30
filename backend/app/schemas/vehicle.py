from pydantic import BaseModel, ConfigDict


class VehicleCreate(BaseModel):
    brand: str
    model: str
    color: str
    plate_number: str


class VehicleResponse(BaseModel):
    id: int
    brand: str
    model: str
    color: str
    plate_number: str

    model_config = ConfigDict(from_attributes=True)