import PostsList from "../components/PostsList.jsx";
import { usePosts } from "../hook/usePosts";

const HomePage = () => {
  const { posts, loading } = usePosts();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading posts...</div>;

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl sm:text-2xl">Feed</h1>
      <PostsList posts={posts} />
    </div>
  );
};

export default HomePage;
