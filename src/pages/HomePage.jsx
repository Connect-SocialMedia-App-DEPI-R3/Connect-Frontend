import Sidebar from "../components/Sidebar.jsx";
import PostsList from "../components/PostsList.jsx";
import { usePosts } from "../hook/usePosts";

const HomePage = () => {
  const { posts, loading } = usePosts();

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl pl-10 sm:text-2xl">Feed</h1>
      {loading
        ? <div className="flex justify-center items-center h-screen">Loading posts...</div>
        : <PostsList posts={posts} />}
    </div>
  );
};

export default HomePage;
