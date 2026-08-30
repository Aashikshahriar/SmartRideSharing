import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(BASE_DIR / "backend"))

from app.ai.fraud_service import predict_fraud

normal = predict_fraud(

    trip_distance=8,

    ride_duration=24,

    fare=220,

    driver_rating=4.8,

    passenger_rating=4.7,

    driver_cancel_rate=0.02,

    passenger_cancel_rate=0.01,

    rides_today=5,

    gps_jump=0.2,

)

print(normal)

fraud = predict_fraud(

    trip_distance=2,

    ride_duration=3,

    fare=2500,

    driver_rating=1.2,

    passenger_rating=1.1,

    driver_cancel_rate=0.95,

    passenger_cancel_rate=0.90,

    rides_today=80,

    gps_jump=75,

)

print(fraud)