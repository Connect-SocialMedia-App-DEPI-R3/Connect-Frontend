import { useNavigate } from "react-router";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { formatDate, getFullAvatarUrl, getFullImageUrl } from "../utils";
import { useReactions } from "../hook";

const Post = ({ post, onClick, detailed = false }) => {
  // const { toggleReaction, hasReacted } = useReactions(post.id);
  const navigate = useNavigate();

  const goToProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.author.username}`);
  };

  return (
    <article
      onClick={onClick}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      {/* Post Image */}
      {post.imageUrl && (
        <div className={`relative overflow-hidden ${detailed ? 'max-h-[500px]' : 'aspect-square'}`}>
          <img
            src={getFullImageUrl(post.imageUrl)}
            alt={post.title || "Post image"}
            className={`w-full ${detailed ? 'h-auto max-h-[500px]' : 'h-full'} object-cover`}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-3" onClick={goToProfile}>
          <img
            src={getFullAvatarUrl(post.author.avatarUrl)}
            alt={post.author.username}
            className="rounded-full w-10 h-10 object-cover border-2 border-pink-200 hover:border-pink-400 transition"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate hover:text-pink-500 transition">
              {post.author.fullName || post.author.username}
            </h4>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Post Title & Content */}
        <div className="mb-3 flex-1">
          {post.title && (
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
              {post.title}
            </h3>
          )}
          {post.content && (
            <p className={`text-gray-600 text-sm ${detailed ? '' : 'line-clamp-3'}`}>{post.content}</p>
          )}
        </div>

        {/* Stats & Actions - Pushed to bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <button
            className="flex items-center gap-1.5 text-gray-500 hover:text-pink-500 transition group/like"
            onClick={(e) => {
              e.stopPropagation();
              // Handle like action
              // toggleReaction();
            }}
          >
            <FaRegHeart className="text-lg group-hover/like:scale-110 transition-transform" />
            <span className="text-sm font-medium">{post.likeCount || 0}</span>
          </button>

          <button
            className="flex items-center gap-1.5 text-gray-500 hover:text-pink-500 transition group/comment"
            onClick={(e) => {
              e.stopPropagation();
              // Handle comment action
            }}
          >
            <FiMessageCircle className="text-lg group-hover/comment:scale-110 transition-transform" />
            <span className="text-sm font-medium">
              {detailed ? post.comments.length : post.commentCount || 0}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
