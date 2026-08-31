import { apiClient } from "../../../config/api"

export const loginUserApi = async (credential) => {
    try {
        const response = await apiClient.post("/auth/login", credential);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const registerUserApi = async (data) => {
    try {
        const response = await apiClient.post("/auth/register", data);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const myProfileApi = async () => {
    try {
        const response = await apiClient.get("/auth/me");
        return response.data
    } catch (error) {
        console.log(error)
    }
}
