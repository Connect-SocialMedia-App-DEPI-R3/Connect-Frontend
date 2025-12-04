import { useState } from "react";
import { getFullAvatarUrl, isOwner } from "../utils";
import { useComments } from "../hook";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";

const CommentsList = ({ postId }) => {
  const { comments, loading, addComment, deleteComment, updateComment } =
    useComments(postId);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addComment(text);
      setText("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
    setDropdownOpen(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) return;

    try {
      await updateComment(commentId, editText);
      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setDropdownOpen(null);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white mt-5 p-4 rounded-2xl shadow">
        <h3 className="font-semibold text-lg mb-3">Comments</h3>
        <p className="text-gray-500 text-sm">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="bg-white mt-5 p-4 rounded-2xl shadow">
      <h3 className="font-semibold text-lg mb-3">Comments</h3>

      <div className="flex flex-col gap-3 mb-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-100 p-3 rounded-xl flex justify-between items-start gap-2"
            >
              <div className="flex items-start gap-3 flex-1">
                <img
                  src={getFullAvatarUrl(c.author?.avatarUrl)}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mt-1 object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">
                    {c.author?.username || "Unknown"}
                  </p>

                  {editingCommentId === c.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border rounded-lg p-2 text-sm focus:outline-pink-400 resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSaveEdit(c.id)}
                          className="bg-pink-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-pink-600 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 break-words">{c.content}</p>
                  )}
                </div>
              </div>

              {isOwner(c.author?.id) && editingCommentId !== c.id && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === c.id ? null : c.id)
                    }
                    className="text-gray-500 hover:text-gray-700 p-1 transition"
                  >
                    <HiDotsVertical size={18} />
                  </button>

                  {dropdownOpen === c.id && (
                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                      <button
                        onClick={() => handleEdit(c)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                      >
                        <MdEdit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                      >
                        <MdDelete size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
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
