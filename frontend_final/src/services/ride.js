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

export async function cancelRide(id) {

    const response = await api.post(
        `/rides/${id}/cancel`
    );

    return response.data;

}

export async function completeRide(id) {

    const response = await api.post(
        `/rides/${id}/complete`
    );

    return response.data;

}