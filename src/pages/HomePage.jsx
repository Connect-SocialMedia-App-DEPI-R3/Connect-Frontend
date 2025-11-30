import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import PostsList from "../components/PostsList.jsx";
import { api } from "../api/axios";


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-96">
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;