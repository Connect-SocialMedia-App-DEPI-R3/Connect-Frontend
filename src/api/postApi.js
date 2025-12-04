import api from "./axios";

export const postApi = {
  // Get all posts
  getAllPosts: async () => api.get("/posts"),

  // Get post by ID
  getPostById: async (id) => api.get(`/posts/${id}`),

  // Get posts by username
  getPostsByUsername: async (username) => api.get(`/posts/u/${username}`),

  // Create post (accepts FormData directly)
  createPost: async (formData) => {
    return api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update post (accepts FormData directly)
  updatePost: async (id, formData) => {
    return api.put(`/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete post
  deletePost: async (id) => api.delete(`/posts/${id}`),
};
