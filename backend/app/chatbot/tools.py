from datetime import datetime

from app.ai.eta_service import predict_eta
from app.ai.fraud_service import predict_fraud
from app.services.recommendation_service import recommend_driver


class ChatTools:

    @staticmethod
    def eta(distance):

        now = datetime.now()

        return predict_eta(
            distance=distance,
            hour=now.hour,
            weekday=now.weekday(),
            traffic=3,
        )

    @staticmethod
    def fraud():

        return predict_fraud(

            trip_distance=8,

            ride_duration=20,

            fare=220,

            driver_rating=4.8,

            passenger_rating=4.7,

            driver_cancel_rate=0.02,

            passenger_cancel_rate=0.01,

            rides_today=6,

            gps_jump=0.1,

        )

    @staticmethod
    def recommend(

        db,

        lat,

        lon,

    ):

        return recommend_driver(

            db,

            lat,

            lon,

        )