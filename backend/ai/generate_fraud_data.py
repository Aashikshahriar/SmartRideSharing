from pathlib import Path

import random
import pandas as pd

BASE_DIR = Path(__file__).parent

DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

rows = []

for _ in range(10000):

    trip_distance = random.uniform(1, 25)

    ride_duration = trip_distance * random.uniform(2.5, 4.0)

    fare = trip_distance * random.uniform(18, 28)

    driver_rating = random.uniform(3.5, 5.0)

    passenger_rating = random.uniform(3.5, 5.0)

    driver_cancel_rate = random.uniform(0, 0.3)

    passenger_cancel_rate = random.uniform(0, 0.3)

    rides_today = random.randint(0, 20)

    gps_jump = random.uniform(0, 2)

    rows.append({

        "trip_distance": trip_distance,

        "ride_duration": ride_duration,

        "fare": fare,

        "driver_rating": driver_rating,

        "passenger_rating": passenger_rating,

        "driver_cancel_rate": driver_cancel_rate,

        "passenger_cancel_rate": passenger_cancel_rate,

        "rides_today": rides_today,

        "gps_jump": gps_jump,

    })

# Inject artificial fraud samples

for _ in range(300):

    rows.append({

        "trip_distance": random.uniform(1, 5),

        "ride_duration": random.uniform(2, 8),

        "fare": random.uniform(800, 3000),

        "driver_rating": random.uniform(1, 2),

        "passenger_rating": random.uniform(1, 2),

        "driver_cancel_rate": random.uniform(0.7, 1.0),

        "passenger_cancel_rate": random.uniform(0.7, 1.0),

        "rides_today": random.randint(40, 100),

        "gps_jump": random.uniform(30, 100),

    })

df = pd.DataFrame(rows)

output = DATA_DIR / "fraud_data.csv"

df.to_csv(output, index=False)

print(df.head())

print(f"Saved -> {output}")