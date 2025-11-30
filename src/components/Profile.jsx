import { useState, useEffect } from "react";
import { FaUserPlus, FaUserCheck, FaEdit, FaRegHeart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router";

// ==== Followers / Following Modal ====
const FollowersModal = ({ title, users, onClose }) => {
  const [userList, setUserList] = useState(users);

  const toggleFollow = (username) => {
    setUserList(
      userList.map(u =>
        u.username === username ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  const blockUser = (username) => {
    setUserList(userList.filter(u => u.username !== username));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gradient-to-r from-pink-100/30 via-purple-100/30 to-blue-100/30 backdrop-blur-lg">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl transform transition-all duration-300 scale-105">
        <h2 className="font-bold text-xl mb-5 text-center">{title}</h2>
        <ul className="max-h-72 overflow-y-auto space-y-4">
          {userList.map((u) => (
            <li
              key={u.username}
              className="flex items-center justify-between gap-4 p-2 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.avatar}
                  className="w-10 h-10 rounded-full border-2 border-pink-300 shadow-sm"
                  alt={u.username}
                />
                <span className="font-medium text-gray-700">{u.username}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFollow(u.username)}
                  className={`px-3 py-1 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    u.isFollowing
                      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  {u.isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button
                  onClick={() => blockUser(u.username)}
                  className="px-3 py-1 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Block
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-2xl w-full font-semibold hover:bg-pink-600 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ==== Profile Component ====
const Profile = ({ user, posts, isOwner = true, onFollowToggle }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl">Loading user data...</p>
      </div>
    );
  }

  const [following, setFollowing] = useState(user.isFollowing || false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("social"); // social / market

  useEffect(() => {
    setFollowing(user.isFollowing || false);
  }, [user]);

  const handleFollowClick = () => {
    setFollowing(!following);
    if (onFollowToggle) onFollowToggle(!following);
  };

  // بيانات وهمية للفولورز والفولولينج
  const followersList = [
    { username: "user1", avatar: "/src/assets/HelloKitty.jpg", isFollowing: false },
    { username: "user2", avatar: "/src/assets/HelloKitty1.jpg", isFollowing: true },
    { username: "user3", avatar: "/src/assets/HelloKitty2.webp", isFollowing: false },
    { username: "user4", avatar: "/src/assets/HelloKitty3.jpg", isFollowing: true },
  ];

  const followingList = [
    { username: "userA", avatar: "/src/assets/HelloKitty4.jpg", isFollowing: true },
    { username: "userB", avatar: "/src/assets/HelloKitty5.png", isFollowing: true },
    { username: "userC", avatar: "/src/assets/HelloKitty3.jpg", isFollowing: true },
  ];

  // تقسيم البوستات حسب النوع
  const socialPosts = posts.filter(p => !p.price);
  const marketPosts = posts.filter(p => p.price);
  const postsToShow = activeTab === "social" ? socialPosts : marketPosts;

  return (
    <div className="flex-1 flex flex-col gap-8 p-5 overflow-y-auto">

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-6 mb-6">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full w-32 h-32 sm:w-36 sm:h-36 border-4 border-transparent bg-gradient-to-tr from-pink-400 via-yellow-300 to-pink-400 shadow-lg shadow-pink-200"
          />
          <p className="text-gray-500 text-sm sm:hidden">@{user.username}</p>
        </div>

        <div className="flex-1 flex flex-col text-center sm:text-left items-center sm:items-start">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
            <h1 className="text-3xl sm:text-4xl font-bold">{user.name}</h1>
            <div>
              {isOwner ? (
  <Link
    to="/edit-profile"
    className="flex items-center gap-2 border border-pink-500 text-pink-500 rounded-full px-5 py-3 font-semibold hover:bg-pink-50 transition"
  >
    <FaEdit />
    Edit Profile
  </Link>
) : (
                <button
                  onClick={handleFollowClick}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition
                    ${following
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "border border-pink-500 text-pink-500 hover:bg-pink-50"
                    }`}
                >
                  {following ? <FaUserCheck /> : <FaUserPlus />}
                  {following ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <p className="hidden sm:block text-gray-500">@{user.username}</p>
          <div className="flex items-center justify-center sm:justify-start gap-8 mt-3 text-gray-700 text-sm sm:text-lg">
            <div className="cursor-pointer" onClick={() => setShowFollowers(true)}>
              <span className="font-semibold">{user.followersCount}</span> Followers
            </div>
            <div className="cursor-pointer" onClick={() => setShowFollowing(true)}>
              <span className="font-semibold">{user.followingCount}</span> Following
            </div>
            <div>
              <span className="font-semibold">{user.postsCount}</span> Posts
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end gap-5 text-2xl text-pink-500">
          <Link to="/">
            <FaHouse className="cursor-pointer hover:scale-110 transition-transform duration-200" />
          </Link>
          <FaRegHeart className="cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      {/* bio */}
      {user.bio && <p className="text-gray-700 text-center sm:text-left text-lg">{user.bio}</p>}

      {/* ==== TABS ==== */}
      <div className="flex justify-center gap-4 mt-4 mb-6">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "social" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
           Social Posts
        </button>
        <button
          onClick={() => setActiveTab("market")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "market" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
           Market Posts
        </button>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.length ? (
          postsToShow.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-xl w-full mb-3 object-cover aspect-square"
                />
              )}
              <p className="text-gray-800 text-lg">{post.content}</p>

              {/* السعر لو موجود */}
              {post.price && (
                <p className="text-yellow-600 font-bold mt-2 text-lg">{post.price}</p>
              )}

              {/* Like & Comment */}
              <div className="flex justify-around border-t pt-3 text-gray-500">
                <button className="flex items-center gap-2 hover:text-pink-500 transition">
                  <FaRegHeart className="text-xl" />
                  <span>{post.likes || 0} Likes</span>
                </button>
                <button className="flex items-center gap-2 hover:text-pink-500 transition">
                  <FiMessageCircle className="text-xl" />
                  <span>{post.comments || 0} Comments</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg">No posts yet.</p>
        )}
      </div>

      {/* Followers / Following Modals */}
      {showFollowers && (
        <FollowersModal
          title="Followers"
          users={followersList}
          onClose={() => setShowFollowers(false)}
        />
      )}
      {showFollowing && (
        <FollowersModal
          title="Following"
          users={followingList}
          onClose={() => setShowFollowing(false)}
        />
      )}
    </div>
  );
};

export default Profile;
