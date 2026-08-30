from fastapi import WebSocket


class ConnectionManager:
    """Tracks WebSocket connections grouped by ride_id and broadcasts
    location/status updates to everyone connected to that ride."""

    def __init__(self):

        self.ride_connections: dict[int, set[WebSocket]] = {}

    async def connect(self, ride_id: int, websocket: WebSocket):

        await websocket.accept()

        self.ride_connections.setdefault(ride_id, set()).add(websocket)

    def disconnect(self, ride_id: int, websocket: WebSocket):

        connections = self.ride_connections.get(ride_id)

        if not connections:
            return

        connections.discard(websocket)

        if not connections:
            self.ride_connections.pop(ride_id, None)

    async def broadcast(self, ride_id: int, message: dict, exclude: WebSocket | None = None):

        for websocket in list(self.ride_connections.get(ride_id, [])):

            if websocket is exclude:
                continue

            try:

                await websocket.send_json(message)

            except Exception:

                self.disconnect(ride_id, websocket)


manager = ConnectionManager()
