import { useState } from "react";
import { MdClose } from "react-icons/md";
import { usePosts } from "../hook";

const AddPostModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPost } = usePosts();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content);

      if (imageFile) {
        formData.append("file", imageFile);
      }

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
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative animate-in fade-in zoom-in duration-200"
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
          {/* Title Input */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white"
              rows={4}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Image (optional)
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* Upload Image */}
            {!imagePreview && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-700 border border-gray-300 rounded-xl p-2 text-sm bg-white"
              />
            )}
          </div>

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
