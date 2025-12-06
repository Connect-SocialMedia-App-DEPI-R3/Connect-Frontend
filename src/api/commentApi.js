import api from "./axios";

export const commentApi = {
  // Get all comments for a post
  getCommentsByPostId: async (postId) => api.get(`/posts/${postId}/comments`),

  // Get specific comment
  getCommentById: async (postId, commentId) =>
    api.get(`/posts/${postId}/comments/${commentId}`),

  // Create comment
  createComment: async (postId, content) =>
    api.post(`/posts/${postId}/comments`, { content }),

  // Update comment
  updateComment: async (postId, commentId, content) =>
    api.put(`/posts/${postId}/comments/${commentId}`, { content }),

  // Delete comment
  deleteComment: async (postId, commentId) =>
    api.delete(`/posts/${postId}/comments/${commentId}`),
};
