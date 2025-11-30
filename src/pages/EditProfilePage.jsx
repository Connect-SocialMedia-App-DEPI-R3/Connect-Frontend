import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

const EditProfilePage = () => {
  const [user, setUser] = useState({
    username: "hello_kitty1",
    name: "Hello Kitty",
    avatar: "/src/assets/HelloKitty.jpg",
    bio: "welcome to my world!",
  });

  // Social posts
  const socialPosts = [
    {
      id: 1,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "8 hours ago",
      content: "me and my lovely friends",
      image: "/src/assets/HelloKitty1.jpg",
      likes: 25,
      comments: 4,
    },
    {
      id: 2,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "2 hours ago",
      content: "we Love this new platform!",
      image: "/src/assets/HelloKitty2.webp",
      likes: 40,
      comments: 10,
    },
    {
      id: 3,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "5 hours ago",
      content: "I love boba",
      image: "/src/assets/HelloKitty3.jpg",
      likes: 15,
      comments: 3,
    },
  ];

  // Market posts
  const marketPosts = [
    {
      id: 4,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "10 hours ago",
      content: "Selling cute plush toy",
      image: "/src/assets/HelloKitty4.jpg",
      price: "$20",
      likes: 10,
      comments: 2,
    },
    {
      id: 5,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "12 hours ago",
      content: "Handmade keychains for sale",
      image: "/src/assets/HelloKitty5.png",
      price: "$5",
      likes: 8,
      comments: 1,
    },
  ];

  const [selectedTab, setSelectedTab] = useState("social"); // social | market
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = selectedTab === "social" ? socialPosts : marketPosts;

  const savePostChanges = () => {
    if (selectedTab === "social") {
      const index = socialPosts.findIndex((p) => p.id === selectedPost.id);
      if (index !== -1) socialPosts[index] = selectedPost;
    } else {
      const index = marketPosts.findIndex((p) => p.id === selectedPost.id);
      if (index !== -1) marketPosts[index] = selectedPost;
    }
    setSelectedPost(null);
  };

  const deletePost = (id) => {
    if (confirm("Delete this post?")) {
      if (selectedTab === "social") {
        const index = socialPosts.findIndex((p) => p.id === id);
        if (index !== -1) socialPosts.splice(index, 1);
      } else {
        const index = marketPosts.findIndex((p) => p.id === id);
        if (index !== -1) marketPosts.splice(index, 1);
      }
      setSelectedPost(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-6">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">Edit Profile</h1>

        {/* PROFILE CARD */}
        <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
          {/* AVATAR */}
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  const url = prompt("Enter new image URL:", user.avatar);
                  if (url) setUser({ ...user, avatar: url });
                }}
                className="px-4 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition shadow"
              >
                Edit Avatar
              </button>
              <button
                onClick={() => setUser({ ...user, avatar: "" })}
                className="px-4 py-2 bg-red-400 text-white rounded-xl hover:bg-red-500 transition shadow"
              >
                Delete Avatar
              </button>
            </div>
          </div>

          {/* NAME */}
          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-xl font-semibold text-pink-700">
              Name: <span className="text-gray-700">{user.name}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const v = prompt("New name:", user.name);
                  if (v) setUser({ ...user, name: v });
                }}
                className="px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setUser({ ...user, name: "" })}
                className="px-4 py-2 bg-red-300 text-red-800 rounded-xl hover:bg-red-400 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* USERNAME */}
          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-xl font-semibold text-pink-700">
              Username: <span className="text-gray-700">@{user.username}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const v = prompt("New username:", user.username);
                  if (v) setUser({ ...user, username: v });
                }}
                className="px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setUser({ ...user, username: "" })}
                className="px-4 py-2 bg-red-300 text-red-800 rounded-xl hover:bg-red-400 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* BIO */}
          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-xl font-semibold text-pink-700 w-3/4">
              Bio: <span className="text-gray-700">{user.bio}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const v = prompt("New bio:", user.bio);
                  if (v) setUser({ ...user, bio: v });
                }}
                className="px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setUser({ ...user, bio: "" })}
                className="px-4 py-2 bg-red-300 text-red-800 rounded-xl hover:bg-red-400 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-8 mb-4">
          <button
            onClick={() => setSelectedTab("social")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              selectedTab === "social"
                ? "bg-pink-500 text-white"
                : "bg-pink-100 text-pink-700 hover:bg-pink-200"
            }`}
          >
            Social Posts
          </button>
          <button
            onClick={() => setSelectedTab("market")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              selectedTab === "market"
                ? "bg-purple-500 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            Market Posts
          </button>
        </div>

        {/* POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost({ ...post })}
              className="cursor-pointer bg-white p-4 rounded-2xl shadow hover:shadow-xl transition relative"
            >
              <img src={post.image} className="w-full h-56 object-cover rounded-xl" />
              <p className="mt-3 text-gray-700">{post.content}</p>
              {post.price && (
                <p className="text-pink-600 font-semibold mt-2">{post.price}</p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
                className="absolute top-3 right-3 px-3 py-1 bg-red-400 text-white rounded-xl hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT POST MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold text-pink-600">Edit Post</h2>

            <img src={selectedPost.image} className="w-full rounded-xl mb-2" />

            <input
              type="text"
              value={selectedPost.image}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, image: e.target.value })
              }
              className="w-full p-2 border rounded-xl"
              placeholder="Image URL"
            />

            <textarea
              value={selectedPost.content}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, content: e.target.value })
              }
              className="w-full p-3 border rounded-xl"
              placeholder="Caption"
            />

            {selectedPost.price !== undefined && (
              <input
                type="text"
                value={selectedPost.price}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, price: e.target.value })
                }
                className="w-full p-2 border rounded-xl"
                placeholder="Price"
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={savePostChanges}
                className="px-5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditProfilePage;
