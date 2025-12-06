import { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdClose, MdWarning } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { getFullAvatarUrl, removeAuthToken, getFullImageUrl } from "../utils";
import { useUserPosts } from "../hook/useUserPosts";
import { useFollowers } from "../hook/useFollowers";
import { useFollowing } from "../hook/useFollowing";
import { createPortal } from "react-dom";

const Sidebar = () => {
  const { user, loading, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const [openPostsModal, setOpenPostsModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [confirmDeletePost, setConfirmDeletePost] = useState({ isOpen: false, postId: null });

  const username = user?.username;
  const { posts, loading: postsLoading, refetch: refetchPosts } = useUserPosts(username);
  const { followers, loading: followersLoading } = useFollowers(username);
  const { following, loading: followingLoading } = useFollowing(username);

  const handleLogout = () => {
    removeAuthToken();
    window.location.reload();
  };
  const handleLogin = () => navigate("/login");

  const handleDeletePost = (postId) => {
    console.log("Deleting post:", postId);
    setConfirmDeletePost({ isOpen: false, postId: null });
    refetchPosts();
  };

  if (loading) {
    return (
      <aside className="hidden md:flex w-1/4 max-w-sm bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center justify-center fixed top-0 left-0 h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </aside>
    );
  }

  return (
    <aside
      className="hidden md:flex w-1/4 max-w-sm bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center fixed top-0 left-0 h-screen"
      style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex flex-col items-center w-full h-full overflow-y-auto scrollbar-hide">
        {/* Profile */}
        <div className="text-center flex-shrink-0">
          <img
            src={getFullAvatarUrl(user?.avatarUrl)}
            alt={user?.username || "Profile"}
            className="rounded-full w-28 h-28 mb-4 border-4 border-white shadow-lg object-cover mx-auto"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.fullName || user?.username || "Guest"}
          </h2>
          <p className="text-gray-600 mb-4">@{user?.username || "guest"}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around w-full text-gray-700 mb-6 flex-shrink-0">
          <div className="text-center cursor-pointer" onClick={() => setOpenPostsModal(true)}>
            <div className="font-semibold text-gray-900">{posts.length}</div>
            <div className="text-sm">Posts</div>
          </div>
          <div className="text-center cursor-pointer" onClick={() => setOpenFollowingModal(true)}>
            <div className="font-semibold text-gray-900">{user?.followingCount || 0}</div>
            <div className="text-sm">Following</div>
          </div>
          <div className="text-center cursor-pointer" onClick={() => setOpenFollowersModal(true)}>
            <div className="font-semibold text-gray-900">{user?.followerCount || 0}</div>
            <div className="text-sm">Followers</div>
          </div>
        </div>

        {/* View Profile */}
        {isLoggedIn && (
          <Link to="/profile" className="w-full mb-6 flex-shrink-0">
            <button className="w-full bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
              View Profile
            </button>
          </Link>
        )}

        {/* Navigation */}
        <nav className="w-full flex-1">
          <ul className="space-y-2 text-gray-700">
            <NavItem to="/" icon={<HiOutlineSquares2X2 />} label="Feed" />
            <NavItem to="/chats" icon={<FiMessageSquare />} label="Messages" />
            <NavItem to="/notifications" icon={<FaRegHeart />} label="Notifications" />
            <NavItem to="/settings" icon={<IoSettingsOutline />} label="Settings" />
            <hr className="my-3 border-gray-300/50" />
            <li
              onClick={isLoggedIn ? handleLogout : handleLogin}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer"
            >
              <MdOutlineLogout className="text-pink-500 text-2xl" />
              <span className="font-medium">{isLoggedIn ? "Logout" : "Login"}</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modals */}
      <Modal title="My Posts" isOpen={openPostsModal} onClose={() => setOpenPostsModal(false)}>
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map((p) => (
          <div key={p.id} className="p-2 border-b flex flex-col gap-2">
            <img
              src={getFullImageUrl(p.imageUrl)}
              alt={p.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.content}</p>
            <button
              className="text-red-500 font-semibold self-end"
              onClick={() => setConfirmDeletePost({ isOpen: true, postId: p.id })}
            >
              Delete
            </button>
          </div>
        ))}
      </Modal>

      <Modal title="Followers" isOpen={openFollowersModal} onClose={() => setOpenFollowersModal(false)}>
        {followersLoading ? <p>Loading...</p> : followers.map((f) => (
          <div key={f.id} className="p-2 border-b flex items-center gap-3">
            <img
              src={getFullAvatarUrl(f.avatarUrl)}
              alt={f.username}
              className="w-10 h-10 rounded-full"
            />
            <p>{f.username}</p>
          </div>
        ))}
      </Modal>

      <Modal title="Following" isOpen={openFollowingModal} onClose={() => setOpenFollowingModal(false)}>
        {followingLoading ? <p>Loading...</p> : following.map((f) => (
          <div key={f.id} className="p-2 border-b flex items-center gap-3">
            <img
              src={getFullAvatarUrl(f.avatarUrl)}
              alt={f.username}
              className="w-10 h-10 rounded-full"
            />
            <p>{f.username}</p>
          </div>
        ))}
      </Modal>

      <ConfirmModal
        isOpen={confirmDeletePost.isOpen}
        onClose={() => setConfirmDeletePost({ isOpen: false, postId: null })}
        onConfirm={() => handleDeletePost(confirmDeletePost.postId)}
        title="Delete Post?"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <li>
    <Link to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition">
      <span className="text-pink-500 text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  </li>
);

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
      <div
        className="relative bg-white rounded-2xl w-96 max-h-[75vh] flex flex-col border border-gray-300 shadow-lg z-50 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex-1 overflow-y-auto space-y-2">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDestructive = false }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <MdClose size={24} />
        </button>
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full ${isDestructive ? "bg-red-100" : "bg-blue-100"}`}>
            <MdWarning className={`text-2xl ${isDestructive ? "text-red-600" : "text-blue-600"}`} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition">
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 font-semibold py-2 px-4 rounded-xl transition ${isDestructive ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
