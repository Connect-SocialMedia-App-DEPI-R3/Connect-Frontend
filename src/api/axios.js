import axios from "axios";

export const api = axios.create({
  baseURL: "https://connect-api-depi-r3-2025.runasp.net",
  withCredentials: false,
});


// إضافة interceptor لحقن التوكن
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
