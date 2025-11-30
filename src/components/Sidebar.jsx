import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="Sidebar hidden md:flex w-1/4 max-w-sm bg-linear-to-br from-yellow-200 via-pink-200 to-pink-200 p-8 flex-col items-center text-center fixed top-0 left-0 h-screen overflow-auto"
    style={{
        boxShadow: "4px 0 15px rgba(0, 0, 0, 0.15)" 
      }}>
        <img src="src/assets/HelloKitty.jpg" alt="Profile" className="rounded-full w-28 h-28 mb-4 border-3 border-transparent 
             bg-linear-to-tr from-pink-400 via-yellow-300 to-pink-400 shadow-md shadow-pink-200 "/>
        <h2 className="text-xl font-semibold text-gray-800">Hello Kitty</h2>
        <p className="text-gray-600 mb-4">@hello_kitty1</p>

        <div className="flex justify-around w-full text-gray-700 mb-4">
          <div>
            <span className="font-semibold text-gray-900">10</span> Posts
          </div>
          <div>
            <span className="font-semibold text-gray-900">150</span> Following
          </div>
          <div>
            <span className="font-semibold text-gray-900">200</span> Followers
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
               <HiOutlineSquares2X2 className=" text-pink-500 text-2xl"/>
               <span className="font-medium">Feed</span>
            </li>
            </Link>
            <Link to="/chat">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <LuMessageCircleMore className=" text-pink-500 text-2xl"/>
               <span className="font-medium">Direct</span>
            </li>
            </Link>
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <FaRegHeart className=" text-pink-500 text-2xl"/>
               <span className="font-medium">Notifications</span>
            </li>
            <Link to="/settings">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <IoSettingsOutline className=" text-pink-500 text-2xl"/>
               <span className="font-medium">Settings</span>
            </li>
            </Link>
            <Link to="/add-post">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <IoIosAddCircleOutline className="text-pink-500 text-2xl"/>
               <span className="font-medium">Add Post</span>
            </li>
            </Link>
            <Link to="/marketplace">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <IoIosAddCircleOutline className="text-pink-500 text-2xl"/>
               <span className="font-medium">Marketplace</span>
            </li>
            </Link>
            <hr />
            <Link to="/login">
            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition cursor-pointer">
               <MdOutlineLogout className=" text-pink-500 text-2xl"/>
               <span className="font-medium">Logout</span>
            </li>
            </Link>
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
