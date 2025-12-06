import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { getFullAvatarUrl } from "../utils";

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [tempValue, setTempValue] = useState("");

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // -------- FETCH USER --------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const fullAvatarUrl = getFullAvatarUrl(res.data.avatarUrl);
        const data = { ...res.data, avatarUrl: fullAvatarUrl };
        setUser(data);
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

      const res = await api.put("/profile", updateDto, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
  };

  // -------- UPLOAD AVATAR --------
  const handleUploadAvatar = async () => {
    if (!selectedAvatarFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedAvatarFile);

      const res = await api.put("/profile/avatar", formData, {
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

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-pink-600">
          Edit Profile
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          {/* AVATAR */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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
                      reader.onload = (ev) =>
                        setPreviewAvatar(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                className="px-4 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition shadow text-sm sm:text-base"
              >
                Edit Avatar
              </button>
            </div>
          </div>

          {/* NAME, USERNAME, BIO */}
          {["fullName", "username", "bio"].map((field) => {
            const label =
              field === "fullName"
                ? "Name"
                : field === "username"
                ? "Username"
                : "Bio";
            const displayValue =
              field === "username" ? `@${user[field]}` : user[field];

            return (
              <div
                key={field}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-pink-50 p-4 rounded-xl"
              >
                {editingField === field ? (
                  field === "bio" ? (
                    <textarea
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border p-2 rounded-xl w-full sm:w-3/4 text-sm sm:text-base"
                    />
                  ) : (
                    <input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border p-2 rounded-xl w-full sm:w-3/4 text-sm sm:text-base"
                    />
                  )
                ) : (
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-pink-700 w-full sm:w-3/4 break-words">
                    {label}:{" "}
                    <span className="text-gray-700">{displayValue}</span>
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {editingField === field ? (
                    <>
                      <button
                        onClick={() => updateProfile(field)}
                        className="px-3 sm:px-4 py-2 bg-pink-500 text-white rounded-xl text-sm sm:text-base"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingField("")}
                        className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-xl text-sm sm:text-base"
                      >
                        Cancel
                      </button>

                      {/* FIXED DELETE BUTTON */}
                      {field === "bio" && (
                        <button
                          onClick={async () => {
                            try {
                              const updateDto = { ...user, [field]: "" };

                              const res = await api.put("/profile", updateDto, {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
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
                          className="px-3 sm:px-4 py-2 bg-red-300 text-red-800 rounded-xl text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingField(field);
                        setTempValue(user[field]);
                      }}
                      className="px-3 sm:px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition text-sm sm:text-base"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
