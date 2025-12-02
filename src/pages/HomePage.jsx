import Sidebar from "../components/Sidebar.jsx";
import PostsList from "../components/PostsList.jsx";
import { usePosts } from "../hook/usePosts";

const HomePage = () => {
  const { posts, loading } = usePosts();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading posts...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-96 p-6">
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;
