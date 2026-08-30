from pydantic import BaseModel


class RecommendationRequest(BaseModel):

    pickup_lat: float
    pickup_lon: float


class DriverRecommendation(BaseModel):

    driver_id: int

    score: float

    distance: float

    rating: float

    total_trips: int