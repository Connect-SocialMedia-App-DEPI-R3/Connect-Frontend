import { useEffect, useState } from "react";
import { api } from "../api/axios";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/api/posts");
            setPosts(res.data);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, setPosts };
};
