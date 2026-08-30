import { API_BASE_URL } from "./api";
import { getToken } from "./auth";

export function connectRideTracking(rideId) {

    const token = getToken();

    const wsBase = API_BASE_URL.replace(/^http/, "ws");

    return new WebSocket(`${wsBase}/ws/rides/${rideId}?token=${token}`);

}

export function sendLocation(socket, lat, lng) {

    if (socket && socket.readyState === WebSocket.OPEN) {

        socket.send(JSON.stringify({ type: "location", lat, lng }));

    }

}
