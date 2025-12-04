import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { postApi } from "../api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await postApi.getAllPosts();
      setPosts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content, file) => {
    try {
      const { data } = await postApi.createPost({ content }, file);
      setPosts((prev) => [data, ...prev]);
      toast.success("Post created successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
      throw error;
    }
  };

  const updatePost = async (id, content, file) => {
    try {
      const { data } = await postApi.updatePost(id, { content }, file);
      setPosts((prev) => prev.map((p) => (p.id === id ? data : p)));
      toast.success("Post updated successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update post");
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await postApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};
