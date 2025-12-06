import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { postApi } from "../api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ⭐ function تمنع ظهور توست لرسائل معينة
  const safeToastError = (error) => {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    // ❌ لو الرسالة فيها transient → لا يظهر Toast
    if (msg.toLowerCase().includes("transient")) {
      console.warn("Suppressed transient error:", msg);
      return;
    }

    // ✔ غير كده → اعرض Toast
    toast.error(msg);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await postApi.getAllPosts();
      setPosts(data);
    } catch (error) {
      safeToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (formData) => {
    try {
      const { data } = await postApi.createPost(formData);
      setPosts((prev) => [data, ...prev]);
      toast.success("Post created successfully");
      return data;
    } catch (error) {
      safeToastError(error);
      throw error;
    }
  };

  const updatePost = async (id, formData) => {
    try {
      const { data } = await postApi.updatePost(id, formData);
      setPosts((prev) => prev.map((p) => (p.id === id ? data : p)));
      toast.success("Post updated successfully");
      return data;
    } catch (error) {
      safeToastError(error);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await postApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      safeToastError(error);
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
