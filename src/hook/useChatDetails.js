import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { chatApi } from "../api";

export const useChatDetails = (chatId) => {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchChatDetails = async () => {
    if (!chatId) return;
    setLoading(true);
    try {
      const { data } = await chatApi.getChatDetails(chatId);
      setChat(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch chat details"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateGroupName = async (newName) => {
    try {
      await chatApi.updateGroupName(chatId, newName);
      setChat((prev) => ({ ...prev, name: newName }));
      toast.success("Group name updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update name");
      throw error;
    }
  };

  const addMembers = async (memberIds) => {
    try {
      await chatApi.addMembers(chatId, memberIds);
      toast.success("Members added");
      await fetchChatDetails(); // Refresh to get updated members
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add members");
      throw error;
    }
  };

  const removeMember = async (userId) => {
    try {
      await chatApi.removeMember(chatId, userId);
      toast.success("Member removed");
      setChat((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m.user.id !== userId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove member");
      throw error;
    }
  };

  const leaveGroup = async () => {
    try {
      await chatApi.leaveGroup(chatId);
      toast.success("Left group");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave group");
      throw error;
    }
  };

  useEffect(() => {
    fetchChatDetails();
  }, [chatId]);

  return {
    chat,
    loading,
    updateGroupName,
    addMembers,
    removeMember,
    leaveGroup,
    refetch: fetchChatDetails,
  };
};
