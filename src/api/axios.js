import axios from "axios";

const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// إضافة interceptor لحقن التوكن
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor – global error handling + auto-logout on 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     toast.error(error.response?.data?.title || error.message);
//     return Promise.reject(error);
//   }
// );

export default api;
