import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import ChatListItem from "../components/ChatListItem";
import { useChats } from "../hook";
import chatService from "../services/chatService";

const ChatsPage = () => {
  const navigate = useNavigate();
  const { chats, loading } = useChats();
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Connect to SignalR on mount
  useEffect(() => {
    let isMounted = true;

    const connectToChat = async () => {
      const token = localStorage.getItem("token");
      if (token && !connecting && !chatService.isConnected()) {
        setConnecting(true);
        try {
          await chatService.connect(token);
          if (isMounted) {
            setIsConnected(true);
            setConnecting(false);
          }
        } catch (err) {
          console.error("Failed to connect to chat service:", err);
          if (isMounted) {
            setConnecting(false);
          }
        }
      } else if (chatService.isConnected()) {
        setIsConnected(true);
      }
    };

    connectToChat();

    return () => {
      isMounted = false;
      // Don't disconnect here - keep connection alive for the app
    };
  }, []);

  // Join new chats when they appear
  useEffect(() => {
    if (isConnected && chats.length > 0) {
      chats.forEach((chat) => {
        chatService.joinChat(chat.id);
      });
    }
  }, [chats, isConnected]);

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-pink-400 to-yellow-400 p-2 sm:p-3 rounded-xl">
                <FiMessageSquare
                  size={20}
                  className="sm:w-6 sm:h-6 text-white"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Messages
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isConnected ? "Connected" : "Connecting..."}
                </p>
              </div>
            </div>

            {/* TODO: Add button to create new group/chat */}
            <button
              onClick={() => navigate("/users")}
              className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <FiUsers size={18} />
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {chats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiMessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No messages yet</p>
            <p className="text-sm">Start a conversation with someone!</p>
          </div>
        ) : (
          <div>
            {chats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
