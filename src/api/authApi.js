import api from "./axios";

export const authApi = {
  login: async (credentials) => api.post("/auth/login", credentials),
  register: async (userInfo) => api.post("/auth/register", userInfo),
};
