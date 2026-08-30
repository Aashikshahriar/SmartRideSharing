from pydantic import BaseModel


class ETARequest(BaseModel):

    distance: float

    traffic: int


class ETAResponse(BaseModel):

    eta_minutes: float