import api from "./api";

export async function recommendDriver(data) {

    const response = await api.post(
        "/recommendation/driver",
        data
    );

    return response.data;

}