import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { followApi } from "../api";

export const useFollow = (username) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIsFollowing = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const { data } = await followApi.isFollowing(username);
      setIsFollowing(data.isFollowing);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to check follow status"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFollow = async () => {
    try {
      const { data } = await followApi.toggleFollow(username);
      setIsFollowing(data.isFollowing);
      toast.success(
        data.message ||
          (data.isFollowing
            ? "Followed successfully"
            : "Unfollowed successfully")
      );
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle follow");
      throw error;
    }
  };

  useEffect(() => {
    checkIsFollowing();
  }, [username]);

  return { isFollowing, loading, toggleFollow, refetch: checkIsFollowing };
};
