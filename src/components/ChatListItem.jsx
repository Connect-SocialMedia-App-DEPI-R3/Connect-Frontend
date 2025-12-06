import { formatDate, getFullAvatarUrl } from "../utils";

const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return null;
  }
};

const ChatListItem = ({ chat, onClick, isActive }) => {
  const otherUser = chat.isGroup
    ? null
    : chat.members?.find((m) => m.user.id !== getCurrentUserId())?.user;

  const displayName = chat.isGroup
    ? chat.name
    : otherUser?.username || "Unknown";
  const displayAvatar = chat.isGroup
    ? null
    : getFullAvatarUrl(otherUser?.avatarUrl);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition border-b border-gray-200 hover:bg-gray-50 ${
        isActive ? "bg-pink-50" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {chat.isGroup ? (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white font-semibold">
            {displayName?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        {chat.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
          </span>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800 truncate">
            {displayName}
          </h3>
          {chat.lastMessage && (
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {formatDate(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>
        {chat.lastMessage && (
          <p className="text-sm text-gray-600 truncate">
            {chat.lastMessage.sender.username}: {chat.lastMessage.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
