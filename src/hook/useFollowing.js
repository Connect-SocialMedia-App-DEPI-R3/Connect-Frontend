import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { followApi } from "../api";

export const useFollowing = (username) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFollowing = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const { data } = await followApi.getFollowing(username);
      setFollowing(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch following");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [username]);

  return { following, loading, refetch: fetchFollowing };
};
