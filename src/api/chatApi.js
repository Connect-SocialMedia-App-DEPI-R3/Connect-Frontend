import api from "./axios";

export const chatApi = {
  // Chat Management
  createPrivateChat: async (targetUserId) =>
    api.post(`/chats/private/${targetUserId}`),

  createGroupChat: async (name, memberIds) =>
    api.post("/chats/group", { name, memberIds }),

  getUserChats: async () => api.get("/chats"),

  getChatDetails: async (chatId) => api.get(`/chats/${chatId}`),

  updateGroupName: async (chatId, name) =>
    api.put(`/chats/${chatId}/name`, { name }),

  deleteChat: async (chatId) => api.delete(`/chats/${chatId}`),

  // Member Management
  addMembers: async (chatId, memberIds) =>
    api.post(`/chats/${chatId}/members`, { memberIds }),

  removeMember: async (chatId, userId) =>
    api.delete(`/chats/${chatId}/members/${userId}`),

  leaveGroup: async (chatId) => api.post(`/chats/${chatId}/leave`),

  updateMemberRole: async (chatId, userId, role) =>
    api.put(`/chats/${chatId}/members/${userId}/role`, { role }),

  // Message Management
  sendMessage: async (chatId, content, attachment) => {
    const formData = new FormData();
    formData.append("content", content);
    if (attachment) {
      formData.append("attachment", attachment);
    }
    return api.post(`/chats/${chatId}/messages`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getChatMessages: async (chatId, page = 1, pageSize = 50) =>
    api.get(`/chats/${chatId}/messages`, { params: { page, pageSize } }),

  deleteMessage: async (messageId) => api.delete(`/messages/${messageId}`),

  getUnreadCount: async (chatId) => api.get(`/chats/${chatId}/unread-count`),
};
