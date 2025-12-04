import api from "./axios";

export const followApi = {
  // Toggle follow/unfollow a user
  toggleFollow: async (username) => api.post(`/follow/${username}`),

  // Get followers of a user
  getFollowers: async (username) => api.get(`/follow/${username}/followers`),

  // Get users that a user is following
  getFollowing: async (username) => api.get(`/follow/${username}/following`),

  // Check if current user is following a specific user
  isFollowing: async (username) => api.get(`/follow/${username}/is-following`),
};
