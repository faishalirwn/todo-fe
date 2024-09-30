import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
