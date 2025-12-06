import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { chatApi } from "../api";
import chatService from "../services/chatService";

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data } = await chatApi.getUserChats();
      setChats(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  };

  const createPrivateChat = async (targetUserId) => {
    try {
      const { data } = await chatApi.createPrivateChat(targetUserId);
      setChats((prev) => [data, ...prev]);
      toast.success("Chat created");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create chat");
      throw error;
    }
  };

  const createGroupChat = async (name, memberIds) => {
    try {
      const { data } = await chatApi.createGroupChat(name, memberIds);
      setChats((prev) => [data, ...prev]);
      toast.success("Group created");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
      throw error;
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await chatApi.deleteChat(chatId);
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      toast.success("Chat deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete chat");
      throw error;
    }
  };

  // Listen for new chats from SignalR
  useEffect(() => {
    const unsubscribe = chatService.on("NewChat", (chat) => {
      setChats((prev) => {
        const exists = prev.find((c) => c.id === chat.id);
        if (exists) return prev;
        return [chat, ...prev];
      });
    });

    return unsubscribe;
  }, []);

  // Listen for new messages to update lastMessage
  useEffect(() => {
    const unsubscribe = chatService.on("ReceiveMessage", (message) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === message.chatId
            ? { ...chat, lastMessage: message, unreadCount: chat.unreadCount + 1 }
            : chat
        )
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    createPrivateChat,
    createGroupChat,
    deleteChat,
    refetch: fetchChats,
  };
};
