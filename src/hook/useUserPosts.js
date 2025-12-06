import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { postApi } from "../api";

export const useUserPosts = (username) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPosts = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const { data } = await postApi.getPostsByUsername(username);
      setPosts(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch user posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [username]);

  return { posts, loading, refetch: fetchUserPosts };
};
