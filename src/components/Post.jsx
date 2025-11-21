import { FaRegHeart } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";

const Post = ({ post }) => {
  return (
    <div className="rounded-2xl bg-white shadow p-4 hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <img src={post.avatar} alt="User" className="rounded-full w-12 h-12" />
        <div>
          <h4 className="font-semibold">{post.username}</h4>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded-xl w-full mb-3 object-cover aspect-4/3 object-center"
        />
      )}
      <p className="text-gray-800 pb-3">{post.content}</p>

      <div className="flex justify-around border-t pt-3 text-gray-500">
        <button className="flex items-center gap-2 hover:text-pink-500 transition">
          <FaRegHeart className="text-xl" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 hover:text-pink-500 transition">
          <FiMessageCircle className="text-xl" />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
