import {
  formatDate,
  getFullAvatarUrl,
  getFullImageUrl,
  isOwner,
} from "../utils";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const MessageBubble = ({ message, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isMine = isOwner(message.sender.id);

  const handleDelete = () => {
    onDelete(message.id);
    setShowDropdown(false);
  };

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex gap-2 max-w-[70%] ${isMine ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        <img
          src={getFullAvatarUrl(message.sender.avatarUrl)}
          alt={message.sender.username}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />

        {/* Message Content */}
        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2 ${
              isMine
                ? "bg-gradient-to-r from-pink-400 to-yellow-400 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {!isMine && (
              <p className="text-xs font-semibold mb-1">
                {message.sender.username}
              </p>
            )}

            {message.isDeleted ? (
              <p className="italic opacity-70">{message.content}</p>
            ) : (
              <>
                {message.attachmentUrl && (
                  <img
                    src={getFullImageUrl(message.attachmentUrl)}
                    alt="attachment"
                    className="rounded-lg mb-2 max-w-full"
                  />
                )}
                <p className="break-words">{message.content}</p>
              </>
            )}

            <p
              className={`text-xs mt-1 ${
                isMine ? "text-white/80" : "text-gray-500"
              }`}
            >
              {formatDate(message.createdAt)}
            </p>
          </div>

          {/* Delete Option */}
          {isMine && !message.isDeleted && (
            <div className="absolute top-1 right-1">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white/70 hover:text-white p-1"
              >
                <HiDotsVertical size={14} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[100px]">
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  >
                    <MdDelete size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
