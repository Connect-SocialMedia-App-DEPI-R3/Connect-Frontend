import api from "./axios";

export const profileApi = {
  // Get current user's profile
  getMyProfile: async () => api.get("/profile"),

  // Get user profile by userId
  getUserProfile: async (userId) => api.get(`/profile/${userId}`),

  // Update current user's profile
  updateProfile: async (profileData) => api.put("/profile", profileData),

  // Update avatar
  updateAvatar: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.put("/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete account
  deleteAccount: async () => api.delete("/profile"),
};
