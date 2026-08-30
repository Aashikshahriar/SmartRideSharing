import random
import pandas as pd

rows = []

for _ in range(10000):

    distance = random.uniform(1,20)

    hour = random.randint(0,23)

    weekday = random.randint(0,6)

    traffic = random.randint(1,5)

    duration = (

        distance*2.3

        + traffic*6

        + random.uniform(-3,3)

    )

    rows.append({

        "distance":distance,

        "hour":hour,

        "weekday":weekday,

        "traffic":traffic,

        "duration":duration

    })

df = pd.DataFrame(rows)

df.to_csv("data/ride_data.csv",index=False)

print(df.head())