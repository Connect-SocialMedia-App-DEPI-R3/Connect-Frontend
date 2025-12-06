import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { chatApi } from "../api";
import chatService from "../services/chatService";

export const useMessages = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMessages = async (pageNum = 1, append = false) => {
    if (!chatId) return;
    setLoading(true);
    try {
      const { data } = await chatApi.getChatMessages(chatId, pageNum, 50);
      if (append) {
        setMessages((prev) => [...prev, ...data]);
      } else {
        setMessages(data);
      }
      setHasMore(data.length === 50);
      setPage(pageNum);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content, attachment = null) => {
    try {
      const { data } = await chatApi.sendMessage(chatId, content, attachment);
      // Message will be added via SignalR
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      throw error;
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await chatApi.deleteMessage(messageId);
      // Message will be updated via SignalR
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
      throw error;
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMessages(page + 1, true);
    }
  }, [loading, hasMore, page, chatId]);

  // Listen for new messages
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = chatService.on("ReceiveMessage", (message) => {
      console.log("ReceiveMessage event:", message, "current chatId:", chatId);
      if (message.chatId === chatId) {
        setMessages((prev) => {
          const exists = prev.find((m) => m.id === message.id);
          if (exists) return prev;
          return [message, ...prev];
        });
      }
    });

    return unsubscribe;
  }, [chatId]);

  // Listen for deleted messages
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = chatService.on("MessageDeleted", (messageId) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? { ...m, isDeleted: true, content: "Message deleted" }
            : m
        )
      );
    });

    return unsubscribe;
  }, [chatId]);

  // Join chat room on mount
  useEffect(() => {
    if (chatId && chatService.isConnected()) {
      chatService.joinChat(chatId);

      return () => {
        chatService.leaveChat(chatId);
      };
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  return {
    messages,
    loading,
    hasMore,
    sendMessage,
    deleteMessage,
    loadMore,
    refetch: () => fetchMessages(1, false),
  };
};
