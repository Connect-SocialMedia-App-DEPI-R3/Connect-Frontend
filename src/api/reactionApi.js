import api from "./axios";

export const reactionApi = {
  // Toggle reaction (like/unlike)
  toggleReaction: async (postId) => api.post(`/reactions/${postId}`),

  // Get all reactions for a post
  getPostReactions: async (postId) => api.get(`/reactions/${postId}`),

  // Check if user has reacted to a post
  hasUserReacted: async (postId) => api.get(`/reactions/${postId}/has-reacted`),
};
