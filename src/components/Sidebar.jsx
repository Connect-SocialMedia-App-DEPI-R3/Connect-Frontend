import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { getFullAvatarUrl, removeAuthToken } from "../utils";

const Sidebar = () => {
  // ✅ CONTEXT LESSON: Use context instead of hooks when data is needed globally
  // Context fetches once and shares across all components
  const { user, loading, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    // navigate("/login");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // ✅ Handle loading state
  if (loading) {
    return (
      <aside className="hidden md:flex w-1/4 max-w-sm bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center justify-center fixed top-0 left-0 h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </aside>
    );
  }

  return (
    <aside
      className="hidden md:flex w-1/4 max-w-sm bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center fixed top-0 left-0 h-screen overflow-auto"
      style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)" }}
    >
      {/* Profile Header */}
      <div className="text-center">
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
      <div className="flex justify-around w-full text-gray-700 mb-6">
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {user?.postCount || 0}
          </div>
          <div className="text-sm">Posts</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {user?.followingCount || 0}
          </div>
          <div className="text-sm">Following</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {user?.followerCount || 0}
          </div>
          <div className="text-sm">Followers</div>
        </div>
      </div>

      {/* View Profile Button */}
      {isLoggedIn && (
        <Link to="/profile" className="w-full mb-6">
          <button className="w-full bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
            View Profile
          </button>
        </Link>
      )}

      {/* Navigation Menu */}
      <nav className="w-full flex-1">
        <ul className="space-y-2 text-gray-700">
          <NavItem to="/" icon={<HiOutlineSquares2X2 />} label="Feed" />
          <NavItem to="/chat" icon={<LuMessageCircleMore />} label="Direct" />
          <NavItem
            to="/notifications"
            icon={<FaRegHeart />}
            label="Notifications"
          />
          <NavItem
            to="/settings"
            icon={<IoSettingsOutline />}
            label="Settings"
          />
          <NavItem
            to="/add-post"
            icon={<IoIosAddCircleOutline />}
            label="Add Post"
          />

          <hr className="my-3 border-gray-300/50" />

          <li
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer"
          >
            <MdOutlineLogout className="text-pink-500 text-2xl" />
            <span className="font-medium">
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// ✅ HOOK LESSON 4: Extract repeated JSX into reusable components
const NavItem = ({ to, icon, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition"
    >
      <span className="text-pink-500 text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  </li>
);

export default Sidebar;
