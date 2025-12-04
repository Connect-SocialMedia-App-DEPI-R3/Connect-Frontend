import { useState } from "react";
import PostsList from "../components/PostsList.jsx";
import AddPostModal from "../components/AddPostModal.jsx";
import { usePosts } from "../hook/usePosts";
import { FaPlus } from "react-icons/fa6";

const HomePage = () => {
  const { posts, loading, refetch } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refresh posts after modal closes
  };

  return (
    <div className="p-6 relative">
      <h1 className="font-bold text-xl pl-10 sm:text-2xl">Feed</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading posts...
        </div>
      ) : (
        <PostsList posts={posts} />
      )}

      {/* Floating Add Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl z-40"
        aria-label="Create new post"
      >
        <FaPlus size={24} />
      </button>

      {/* Add Post Modal */}
      <AddPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
