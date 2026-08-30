from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query

from app.database.connection import SessionLocal

from app.core.security import decode_access_token

from app.models.user import User

from app.repositories.ride_repository import get_by_id
from app.repositories.driver_repository import get_by_user_id

from app.websocket.manager import manager

router = APIRouter(tags=["Live Tracking"])


@router.websocket("/ws/rides/{ride_id}")
async def ride_tracking(
    websocket: WebSocket,
    ride_id: int,
    token: str = Query(...),
):

    db = SessionLocal()

    try:

        payload = decode_access_token(token)

        if payload is None:
            await websocket.close(code=4401)
            return

        user = (
            db.query(User)
            .filter(User.email == payload["sub"])
            .first()
        )

        if user is None:
            await websocket.close(code=4401)
            return

        ride = get_by_id(db, ride_id)

        if ride is None:
            await websocket.close(code=4404)
            return

        driver = get_by_user_id(db, user.id)

        is_driver = driver is not None and ride.driver_id == driver.id
        is_passenger = ride.passenger_id == user.id

        if not (is_driver or is_passenger):
            await websocket.close(code=4403)
            return

        await manager.connect(ride_id, websocket)

        try:

            while True:

                data = await websocket.receive_json()

                if not is_driver:
                    # Passengers only listen; ignore anything they send.
                    continue

                if data.get("type") == "location":

                    lat = data.get("lat")
                    lng = data.get("lng")

                    if lat is None or lng is None:
                        continue

                    driver.current_lat = lat
                    driver.current_lon = lng

                    db.commit()

                    await manager.broadcast(
                        ride_id,
                        {"type": "location", "lat": lat, "lng": lng},
                        exclude=websocket,
                    )

        except WebSocketDisconnect:

            manager.disconnect(ride_id, websocket)

    finally:

        db.close()
