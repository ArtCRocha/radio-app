import api from "./api";

export async function getUser() {
    const { data } = await api.get("auth/loggedUser");
    return data;
}