import { useState } from "react";
import { useNavigate } from "react-router";
import { FiMessageSquare, FiSearch } from "react-icons/fi";
import { useUsers, useChats } from "../hook";
import { getFullAvatarUrl } from "../utils";

const UsersPage = () => {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const { createPrivateChat } = useChats();
  const [searchQuery, setSearchQuery] = useState("");
  const [startingChat, setStartingChat] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartChat = async (userId) => {
    setStartingChat(userId);
    try {
      const chat = await createPrivateChat(userId);
      navigate(`/chats/${chat.id}`);
    } catch (err) {
      console.error("Failed to start chat:", err);
    } finally {
      setStartingChat(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-pink-400 to-yellow-400 p-3 rounded-xl">
              <FiMessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Start a Chat</h1>
              <p className="text-sm text-gray-500">Select a user to message</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No users found</p>
          </div>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getFullAvatarUrl(user.avatarUrl)}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {user.fullName || user.username}
                    </h3>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleStartChat(user.id)}
                  disabled={startingChat === user.id}
                  className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <FiMessageSquare size={18} />
                  {startingChat === user.id ? "Starting..." : "Message"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
