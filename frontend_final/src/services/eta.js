import api from "./api";

export async function predictEta(distance, traffic = 2) {

    const response = await api.post(
        "/ai/eta",
        {
            distance,
            traffic,
        }
    );

    return response.data;

}
