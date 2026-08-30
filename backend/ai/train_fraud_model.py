from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import IsolationForest

BASE_DIR = Path(__file__).parent

DATA_PATH = BASE_DIR / "data" / "fraud_data.csv"

MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "fraud_model.pkl"

df = pd.read_csv(DATA_PATH)

model = IsolationForest(

    contamination=0.03,

    random_state=42,

)

model.fit(df)

joblib.dump(

    model,

    MODEL_PATH,

)

print("Fraud Model Saved")

print(MODEL_PATH)