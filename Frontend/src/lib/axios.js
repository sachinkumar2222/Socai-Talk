import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://social-talk.onrender.com",
    withCredentials: true,
})
