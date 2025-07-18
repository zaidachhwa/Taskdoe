import axios from "axios";

const BASE_URL = "https://taskdoe-production.up.railway.app";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
