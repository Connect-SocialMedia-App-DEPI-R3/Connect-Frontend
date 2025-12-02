import { useState } from "react";

const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";

const CommentsList = ({ comments, onAddComment, onDeleteComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  const getAvatarUrl = (author) => {
    if (!author) return "/default-avatar.png";
    if (!author.avatarUrl) return "/default-avatar.png";
    // لو المسار نسبي
    return author.avatarUrl.startsWith("/uploads")
      ? `${API_BASE_URL}${author.avatarUrl}`
      : author.avatarUrl;
  };

  return (
    <div className="bg-white mt-5 p-4 rounded-2xl shadow">
      <h3 className="font-semibold text-lg mb-3">Comments</h3>

      <div className="flex flex-col gap-3 mb-4">
        {(!comments || comments.length === 0) ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-2 rounded-xl flex justify-between items-start">
              <div className="flex items-start gap-3">
                <img
                  src={getAvatarUrl(c.author)}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div>
                  <p className="font-semibold text-sm">{c.author?.username || "Unknown"}</p>
                  <p className="text-gray-700">{c.content}</p>
                </div>
              </div>

              {onDeleteComment && (
                <button
                  onClick={() => onDeleteComment(c.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-xl p-2 focus:outline-pink-400"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 rounded-xl hover:bg-pink-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentsList;
