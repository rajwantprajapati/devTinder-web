import axios from "axios";

const BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
