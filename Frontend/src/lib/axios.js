import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://socai-talk.onrender.com",
    withCredentials: true,
})
