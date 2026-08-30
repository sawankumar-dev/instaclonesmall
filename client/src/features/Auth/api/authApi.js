import { apiClient } from "../../../config/api"

export const loginUserApi = async (credential) => {
    try {
        const response = await apiClient.post("/auth/login", credential);
        return response.data
    } catch (error) {
        console.log(error)
    }
}