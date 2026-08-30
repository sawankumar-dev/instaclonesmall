import axios from 'axios'

export const apiClient = axios.create({
    // 'url' ki jagah 'baseURL' hona zaroori hai
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
})
