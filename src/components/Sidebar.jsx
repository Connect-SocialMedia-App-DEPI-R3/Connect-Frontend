import { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router";
import { api } from "../api/axios";

import defaultAvatar from "../assets/placeholder_avatar.jpeg"; // الصورة الافتراضية
const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net"; // السيرفر

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------- تحويل URL الصورة للعرض --------
  const getFullAvatarUrl = (url) => {
    if (!url || url === "") return defaultAvatar; // لو مفيش صورة ارجع الصورة الافتراضية
    return `${API_BASE_URL}${url}`;
  };

  // -------- جلب بيانات اليوزر الحالي --------
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setCurrentUser({
          ...res.data,
          avatarUrl: getFullAvatarUrl(res.data.avatarUrl)
        });
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="Sidebar hidden md:flex w-1/4 max-w-sm bg-gray-200 p-8 flex-col items-center text-center fixed top-0 left-0 h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="Sidebar hidden md:flex w-1/4 max-w-sm bg-linear-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center text-center fixed top-0 left-0 h-screen overflow-auto"
      style={{ boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)" }}
    >
      <img
        src={currentUser?.avatarUrl || defaultAvatar}
        alt="Profile"
        className="rounded-full w-28 h-28 mb-4 border-3 border-transparent 
             bg-linear-to-tr from-pink-400 via-yellow-300 to-pink-400 shadow-md shadow-pink-200"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {currentUser?.fullName || currentUser?.username}
      </h2>
      <p className="text-gray-600 mb-4">@{currentUser?.username}</p>

      <div className="flex justify-around w-full text-gray-700 mb-4">
        <div>
          <span className="font-semibold text-gray-900">{currentUser?.postsCount || 0}</span> Posts
        </div>
        <div>
          <span className="font-semibold text-gray-900">{currentUser?.followingCount || 0}</span> Following
        </div>
        <div>
          <span className="font-semibold text-gray-900">{currentUser?.followerCount || 0}</span> Followers
        </div>
      </div>

      <Link to="/profile">
        <button className="bg-linear-to-r from-pink-400 to-yellow-400 text-white font-medium px-5 py-2
         rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-pink-200 text-sm">
          View Profile
        </button>
      </Link>

      <div className="mt-4 w-full">
        <ul className="space-y-3 text-gray-700">
          <Link to="/">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <HiOutlineSquares2X2 className=" text-pink-500 text-2xl" />
              <span className="font-medium">Feed</span>
            </li>
          </Link>
          <Link to="/chat">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <LuMessageCircleMore className=" text-pink-500 text-2xl" />
              <span className="font-medium">Direct</span>
            </li>
          </Link>
          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
            <FaRegHeart className=" text-pink-500 text-2xl" />
            <span className="font-medium">Notifications</span>
          </li>
          <Link to="/settings">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <IoSettingsOutline className=" text-pink-500 text-2xl" />
              <span className="font-medium">Settings</span>
            </li>
          </Link>
          <Link to="/add-post">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <IoIosAddCircleOutline className="text-pink-500 text-2xl" />
              <span className="font-medium">Add Post</span>
            </li>
          </Link>
          <Link to="/marketplace">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <IoIosAddCircleOutline className="text-pink-500 text-2xl" />
              <span className="font-medium">Marketplace</span>
            </li>
          </Link>
          <hr />
          <Link to="/login">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
              <MdOutlineLogout className=" text-pink-500 text-2xl" />
              <span className="font-medium">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
