import { useState } from "react";
import { MdOutlineSell } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import toast from "react-hot-toast";
import { api } from "../api/axios";
import { usePosts } from "../hook/usePosts";

const AddPostPage = () => {
  const [postType, setPostType] = useState("normal");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("");

  const { posts, setPosts } = usePosts(); //  عشان الهوم يتحدث

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    try {
      // FormData
      const formData = new FormData();
      formData.append("title", postType === "sale" ? "Sale Post" : "Post");
      formData.append("content", content);
      formData.append("file", imageFile);
      formData.append("type", postType);

      if (postType === "sale") {
        formData.append("price", price);
      }

      // POST request
      const res = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Add post locally to update UI
      setPosts((prev) => [res.data, ...prev]);

      toast.success("Post created successfully!");

      // Reset fields
      setContent("");
      setImageFile(null);
      setPrice("");
      setPostType("normal");

    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center p-6 sm:p-10 overflow-y-auto mt-20">
      <div className=" bg-linear-to-br from-yellow-100 via-pink-100 to-pink-200 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Post Type */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10">
            <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
              <input
                type="radio"
                name="postType"
                value="normal"
                checked={postType === "normal"}
                onChange={(e) => setPostType(e.target.value)}
                className="accent-pink-400 cursor-pointer w-4 h-4"
              />
              <FaRegImage className=" text-pink-500 text-lg sm:text-xl"/><span>Normal Post</span>
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
              <MdOutlineSell className=" text-pink-500  text-lg sm:text-xl"/><span>Sale Post</span>
            </label>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
            rows={4}
            required
          />

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-xl p-2 text-sm sm:text-base"
              required
            />
          </div>

          {/* Price */}
          {postType === "sale" && (
            <input
              type="number"
              placeholder="Enter price (EGP)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm sm:text-base"
              required
            />
          )}

          <button
            type="submit"
            className="bg-linear-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-pink-200 text-sm sm:text-base"
          >
            Post
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddPostPage;
