import { MdClose } from "react-icons/md";

const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";
const DEFAULT_AVATAR = "src/assets/placeholder_avatar.jpeg";

const ProfileModal = ({ isOpen, onClose, title, users, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

        {loading ? (
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-200 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div className="flex-1 h-4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src={user.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : DEFAULT_AVATAR}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
