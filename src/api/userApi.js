import api from "./axios";

export const userApi = {
  getUserById: async (id) => api.get(`/users/${id}`),
  getAllUsers: async () => api.get("/users"),
};
