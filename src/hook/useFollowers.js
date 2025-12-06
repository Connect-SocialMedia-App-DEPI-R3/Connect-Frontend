import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { followApi } from "../api";

export const useFollowers = (username) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFollowers = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const { data } = await followApi.getFollowers(username);
      setFollowers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch followers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [username]);

  return { followers, loading, refetch: fetchFollowers };
};
