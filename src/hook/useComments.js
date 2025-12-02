import { useState, useEffect } from "react";
import { api } from "../api/axios";

export const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ÌáÈ ßá ÇáßæãäÊÇÊ
    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/posts/${postId}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // ÅÖÇÝÉ ßæãäÊ ÌÏíÏ
    const addComment = async (text) => {
        try {
            const res = await api.post(`/api/posts/${postId}/comments`, { content: text });
            setComments((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("Failed to add comment:", err);
            setError(err);
        }
    };

    // ÊÚÏíá ßæãäÊ
    const updateComment = async (commentId, text) => {
        try {
            const res = await api.put(`/api/posts/${postId}/comments/${commentId}`, { content: text });
            setComments((prev) => prev.map(c => c.id === commentId ? res.data : c));
        } catch (err) {
            console.error("Failed to update comment:", err);
            setError(err);
        }
    };

    // ÍÐÝ ßæãäÊ
    const deleteComment = async (commentId) => {
        try {
            await api.delete(`/api/posts/${postId}/comments/${commentId}`);
            setComments((prev) => prev.filter(c => c.id !== commentId));
        } catch (err) {
            console.error("Failed to delete comment:", err);
            setError(err);
        }
    };

    // ÌáÈ ÇáßæãäÊÇÊ Ãæá ãÑÉ
    useEffect(() => {
        if (postId) fetchComments();
    }, [postId]);

    return {
        comments,
        loading,
        error,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
    };
};
