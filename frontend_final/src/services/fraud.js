import api from "./api";

export async function checkFraud(data) {

    const response = await api.post(
        "/fraud/check",
        data
    );

    return response.data;

}