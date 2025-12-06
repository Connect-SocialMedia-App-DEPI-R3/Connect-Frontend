import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiMessageSquare } from "react-icons/fi";
import PostsList from "../components/PostsList.jsx";
import { useChats } from "../hook";
import toast from "react-hot-toast";
import { getFullAvatarUrl } from "../utils";

const Profile = ({ userData, posts, isOwner }) => {
  const [activeTab, setActiveTab] = useState("social");
  const navigate = useNavigate();
  const { createPrivateChat } = useChats();
  const [startingChat, setStartingChat] = useState(false);

  const handleStartChat = async () => {
    if (!userData?.id) return;

    setStartingChat(true);
    try {
      const chat = await createPrivateChat(userData.id);
      navigate(`/chats/${chat.id}`);
    } catch (err) {
      console.error("Failed to start chat:", err);
    } finally {
      setStartingChat(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl">Loading user data...</p>
      </div>
    );
  }

  const user = {
    avatar: getFullAvatarUrl(userData.avatarUrl),
    name: userData.fullName,
    username: userData.username,
    followersCount: userData.followerCount,
    followingCount: userData.followingCount,
    bio: userData.bio,
  };

  // فلترة البوستات حسب التاب
  const socialPosts = posts.filter((p) => !p.price);
  const marketPosts = posts.filter((p) => p.price);
  const postsToShow = activeTab === "social" ? socialPosts : marketPosts;

  return (
    <div className="flex-1 flex flex-col gap-8 p-5 overflow-y-auto">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-6 mb-6">
        <img
          src={user.avatar}
          alt="Avatar"
          className="rounded-full w-32 h-32 sm:w-36 sm:h-36 border-4 
            border-transparent object-cover
            bg-gradient-to-tr from-pink-400 via-yellow-300 to-pink-400 
            shadow-md shadow-pink-200"
        />

        <div className="flex-1 flex flex-col text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm sm:text-base">@{user.username}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 mt-3 text-gray-700 text-sm sm:text-base md:text-lg">
            <span>{user.followersCount} Followers</span>
            <span>{user.followingCount} Following</span>
            <span>{posts.length} Posts</span>
          </div>

          {isOwner ? (
            <Link
              to="/edit-profile"
              className="mt-4 px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-pink-500 
                       text-pink-500 hover:bg-pink-50 font-semibold text-sm sm:text-base text-center"
            >
              Edit Profile
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                className="flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-pink-500 
                               text-white font-semibold hover:bg-pink-600 text-sm sm:text-base"
              >
                Follow
              </button>
              <button
                onClick={handleStartChat}
                disabled={startingChat}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-gray-300 
                         text-gray-700 hover:bg-gray-50 font-semibold flex items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <FiMessageSquare size={18} />
                {startingChat ? "..." : "Message"}
              </button>
            </div>
          )}

          {user.bio && <p className="text-gray-700 mt-3">{user.bio}</p>}
        </div>
      </div>

      {/* ===== POSTS TOGGLE ===== */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-6">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base
            ${
              activeTab === "social" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
        >
          Social Posts
        </button>

        <button
          onClick={() => setActiveTab("market")}
          className={`px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base
            ${
              activeTab === "market"
                ? "bg-yellow-400 text-white"
                : "bg-gray-200"
            }`}
        >
          Market Posts
        </button>
      </div>

      {/* ===== POSTS LIST COMPONENT ===== */}
      <PostsList posts={postsToShow} />
    </div>
  );
};

export default Profile;
