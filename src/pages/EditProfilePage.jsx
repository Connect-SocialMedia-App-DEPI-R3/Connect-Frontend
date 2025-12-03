import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { api } from "../api/axios";

const defaultAvatar = "/src/assets/placeholder_avatar.jpeg";
const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [tempValue, setTempValue] = useState("");

  const [socialPosts, setSocialPosts] = useState([]);
  const [marketPosts, setMarketPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("social");
  const [selectedPost, setSelectedPost] = useState(null);

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // -------- URL HANDLER --------
  const getFullAvatarUrl = (url) => {
    if (!url) return defaultAvatar;
    return url.startsWith("/") ? API_BASE_URL + url : url;
  };

  // -------- FETCH USER --------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const fullAvatarUrl = getFullAvatarUrl(res.data.avatarUrl);
        const data = { ...res.data, avatarUrl: fullAvatarUrl };
        setUser(data);

        setSocialPosts(
          res.data.socialPosts?.map(p => ({ ...p, avatar: getFullAvatarUrl(p.avatar) })) || [
            { id: 1, username: res.data.username, avatar: fullAvatarUrl, time: "8 hours ago", content: "me and my lovely friends", image: "/src/assets/HelloKitty1.jpg", likes: 25, comments: 4 },
            { id: 2, username: res.data.username, avatar: fullAvatarUrl, time: "2 hours ago", content: "we Love this new platform!", image: "/src/assets/HelloKitty2.webp", likes: 40, comments: 10 },
          ]
        );

        setMarketPosts(
          res.data.marketPosts?.map(p => ({ ...p, avatar: getFullAvatarUrl(p.avatar) })) || [
            { id: 3, username: res.data.username, avatar: fullAvatarUrl, time: "10 hours ago", content: "Selling cute plush toy", image: "/src/assets/HelloKitty4.jpg", price: "$20", likes: 10, comments: 2 },
          ]
        );

      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // -------- UPDATE PROFILE --------
  const updateProfile = async (field) => {
    try {
      const updateDto = { ...user, [field]: tempValue };

      const res = await api.put("/api/profile", updateDto, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const updatedUser = {
        ...res.data,
        avatarUrl: getFullAvatarUrl(res.data.avatarUrl)
      };

      setUser(updatedUser);
      setEditingField("");

    } catch (err) {
      console.error(err);
    }
  };

  // -------- UPLOAD AVATAR --------
  const handleUploadAvatar = async () => {
    if (!selectedAvatarFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedAvatarFile);

      const res = await api.put("/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser({ ...user, avatarUrl: getFullAvatarUrl(res.data.avatarUrl) });
      setSelectedAvatarFile(null);
      setPreviewAvatar(null);

    } catch (err) {
      console.error(err);
    }
  };

  // -------- DELETE AVATAR --------
  const deleteAvatar = async () => {
    try {
      const formData = new FormData();
      const defaultFile = await fetch(defaultAvatar).then(res => res.blob());
      formData.append("file", defaultFile, "default_avatar.jpeg");

      const res = await api.put("/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUser({ ...user, avatarUrl: getFullAvatarUrl(res.data.avatarUrl) });
      setPreviewAvatar(null);
      setSelectedAvatarFile(null);

    } catch (err) {
      console.error(err);
      setUser({ ...user, avatarUrl: defaultAvatar });
    }
  };

  // -------- POST HANDLERS --------
  const savePostChanges = () => {
    if (selectedTab === "social") {
      const index = socialPosts.findIndex((p) => p.id === selectedPost.id);
      if (index !== -1) {
        const newPosts = [...socialPosts];
        newPosts[index] = { ...selectedPost, avatar: getFullAvatarUrl(selectedPost.avatar) };
        setSocialPosts(newPosts);
      }
    } else {
      const index = marketPosts.findIndex((p) => p.id === selectedPost.id);
      if (index !== -1) {
        const newPosts = [...marketPosts];
        newPosts[index] = { ...selectedPost, avatar: getFullAvatarUrl(selectedPost.avatar) };
        setMarketPosts(newPosts);
      }
    }
    setSelectedPost(null);
  };

  const deletePost = (id) => {
    if (confirm("Delete this post?")) {
      if (selectedTab === "social") {
        setSocialPosts(socialPosts.filter((p) => p.id !== id));
      } else {
        setMarketPosts(marketPosts.filter((p) => p.id !== id));
      }
      setSelectedPost(null);
    }
  };

  if (!user) return <div>Loading...</div>;
  const posts = selectedTab === "social" ? socialPosts : marketPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">Edit Profile</h1>

        {/* PROFILE CARD */}
        <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">

          {/* AVATAR */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={previewAvatar || user.avatarUrl || defaultAvatar}
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg"
              />
              {previewAvatar && (
                <div
                  className="absolute bottom-0 right-0 bg-pink-500 text-white px-2 py-1 rounded-xl cursor-pointer"
                  onClick={handleUploadAvatar}
                >
                  Upload
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setSelectedAvatarFile(file);
                      const reader = new FileReader();
                      reader.onload = (ev) => setPreviewAvatar(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="px-4 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition shadow"
              >
                Edit Avatar
              </button>

              <button
                onClick={deleteAvatar}
                className="px-4 py-2 bg-red-400 text-white rounded-xl hover:bg-red-500 transition shadow"
              >
                Delete Avatar
              </button>
            </div>
          </div>

          {/* NAME, USERNAME, BIO */}
          {["fullName", "username", "bio"].map((field) => {
            const label = field === "fullName" ? "Name" : field === "username" ? "Username" : "Bio";
            const displayValue = field === "username" ? `@${user[field]}` : user[field];

            return (
              <div key={field} className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">

                {editingField === field ? (
                  field === "bio" ? (
                    <textarea
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border p-2 rounded-xl w-3/4"
                    />
                  ) : (
                    <input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border p-2 rounded-xl w-3/4"
                    />
                  )
                ) : (
                  <p className="text-xl font-semibold text-pink-700 w-3/4">
                    {label}: <span className="text-gray-700">{displayValue}</span>
                  </p>
                )}

                <div className="flex gap-2">

                  {editingField === field ? (
                    <>
                      <button
                        onClick={() => updateProfile(field)}
                        className="px-4 py-2 bg-pink-500 text-white rounded-xl"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingField("")}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl"
                      >
                        Cancel
                      </button>

                      {/* FIXED DELETE BUTTON */}
                      {field === "bio" && (
                        <button
                          onClick={async () => {
                            try {
                              const updateDto = { ...user, [field]: "" };

                              const res = await api.put("/api/profile", updateDto, {
                                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                              });

                              const updatedUser = {
                                ...res.data,
                                avatarUrl: getFullAvatarUrl(res.data.avatarUrl),
                              };

                              setUser(updatedUser);
                              setEditingField("");

                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          className="px-4 py-2 bg-red-300 text-red-800 rounded-xl"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => { setEditingField(field); setTempValue(user[field]); }}
                      className="px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition"
                    >
                      Edit
                    </button>
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-8 mb-4">
          <button
            onClick={() => setSelectedTab("social")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              selectedTab === "social" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
            }`}
          >
            Social Posts
          </button>

          <button
            onClick={() => setSelectedTab("market")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              selectedTab === "market" ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"
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
              {post.price && <p className="text-pink-600 font-semibold mt-2">{post.price}</p>}

              <button
                onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
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
              onChange={(e) => setSelectedPost({ ...selectedPost, image: e.target.value })}
              className="w-full p-2 border rounded-xl"
              placeholder="Image URL"
            />

            <textarea
              value={selectedPost.content}
              onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
              className="w-full p-3 border rounded-xl"
              placeholder="Caption"
            />

            {selectedPost.price !== undefined && (
              <input
                type="text"
                value={selectedPost.price}
                onChange={(e) => setSelectedPost({ ...selectedPost, price: e.target.value })}
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
