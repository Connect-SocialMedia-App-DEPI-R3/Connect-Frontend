import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { getFullImageUrl } from "../utils";

const EditMarketPostModal = ({ isOpen, onClose, post, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState("");

  // Load post data when modal opens
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setRemoveImage(false);
    }
  }, [post]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setRemoveImage(false); // If uploading new image, don't remove
    }
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setImageFile(null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setRemoveImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ title, content, imageFile, removeImage });

      // Success - close modal and reset
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      if (!post) resetForm();
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{ pointerEvents: "auto" }}
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
          {post ? "Edit Post" : "Create New Post"}
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

          {/* Price */}
           <div>
               <label className="block mb-2 font-medium text-gray-700 text-sm">
                 Price
               </label>
                   <input
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     placeholder="Enter price"
                     className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white"
                     min="0"
                    step="0.01"
                    required
                    />
           </div>


          {/* Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Image
            </label>

            {/* Current Image Preview */}
            {post?.imageUrl && !removeImage && !imageFile && (
              <div className="mb-3 relative">
                <img
                  src={getFullImageUrl(post.imageUrl)}
                  alt="Current post"
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

            {/* Upload New Image */}
            {!removeImage && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-gray-700 border border-gray-300 rounded-xl p-2 text-sm bg-white"
                />
                {post?.imageUrl && !imageFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a new image to replace the current one
                  </p>
                )}
              </>
            )}

            {/* Removed Image Message */}
            {removeImage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                Image will be removed when you save changes.
                <button
                  type="button"
                  onClick={() => setRemoveImage(false)}
                  className="ml-2 underline hover:no-underline"
                >
                  Undo
                </button>
              </div>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMarketPostModal;
