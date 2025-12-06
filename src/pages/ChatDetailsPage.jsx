import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FiArrowLeft, FiMoreVertical, FiUsers } from "react-icons/fi";
import MessagesList from "../components/MessagesList";
import MessageInput from "../components/MessageInput";
import { useMessages, useChatDetails } from "../hook";
import { getFullAvatarUrl } from "../utils";

const ChatDetailsPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { messages, loading, hasMore, sendMessage, deleteMessage, loadMore } =
    useMessages(chatId);
  const { chat, loading: chatLoading } = useChatDetails(chatId);
  const [showMenu, setShowMenu] = useState(false);

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

  const otherUser = chat?.isGroup
    ? null
    : chat?.members?.find((m) => m.user.id !== getCurrentUserId())?.user;

  const displayName = chat?.isGroup
    ? chat.name
    : otherUser?.username || "Loading...";
  const displayAvatar = chat?.isGroup
    ? null
    : getFullAvatarUrl(otherUser?.avatarUrl);

  const handleSendMessage = async (content, attachment) => {
    await sendMessage(content, attachment);
  };

  const handleGoToProfile = () => {
    if (!chat?.isGroup && otherUser) {
      navigate(`/profile/${otherUser.username}`);
    }
  };

  if (chatLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            onClick={() => navigate("/chats")}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft size={24} />
          </button>

          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1 min-w-0"
            onClick={handleGoToProfile}
          >
            {chat?.isGroup ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                {displayName?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                {displayName}
              </h2>
              {chat?.isGroup && (
                <p className="text-xs text-gray-500 truncate">
                  {chat.members?.length} members
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-600 hover:text-gray-800 relative"
        >
          <FiMoreVertical size={24} />

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[150px]">
              {chat?.isGroup ? (
                <>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                    <FiUsers size={16} />
                    View Members
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500">
                    Leave Group
                  </button>
                </>
              ) : (
                <button
                  onClick={handleGoToProfile}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  View Profile
                </button>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Messages */}
      <MessagesList
        messages={messages}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onDelete={deleteMessage}
      />

      {/* Input */}
      <MessageInput onSend={handleSendMessage} disabled={false} />
    </div>
  );
};

export default ChatDetailsPage;
