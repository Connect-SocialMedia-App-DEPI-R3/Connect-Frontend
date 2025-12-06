import { useState } from "react";
import { useNavigate } from "react-router";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  getFullAvatarUrl,
  getFullImageUrl,
  isOwner,
} from "../utils";
import { usePosts } from "../hook";
import ConfirmModal from "./ConfirmModal";
import EditPostModal from "./EditPostModal";

const MarketPost = ({ post, onClick, detailed = false, refetch }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { deletePost, updatePost } = usePosts();

  const isPostOwner = isOwner(post.author.id);

  const goToProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.author.username}`);
  };

  const handleMessage = (e) => {
    e.stopPropagation();
    // هنا ممكن تضيف منطق التوجيه لشات مثلا مع صاحب المنتج
    navigate(`/chats/${post.author.username}`);
  };

  const handlePay = (e) => {
    e.stopPropagation();
    // هنا تضيف منطق الدفع، مثلا توجيه لصفحة الدفع أو فتح مودال
    navigate(`/payment/${post.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowDropdown(false);
    setShowEditModal(true);
  };

  const handleEditSubmit = async ({ title, content, imageFile, removeImage, price }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);

    if (imageFile) {
      formData.append("file", imageFile);
    } else if (removeImage) {
      formData.append("removeImage", "true");
    }

    await updatePost(post.id, formData);
    navigate(0); // Refresh to show updated post
  };

  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(post.id);
      if (detailed) {
        navigate(-1);
      } else {
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <article
      onClick={onClick}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      {/* Post Image or Gradient Header */}
      {post.imageUrl ? (
        <div
          className={`relative overflow-hidden ${
            detailed ? "max-h-[500px]" : "aspect-square"
          }`}
        >
          <img
            src={getFullImageUrl(post.imageUrl)}
            alt={post.title || "Post image"}
            className={`w-full ${
              detailed ? "h-auto max-h-[500px]" : "h-full"
            } object-cover`}
          />
        </div>
      ) : (
        <div
          className={`relative overflow-hidden ${
            detailed ? "h-48" : "aspect-square"
          } bg-gradient-to-r from-pink-400 to-yellow-400 ${
            detailed ? "via-purple-400 to-indigo-500" : ""
          } flex items-center justify-center`}
        >
          <div className="text-center p-4 sm:p-6">
            {post.title ? (
              <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-lg line-clamp-3">
                {post.title}
              </h2>
            ) : (
              <p
                className={`text-white font-semibold text-base sm:text-lg md:text-xl drop-shadow-lg ${
                  detailed ? "" : "line-clamp-4 px-2 sm:px-4"
                }`}
              >
                {post.content}
              </p>
            )}
          </div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-6 left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Author Info */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <img
            src={getFullAvatarUrl(post.author.avatarUrl)}
            alt={post.author.username}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover border-2 border-pink-200 hover:border-pink-400 transition cursor-pointer flex-shrink-0"
            onClick={goToProfile}
          />
          <div className="flex-1 min-w-0 cursor-pointer" onClick={goToProfile}>
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate hover:text-pink-500 transition">
              {post.author.fullName || post.author.username}
            </h4>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>

          {/* Three Dots Menu (Only for owner) */}
          {isPostOwner && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <HiDotsVertical className="text-gray-600" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-pink-50 text-gray-800 font-medium rounded-t-xl transition"
                  >
                    <MdEdit className="text-lg" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 font-medium rounded-b-xl transition"
                  >
                    <MdDelete className="text-red-500 text-lg" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Title & Description & Price */}
        <div className="mb-3 flex-1">
          {post.title && (
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
              {post.title}
            </h3>
          )}
          {post.content && (
            <p className={`text-gray-600 text-sm ${detailed ? "" : "line-clamp-3"}`}>
              {post.content}
            </p>
          )}
          {post.price && (
            <p className="mt-3 font-semibold text-pink-600 text-lg">
              Price: ${post.price}
            </p>
          )}
        </div>

        {/* Buttons for Message and Pay */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto gap-4">
          <button
            onClick={handleMessage}
            className="flex-1 bg-pink-400 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-pink-500 transition"
          >
            Message
          </button>

          <button
            onClick={handlePay}
            className="flex-1 bg-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-yellow-500 transition"
          >
            Pay
          </button>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />

      <EditPostModal
        isOpen={showEditModal}
        onClose={onCloseEditModal}
        post={post}
        onSubmit={handleEditSubmit}
      />
    </article>
  );
};

export default MarketPost;
