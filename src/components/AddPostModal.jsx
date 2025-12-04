import { useState } from "react";
import { MdOutlineSell, MdClose } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { usePosts } from "../hook";

const AddPostModal = ({ isOpen, onClose }) => {
  const [postType, setPostType] = useState("normal");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPost } = usePosts();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setPrice("");
    setPostType("normal");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(
        "title",
        title || (postType === "sale" ? "Sale Post" : "My Post")
      );
      formData.append("content", content);

      if (imageFile) {
        formData.append("file", imageFile);
      }

      formData.append("type", postType);

      if (postType === "sale" && price) {
        formData.append("price", price);
      }
        console.log(formData);

      await createPost(formData);

      // Success - close modal and reset
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Modal Content */}
      <div
        className="bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center pr-8">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Post Type */}
          <div className="flex justify-center items-center gap-6 sm:gap-10">
            <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
              <input
                type="radio"
                name="postType"
                value="normal"
                checked={postType === "normal"}
                onChange={(e) => setPostType(e.target.value)}
                className="accent-pink-400 cursor-pointer w-4 h-4"
              />
              <FaRegImage className="text-pink-500 text-lg" />
              <span>Normal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
              <input
                type="radio"
                name="postType"
                value="sale"
                checked={postType === "sale"}
                onChange={(e) => setPostType(e.target.value)}
                className="accent-pink-400 cursor-pointer w-4 h-4"
              />
              <MdOutlineSell className="text-pink-500 text-lg" />
              <span>Sale</span>
            </label>
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title (optional)"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white"
          />

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white"
            rows={4}
            required
          />

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-xl p-2 text-sm bg-white"
            />
          </div>

          {/* Price */}
          {postType === "sale" && (
            <input
              type="number"
              placeholder="Enter price (EGP)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm bg-white"
            />
          )}

          {/* Submit Button */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
