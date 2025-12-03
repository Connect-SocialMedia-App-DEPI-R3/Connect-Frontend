import { useEffect, useState } from "react";
import { api } from "../api/axios";

export const useUserPosts = (username) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/api/posts/u/${username}`);
        setUserPosts(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch user posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [username]);

  return { userPosts, loading, error };
};
