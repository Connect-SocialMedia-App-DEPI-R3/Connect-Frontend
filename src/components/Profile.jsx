import { useState, useEffect } from "react";
import { FaUserPlus, FaUserCheck, FaEdit, FaRegHeart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router";

const Profile = ({
  user,     
  posts,
  isOwner = true,
  onFollowToggle
}) => {
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl">Loading user data...</p>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [following, setFollowing] = useState(user.isFollowing || false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setFollowing(user.isFollowing || false);
  }, [user]);

  const handleFollowClick = () => {
    setFollowing(!following);
    if (onFollowToggle) onFollowToggle(!following);
  };

  return (
    <div className="flex-1 flex flex-col gap-8 p-5 overflow-y-auto">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-6 mb-8">

        <div className="flex flex-col items-center sm:items-start gap-3">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full w-28 h-28 sm:w-32 sm:h-32 border-3 border-transparent 
             bg-linear-to-tr from-pink-400 via-yellow-300 to-pink-400 shadow-md shadow-pink-200"
          />
          <p className="text-gray-500 text-sm sm:hidden">@{user.username}</p>
        </div>

        <div className="flex-1 flex flex-col text-center sm:text-left items-center sm:items-start">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
            <div>
          {isOwner ? (
            <button
              className="flex items-center gap-2 border border-pink-500 text-pink-500 rounded-full px-4 py-2 font-semibold hover:bg-pink-50 transition"
              onClick={() => alert("Edit Profile clicked")}
            >
              <FaEdit />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollowClick}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition
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
          <div className="flex items-center justify-center sm:justify-start gap-6 mt-2 text-gray-700 text-sm sm:text-lg">
            <div>
              <span className="font-semibold">{user.postsCount}</span> Posts
            </div>
            <div>
              <span className="font-semibold">{user.followersCount}</span> Followers
            </div>
            <div>
              <span className="font-semibold">{user.followingCount}</span> Following
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end gap-4 text-2xl text-pink-500">
            <Link to="/">
            <FaHouse className="cursor-pointer hover:scale-110 transition-transform duration-200" />
            </Link>
            <FaRegHeart className="cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>


      {/* bio */}
      {user.bio && <p className="text-gray-700 text-center sm:text-left">{user.bio}</p>}

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  bg-transparent">
        {posts.length ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-xl w-full mb-3 object-cover aspect-square"
                />
              )}
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
