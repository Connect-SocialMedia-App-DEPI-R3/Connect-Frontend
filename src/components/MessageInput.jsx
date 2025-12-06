import { useState } from "react";
import { FiSend, FiPaperclip, FiX } from "react-icons/fi";

const MessageInput = ({ onSend, disabled }) => {
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !attachment) return;

    setSending(true);
    try {
      await onSend(content, attachment);
      setContent("");
      setAttachment(null);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      {attachment && (
        <div className="mb-2 flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <FiPaperclip className="text-gray-500" />
          <span className="text-sm text-gray-700 flex-1 truncate">
            {attachment.name}
          </span>
          <button
            type="button"
            onClick={removeAttachment}
            className="text-red-500 hover:text-red-700"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <label className="cursor-pointer text-gray-500 hover:text-pink-500 transition">
          <FiPaperclip size={20} />
          <input
            type="file"
            accept="image/*"
            onChange={handleAttachment}
            className="hidden"
            disabled={disabled}
          />
        </label>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={sending ? "Sending..." : "Type a message..."}
          disabled={disabled || sending}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={disabled || sending || (!content.trim() && !attachment)}
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {sending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
