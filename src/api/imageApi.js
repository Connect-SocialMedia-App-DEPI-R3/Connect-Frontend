import api from "./axios";

export const imageApi = {
  // Upload image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete image
  deleteImage: async (imageUrl) =>
    api.delete(`/images?url=${encodeURIComponent(imageUrl)}`),
};
