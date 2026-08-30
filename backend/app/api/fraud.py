from fastapi import APIRouter

from app.schemas.fraud import (

    FraudRequest,

    FraudResponse,

)

from app.ai.fraud_service import (

    predict_fraud,

)

router = APIRouter(

    prefix="/fraud",

    tags=["Fraud Detection"],

)


@router.post(

    "/check",

    response_model=FraudResponse,

)

def check_fraud(

    request: FraudRequest,

):

    result = predict_fraud(

        trip_distance=request.trip_distance,

        ride_duration=request.ride_duration,

        fare=request.fare,

        driver_rating=request.driver_rating,

        passenger_rating=request.passenger_rating,

        driver_cancel_rate=request.driver_cancel_rate,

        passenger_cancel_rate=request.passenger_cancel_rate,

        rides_today=request.rides_today,

        gps_jump=request.gps_jump,

    )

    return result