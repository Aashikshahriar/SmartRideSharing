import api from "./api";

export async function login(email, password) {

    const response = await api.post("/auth/login", {
        email,
        password,
    });

    const token = response.data.access_token;

    localStorage.setItem("access_token", token);

    return response.data;
}

export async function register(data) {

    const response = await api.post("/auth/register", data);

    return response.data;
}

export function logout() {

    localStorage.removeItem("access_token");

}

export function getToken() {

    return localStorage.getItem("access_token");

}

export async function getCurrentUser() {

    const response = await api.get("/users/me");

    return response.data;

}