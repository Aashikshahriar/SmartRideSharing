from fastapi import APIRouter

from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependency import get_db

from app.schemas.recommendation import (

    RecommendationRequest,

)

from app.services.recommendation_service import (

    recommend_driver,

)

router = APIRouter(

    prefix="/recommendation",

    tags=["AI Recommendation"],

)


@router.post("/driver")

def recommend(

    data: RecommendationRequest,

    db: Session = Depends(get_db),

):

    result = recommend_driver(

        db,

        data.pickup_lat,

        data.pickup_lon,

    )

    if result is None:

        return {

            "message": "No driver available."

        }

    driver = result["driver"]

    return {

        "driver_id": driver.id,

        "score": result["score"],

        "distance": round(

            result["distance"],

            2,

        ),

        "rating": driver.rating,

        "total_trips": driver.total_trips,

    }