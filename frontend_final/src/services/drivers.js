import api from "./api";

export async function registerDriver(data) {

    const response = await api.post("/drivers/register", data);

    return response.data;

}

export async function getMyDriverProfile() {

    const response = await api.get("/drivers/me");

    return response.data;

}

export async function setDriverOnlineStatus(isOnline) {

    const response = await api.patch("/drivers/status", {
        is_online: isOnline,
    });

    return response.data;

}

export async function updateDriverLocation(latitude, longitude) {

    const response = await api.patch("/drivers/location", {
        latitude,
        longitude,
    });

    return response.data;

}
