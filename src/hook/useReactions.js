import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { reactionApi } from "../api";

export const useReactions = (postId) => {
  const [reactions, setReactions] = useState([]);
  const [hasReacted, setHasReacted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchReactions = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const { data } = await reactionApi.getPostReactions(postId);
      setReactions(data);
    } catch (error) {
        console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch reactions");
    } finally {
      setLoading(false);
    }
  };

  const checkHasReacted = async () => {
    if (!postId) return;
    try {
      const { data } = await reactionApi.hasUserReacted(postId);
      setHasReacted(data.hasReacted);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to check reaction");
    }
  };

  const toggleReaction = async () => {
    try {
      const { data } = await reactionApi.toggleReaction(postId);
      setHasReacted(data.hasReacted);
      await fetchReactions();
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to toggle reaction");
      throw error;
    }
  };

  useEffect(() => {
    fetchReactions();
    // checkHasReacted();
  }, [postId]);

  return {
    reactions,
    hasReacted,
    loading,
    toggleReaction,
    refetch: fetchReactions,
  };
};
