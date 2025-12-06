import { useState } from "react";
import MarketPostList from "../components/MarketPostList.jsx";
import EditMarketPostModal from "../components/EditMarketPostModal.jsx";
import { usePosts } from "../hook/usePosts";
import { FaPlus } from "react-icons/fa6";

const MarketPage = () => {
  const { posts, loading, refetch, createPost } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = async ({ title, content, imageFile }) => {
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content);

    if (imageFile) {
      formData.append("file", imageFile);
    }

    await createPost(formData);
    await refetch();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 relative">
      <h1 className="font-bold text-xl pl-10 sm:text-2xl">Market</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading posts...
        </div>
      ) : (
        <MarketPostList posts={posts} refetch={refetch}/>
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
      <EditMarketPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={null}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default MarketPage;
