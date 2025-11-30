import { useState } from "react";

const CommentsList = ({ comments, onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddComment(text);
    setText("");
  };

  return (
    <div className="bg-white mt-5 p-4 rounded-2xl shadow">
      <h3 className="font-semibold text-lg mb-3">Comments</h3>

      {/* Existing comments */}
      <div className="flex flex-col gap-3 mb-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-2 rounded-xl">
              <p className="font-semibold text-sm">{c.author}</p>
              <p className="text-gray-700">{c.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Add comment */}
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
