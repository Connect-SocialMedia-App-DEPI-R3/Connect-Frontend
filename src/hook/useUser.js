import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { userApi } from "../api";

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await userApi.getUserById(userId);
      setUser(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return { user, loading, refetch: fetchUser };
};
