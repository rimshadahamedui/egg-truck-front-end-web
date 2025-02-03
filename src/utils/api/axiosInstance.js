import axios from "axios";
import env from "../config/env";
import showToast from "../showToast";
import { setItem } from "../localStorageUtil";

const axiosInstance = axios.create({
  baseURL: env.BASE_URL, // Your API base URL
  timeout: 10000, // Timeout duration in milliseconds
  withCredentials: true, // Include cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { accessToken, refreshToken } = response?.data;
    if (accessToken) setItem("accessToken", accessToken);
    if (refreshToken) setItem("refreshToken", refreshToken);
    return response;
  },
  (error) => {
    const { status } = error;
    if (status === 401 || status === 403) {
      showToast("session over please login", "custom");
    }

    return Promise.reject(error);
  }
);

// Public instance that doesn't use any tokens
export const axiosPublicInstance = axios.create({
  baseURL: env.BASE_URL,
});

export default axiosInstance;
