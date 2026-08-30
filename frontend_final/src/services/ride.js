import api from "./api";

export async function requestRide(data) {

    const response = await api.post(
        "/rides/request",
        data
    );

    return response.data;

}

export async function getRide(id) {

    const response = await api.get(
        `/rides/${id}`
    );

    return response.data;

}

export async function getRideHistory() {

    const response = await api.get(
        "/rides/history"
    );

    return response.data;

}

export async function getPendingRides() {

    const response = await api.get(
        "/rides/pending"
    );

    return response.data;

}

export async function getDriverActiveRide() {

    const response = await api.get(
        "/rides/driver/active"
    );

    return response.data;

}

export async function acceptRide(id) {

    const response = await api.patch(
        `/rides/${id}/accept`
    );

    return response.data;

}

export async function cancelRide(id) {

    const response = await api.patch(
        `/rides/${id}/cancel`
    );

    return response.data;

}

export async function completeRide(id) {

    const response = await api.patch(
        `/rides/${id}/complete`
    );

    return response.data;

}
