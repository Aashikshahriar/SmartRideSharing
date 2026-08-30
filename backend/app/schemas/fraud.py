from pydantic import BaseModel


class FraudRequest(BaseModel):

    trip_distance: float

    ride_duration: float

    fare: float

    driver_rating: float

    passenger_rating: float

    driver_cancel_rate: float

    passenger_cancel_rate: float

    rides_today: int

    gps_jump: float


class FraudResponse(BaseModel):

    fraud: bool

    risk_score: float