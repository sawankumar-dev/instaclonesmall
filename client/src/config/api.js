import axios from 'axios'

export const apiClient = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true, // Har request me cookie bhejne ke liye compulsory hai
})
