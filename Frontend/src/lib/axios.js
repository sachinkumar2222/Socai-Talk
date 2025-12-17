import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://socai-talk.onrender.com",
    // baseURL: "http://localhost:5000",
    withCredentials: true,
})
