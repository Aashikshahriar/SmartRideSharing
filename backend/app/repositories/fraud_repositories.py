from sqlalchemy.orm import Session

from app.models.fraud_log import FraudLog


def create_log(

    db: Session,

    ride_id: int,

    fraud: bool,

    risk_score: float,

):

    log = FraudLog(

        ride_id=ride_id,

        fraud=fraud,

        risk_score=risk_score,

    )

    db.add(log)

    db.commit()

    db.refresh(log)

    return log