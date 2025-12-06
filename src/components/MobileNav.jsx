import { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout, MdClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { getFullAvatarUrl, removeAuthToken } from "../utils";
import { SiCoinmarketcap } from "react-icons/si";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    setIsOpen(false);
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-gradient-to-r from-pink-400 to-yellow-400 text-white p-3 rounded-xl shadow-lg hover:scale-105 transition"
        aria-label="Open menu"
      >
        <HiMenuAlt3 className="text-2xl" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-80 bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)" }}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-gray-700 hover:text-pink-500 transition"
          aria-label="Close menu"
        >
          <MdClose className="text-3xl" />
        </button>

        {/* Scrollable Content */}
        <div className="flex flex-col items-center w-full h-full overflow-y-auto scrollbar-hide p-8 pt-16">
          {/* Profile Header */}
          <div className="text-center flex-shrink-0 mb-6">
            <img
              src={getFullAvatarUrl(user?.avatarUrl)}
              alt={user?.username || "Profile"}
              className="rounded-full w-24 h-24 mb-3 border-4 border-white shadow-lg object-cover mx-auto"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.fullName || user?.username || "Guest"}
            </h2>
            <p className="text-gray-600 text-sm">
              @{user?.username || "guest"}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-around w-full text-gray-700 mb-6 flex-shrink-0">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {user?.postCount || 0}
              </div>
              <div className="text-xs">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {user?.followingCount || 0}
              </div>
              <div className="text-xs">Following</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {user?.followerCount || 0}
              </div>
              <div className="text-xs">Followers</div>
            </div>
          </div>

          {/* View Profile Button */}
          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={closeMenu}
              className="w-full mb-6 flex-shrink-0"
            >
              <button className="w-full bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
                View Profile
              </button>
            </Link>
          )}

          {/* Navigation Menu */}
          <nav className="w-full flex-1">
            <ul className="space-y-2 text-gray-700">
              <MobileNavItem
                to="/"
                icon={<HiOutlineSquares2X2 />}
                label="Feed"
                onClick={closeMenu}
              />
              <MobileNavItem to="/market" icon={<SiCoinmarketcap />} label="Market" />
              <MobileNavItem
                to="/chats"
                icon={<FiMessageSquare />}
                label="Messages"
                onClick={closeMenu}
              />
              <MobileNavItem
                to="/settings"
                icon={<IoSettingsOutline />}
                label="Settings"
                onClick={closeMenu}
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
        </div>
      </aside>
    </>
  );
};

const MobileNavItem = ({ to, icon, label, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition"
    >
      <span className="text-pink-500 text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  </li>
);

export default MobileNav;
