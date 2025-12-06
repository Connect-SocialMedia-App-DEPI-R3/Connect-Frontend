import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiMessageSquare } from "react-icons/fi";
import PostsList from "../components/PostsList.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import { useFollow } from "../hook/useFollow";
import { useFollowers } from "../hook/useFollowers";
import { useFollowing } from "../hook/useFollowing";
import { useChats } from "../hook"; // إضافة hook الخاص بالمحادثات
import { getFullAvatarUrl } from "../utils";

const Profile = ({ userData, posts, isOwner, currentUser }) => {
  const [activeTab, setActiveTab] = useState("social");
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followersCount, setFollowersCount] = useState(userData?.followerCount ?? 0);
  const [startingChat, setStartingChat] = useState(false);

  const navigate = useNavigate();

  // ======= HOOKS =======
  const { isFollowing, loading: loadingFollow, toggleFollow } = useFollow(userData?.username);
  const { followers, loading: loadingFollowers, refetch: refetchFollowers } = useFollowers(userData?.username);
  const { following, loading: loadingFollowing, refetch: refetchFollowing } = useFollowing(userData?.username);
  const { createPrivateChat } = useChats();

  // ======= POSTS FILTER =======
  const socialPosts = posts?.filter(p => !p.price) ?? [];
  const marketPosts = posts?.filter(p => p.price) ?? [];
  const postsToShow = activeTab === "social" ? socialPosts : marketPosts;

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl">Loading profile...</p>
      </div>
    );
  }

  const user = {
    avatar: getFullAvatarUrl(userData.avatarUrl),
    name: userData.fullName,
    username: userData.username,
    bio: userData.bio,
  };

  // ======= Follow/Unfollow =======
  const handleToggleFollowButton = async () => {
    try {
      const result = await toggleFollow();
      setFollowersCount(prev => result.isFollowing ? prev + 1 : prev - 1);
      refetchFollowers();
      refetchFollowing();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFollowModal = (username, isNowFollowing) => {
    setFollowersCount(prev => isNowFollowing ? prev + 1 : prev - 1);
    refetchFollowers();
    refetchFollowing();
  };

  // ======= Start Chat =======
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

  return (
    <div className="flex-1 flex flex-col gap-8 p-5 overflow-y-auto">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-6 mb-6">
        <img
          src={user.avatar}
          alt="Avatar"
          className="rounded-full w-32 h-32 sm:w-36 sm:h-36 border-4 border-transparent object-cover bg-gradient-to-tr from-pink-400 via-yellow-300 to-pink-400 shadow-md shadow-pink-200"
        />

        <div className="flex-1 flex flex-col text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm sm:text-base">@{user.username}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 mt-3 text-gray-700 text-sm sm:text-base md:text-lg">
            <span className="cursor-pointer" onClick={() => setShowFollowersModal(true)}>
              {followersCount} Followers
            </span>
            <span className="cursor-pointer" onClick={() => setShowFollowingModal(true)}>
              {following?.length ?? 0} Following
            </span>
            <span>{posts?.length ?? 0} Posts</span>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {!isOwner && (
              <>
                <button
                  onClick={handleToggleFollowButton}
                  disabled={loadingFollow}
                  className={`flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-semibold ${isFollowing ? "bg-gray-200 text-gray-700" : "bg-pink-500 text-white"}`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>

                <button
                  onClick={handleStartChat}
                  disabled={startingChat}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMessageSquare size={18} />
                  {startingChat ? "..." : "Message"}
                </button>
              </>
            )}

            {isOwner && (
              <Link
                to="/edit-profile"
                className="flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold text-center"
              >
                Edit Profile
              </Link>
            )}
          </div>

          {user.bio && <p className="text-gray-700 mt-3">{user.bio}</p>}
        </div>
      </div>

      {/* ===== POSTS TOGGLE ===== */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-6">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-6 py-2 rounded-xl font-semibold ${activeTab === "social" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
        >
          Social Posts
        </button>
        <button
          onClick={() => setActiveTab("market")}
          className={`px-6 py-2 rounded-xl font-semibold ${activeTab === "market" ? "bg-yellow-400 text-white" : "bg-gray-200"}`}
        >
          Market Posts
        </button>
      </div>

      {/* ===== POSTS LIST ===== */}
      <PostsList posts={postsToShow} />

      {/* ===== MODALS ===== */}
      <ProfileModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={followers?.map(u => ({
          ...u,
          isOwner: u.username === currentUser,
          isFollowing: following?.some(f => f.username === u.username) ?? false,
        })) ?? []}
        loading={loadingFollowers}
        onToggleFollowGlobal={handleToggleFollowModal}
      />

      <ProfileModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={following?.map(u => ({
          ...u,
          isOwner: u.username === currentUser,
          isFollowing: following?.some(f => f.username === u.username) ?? false,
        })) ?? []}
        loading={loadingFollowing}
        onToggleFollowGlobal={handleToggleFollowModal}
      />
    </div>
  );
};

export default Profile;
