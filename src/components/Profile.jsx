import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUserCheck, FaEdit, FaRegHeart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router";
import { api } from "../api/axios"; 


const Profile = ({ userData, posts, isOwner }) => {

  const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";
  const defaultAvatar = "src/assets/placeholder_avatar.jpeg";

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-xl">Loading user data...</p>
      </div>
    );
  }

  const user = {
    avatar: userData.avatarUrl
      ? `${API_BASE_URL}${userData.avatarUrl}`
      : defaultAvatar,
    name: userData.fullName,
    username: userData.username,
    followersCount: userData.followerCount,
    followingCount: userData.followingCount,
    bio: userData.bio,
  };

  const socialPosts = posts.filter(p => !p.price);
  const marketPosts = posts.filter(p => p.price);

  const [activeTab, setActiveTab] = useState("social");
  const postsToShow = activeTab === "social" ? socialPosts : marketPosts;

  return (
    <div className="flex-1 flex flex-col gap-8 p-5 overflow-y-auto">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-6 mb-6">
        
        <img
          src={user.avatar}
          alt="Avatar"
          className="rounded-full w-32 h-32 sm:w-36 sm:h-36 border-4 
             border-transparent 
             bg-gradient-to-tr from-pink-400 via-yellow-300 to-pink-400 
             shadow-md shadow-pink-200"
        />

        <div className="flex-1 flex flex-col text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>

          <div className="flex items-center gap-8 mt-3 text-gray-700 text-lg">
            <span>{user.followersCount} Followers</span>
            <span>{user.followingCount} Following</span>
            <span>{posts.length} Posts</span>
          </div>

          {/* OWN PROFILE */}
          {isOwner ? (
            <Link
              to="/edit-profile"
              className="mt-4 px-5 py-3 rounded-full border border-pink-500 
                       text-pink-500 hover:bg-pink-50 font-semibold"
            >
              Edit Profile
            </Link>
          ) : (
            <button className="mt-4 px-5 py-3 rounded-full bg-pink-500 
                               text-white font-semibold hover:bg-pink-600">
              Follow
            </button>
          )}

          {user.bio && <p className="text-gray-700 mt-3">{user.bio}</p>}
        </div>
      </div>

      {/* ===== POSTS TOGGLE ===== */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-6 py-2 rounded-xl font-semibold 
            ${activeTab === "social" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
        >
          Social Posts
        </button>

        <button
          onClick={() => setActiveTab("market")}
          className={`px-6 py-2 rounded-xl font-semibold 
            ${activeTab === "market" ? "bg-yellow-400 text-white" : "bg-gray-200"}`}
        >
          Market Posts
        </button>
      </div>

      {/* ===== POSTS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-2xl shadow-lg">
            {post.image && (
              <img src={post.image} className="rounded-xl mb-3 w-full" />
            )}
            <p className="text-lg">{post.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;
