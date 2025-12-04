import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { commentApi, profileApi } from "../api";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user profile on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await profileApi.getMyProfile();
        setCurrentUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const fetchComments = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const { data } = await commentApi.getCommentsByPostId(postId);
      setComments(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content) => {
    try {
      const { data } = await commentApi.createComment(postId, content);
      
      // Enrich comment with current user data if author is missing
      const enrichedComment = {
        ...data,
        author: data.author || {
          id: currentUser?.id,
          username: currentUser?.username,
          avatarUrl: currentUser?.avatarUrl,
        },
      };
      
      setComments((prev) => [...prev, enrichedComment]);
      toast.success("Comment added successfully");
      return enrichedComment;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
      throw error;
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      const { data } = await commentApi.updateComment(
        postId,
        commentId,
        content
      );
      setComments((prev) => prev.map((c) => (c.id === commentId ? data : c)));
      toast.success("Comment updated successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update comment");
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentApi.deleteComment(postId, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
      throw error;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    refetch: fetchComments,
  };
};
