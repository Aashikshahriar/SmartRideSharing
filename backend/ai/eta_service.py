from pathlib import Path

import joblib

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "ai" / "models" / "eta_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_eta(

    distance,

    hour,

    weekday,

    traffic,

):

    x = [[

        distance,

        hour,

        weekday,

        traffic,

    ]]

    prediction = model.predict(x)

    return round(

        float(prediction[0]),

        2,

    )