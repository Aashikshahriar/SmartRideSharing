from pathlib import Path

import joblib
import numpy as np

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL = BASE_DIR / "ai" / "models" / "fraud_model.pkl"

fraud_model = joblib.load(MODEL)


def predict_fraud(

    trip_distance,

    ride_duration,

    fare,

    driver_rating,

    passenger_rating,

    driver_cancel_rate,

    passenger_cancel_rate,

    rides_today,

    gps_jump,

):

    x = np.array([[

        trip_distance,

        ride_duration,

        fare,

        driver_rating,

        passenger_rating,

        driver_cancel_rate,

        passenger_cancel_rate,

        rides_today,

        gps_jump,

    ]])

    prediction = fraud_model.predict(x)

    score = fraud_model.decision_function(x)

    is_fraud = prediction[0] == -1

    return {

        "fraud": bool(is_fraud),

        "risk_score": round(float(score[0]), 4)

    }