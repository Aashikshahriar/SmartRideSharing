import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(BASE_DIR / "backend"))

from app.algorithms.recommendations import calculate_score
from types import SimpleNamespace

driver = SimpleNamespace(
    rating=4.8,
    acceptance_rate=0.95,
    idle_minutes=18,
    total_trips=800,
)

print(calculate_score(driver, 2.5))