import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { reactionApi } from "../api";
import { isAuthenticated } from "../utils";

// Hook for toggling reactions (used in both feed and detailed views)
export const useReactionToggle = (
  postId,
  initialHasReacted = false,
  initialCount = 0
) => {
  const [hasReacted, setHasReacted] = useState(initialHasReacted);
  const [reactionCount, setReactionCount] = useState(initialCount);
  const [isToggling, setIsToggling] = useState(false);

  // Fetch initial reaction status on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const checkHasReacted = async () => {
        if (!postId) return;
        try {
          const { data } = await reactionApi.hasUserReacted(postId);
          setHasReacted(data.hasReacted);
        } catch (error) {
          console.error("Failed to check reaction:", error);
        }
      };
      checkHasReacted();
    } else setHasReacted(false);
  }, [postId]);

  const toggleReaction = async () => {
    if (isToggling) return; // Prevent double clicks

    setIsToggling(true);

    // Optimistic update
    const newHasReacted = !hasReacted;
    setHasReacted(newHasReacted);
    setReactionCount((prev) =>
      newHasReacted ? prev + 1 : Math.max(0, prev - 1)
    );

    try {
      const response = await reactionApi.toggleReaction(postId);
      toast.success(response.data.message);
    } catch (error) {
      // Rollback on error
      setHasReacted(!newHasReacted);
      setReactionCount((prev) =>
        newHasReacted ? Math.max(0, prev - 1) : prev + 1
      );
      console.log(error);
      if (error.response?.status === 401) {
        toast.error("You must be logged in to react");
      } else
        toast.error(
          error.response?.data?.message || "Failed to toggle reaction"
        );
    } finally {
      setIsToggling(false);
    }
  };

  return {
    hasReacted,
    reactionCount,
    toggleReaction,
    isToggling,
  };
};

// Legacy: Full hook for detailed post page (fetches all reactions list)
// Use useReactionToggle instead for most cases
export const useReactions = (postId) => {
  const [reactions, setReactions] = useState([]);
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

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  return {
    reactions,
    loading,
    refetch: fetchReactions,
  };
};
