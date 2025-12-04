import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { postApi } from "../api";

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const { data } = await postApi.getPostById(postId);
      setPost(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return { post, loading, refetch: fetchPost };
};
