import { useState, useRef, useEffect } from "react";

// Dummy data
const allUsers = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 5, name: "Eva", avatar: "https://i.pravatar.cc/40?img=5" },
];

const followedUsers = [allUsers[0], allUsers[1], allUsers[2]];

const ChatPage = () => {
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const chatEndRef = useRef(null);

  const chatsData = {
    1: [
      { id: 1, text: "Hi Alice!", fromMe: true },
      { id: 2, text: "Hello! How are you?", fromMe: false },
    ],
    2: [
      { id: 1, text: "Hey Bob!", fromMe: true },
      { id: 2, text: "Yo! What's up?", fromMe: false },
    ],
  };

  const openChat = (user) => {
    setCurrentChatUser(user);
    setMessages(chatsData[user.id] || []);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { id: Date.now(), text: newMessage, fromMe: true };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const startPrivateChat = (user) => {
    setCurrentChatUser(user);
    setMessages(chatsData[user.id] || []);
    setShowPrivateModal(false);
  };

  const startGroupChat = () => {
    if (selectedGroupUsers.length === 0) return;
    setCurrentChatUser({ id: 999, name: selectedGroupUsers.map(u => u.name).join(", ") });
    setMessages([{ id: 1, text: "Group chat created!", fromMe: true }]);
    setSelectedGroupUsers([]);
    setShowGroupModal(false);
  };

  const toggleGroupUser = (user) => {
    if (selectedGroupUsers.find(u => u.id === user.id)) {
      setSelectedGroupUsers(selectedGroupUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedGroupUsers([...selectedGroupUsers, user]);
    }
  };

  // Modal component
  const Modal = ({ title, children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">{title}</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-pink-500"
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
      <div className="p-6">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg min-h-[600px]">
          
          {/* Left Panel */}
          <div className="flex flex-col w-80 bg-white shadow-inner p-4">
            <div className="flex justify-end mb-4 relative">
              <button
                onClick={toggleDropdown}
                className="bg-pink-500 text-white px-3 py-2 rounded-xl hover:bg-pink-600 transition"
              >
                + New Chat
              </button>
              {showDropdown && (
                <div className="absolute top-10 right-0 bg-white border rounded-lg shadow-lg w-48 z-50">
                  <div
                    className="p-2 cursor-pointer hover:bg-pink-50"
                    onClick={() => {
                      setShowPrivateModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    Private Chat
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-pink-50"
                    onClick={() => {
                      setShowGroupModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    Group Chat
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {Object.keys(chatsData).map((key) => {
                const user = allUsers.find(u => u.id === parseInt(key));
                if (!user) return null;
                return (
                  <div
                    key={user.id}
                    className={`flex items-center p-2 rounded-xl cursor-pointer hover:bg-pink-50 transition ${
                      currentChatUser?.id === user.id ? "bg-pink-100" : ""
                    }`}
                    onClick={() => openChat(user)}
                  >
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />
                    <div>{user.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col p-4">
            {currentChatUser ? (
              <>
                <div className="text-xl font-semibold border-b pb-2 mb-4">
                  {currentChatUser.name}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded-xl max-w-xs ${
                        msg.fromMe ? "bg-pink-200 self-end" : "bg-gray-200 self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef}></div>
                </div>

                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a chat to start messaging
              </div>
            )}
          </div>
      </div>

      {/* Private Chat Modal */}
      {showPrivateModal && (
        <Modal title="Start Private Chat" onClose={() => setShowPrivateModal(false)}>
          {followedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 cursor-pointer hover:bg-pink-50 rounded"
              onClick={() => startPrivateChat(user)}
            >
              <img src={user.avatar} className="w-8 h-8 rounded-full mr-2" />
              {user.name}
            </div>
          ))}
        </Modal>
      )}

      {/* Group Chat Modal */}
      {showGroupModal && (
        <Modal title="Create Group Chat" onClose={() => setShowGroupModal(false)}>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 cursor-pointer hover:bg-pink-50 rounded"
              onClick={() => toggleGroupUser(user)}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={!!selectedGroupUsers.find(u => u.id === user.id)}
                readOnly
              />
              <img src={user.avatar} className="w-8 h-8 rounded-full mr-2" />
              {user.name}
            </div>
          ))}

          <button
            onClick={startGroupChat}
            className="mt-3 bg-pink-500 text-white w-full py-2 rounded-xl hover:bg-pink-600"
          >
            Start Group Chat
          </button>
        </Modal>
      )}

    </div>
  );
};

export default ChatPage;
