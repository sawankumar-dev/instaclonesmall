import { apiClient } from "../../../config/api";

export const getAllPostApi = async () => {
    try {
        const response = await apiClient.get("/post");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}