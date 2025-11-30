import { Link } from "react-router";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Post from "./Post";
import { useNavigate } from "react-router";

const PostsList = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const lowerSearch = searchTerm.toLowerCase();

    const username = post.author?.username?.toLowerCase() || "";
    const content = post.content?.toLowerCase() || "";

    return username.includes(lowerSearch) || content.includes(lowerSearch);
  });

  const navigate = useNavigate();

  return (
    <div className="posts flex-1 p-10 sm:p-6 md:p-10 flex flex-col gap-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full sm:w-1/3 flex justify-center">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <FaHouse className="text-pink-500 text-2xl cursor-pointer hover:scale-110 transition-transform duration-200" />
          <FaRegHeart className="text-pink-500 text-2xl cursor-pointer hover:scale-110 transition-transform duration-200" />
          <Link to="/add-post">
            <button
              className="flex items-center gap-2 bg-linear-to-r from-pink-400 to-yellow-400 text-white font-medium px-5 py-2 
              rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-pink-200 text-sm sm:text-base"
            >
              <IoIosAddCircleOutline className="text-2xl" /> Add Post
            </button>
          </Link>
        </div>
      </div>

      <h1 className="font-bold text-xl sm:text-2xl">Feed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-transparent">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onClick={() => navigate(`/posts/${post.id}`)}
              className="cursor-pointer"
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostsList;
