import api from "./api";

export async function askAssistant(message) {

    const response = await api.post(
        "/chatbot/chat",
        {
            message,
        }
    );

    return response.data;

}