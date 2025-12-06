import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import Post from "./Post";

const PostsList = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ HOOK LESSON: useMemo to avoid recalculating filtered posts on every render
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;

    const lowerSearch = searchTerm.toLowerCase();
    return posts.filter((post) => {
      const username = post.authorUsername?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
      return username.includes(lowerSearch) || content.includes(lowerSearch);
    });
  }, [posts, searchTerm]);

  return (
    <div className="posts flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-y-auto">
      {/* Search Bar and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/3">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onClick={() => navigate(`/posts/${post.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "No posts found matching your search."
                : "No posts available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
