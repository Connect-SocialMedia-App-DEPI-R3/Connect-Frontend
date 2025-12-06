import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { api } from "../api/axios";

const SettingsPage = () => {
  const [profilePrivacy, setProfilePrivacy] = useState("Public");
  const [whoCanComment, setWhoCanComment] = useState("Everyone");
  const [whoCanMessage, setWhoCanMessage] = useState("Followers");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [password, setPassword] = useState("");

  const handleChangePassword = () => {
    const newPass = prompt("Enter new password:");
    if (newPass) setPassword(newPass);
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      // نرسل DELETE request للـ API
      await api.delete("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Account deleted successfully!");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account. Please try again.");
    }
  };

  const optionClass =
    "px-3 py-2 rounded-xl border border-pink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200";
  const checkboxClass =
    "w-5 h-5 accent-pink-500 rounded-md shadow-sm transition duration-200";
  const buttonClass =
    "px-4 py-2 bg-purple-300 text-purple-800 rounded-xl hover:bg-purple-400 transition shadow-sm";

  return (
    <div className=" bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">Settings</h1>

        {/* Privacy */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Privacy</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Profile Visibility
            </p>
            <select
              value={profilePrivacy}
              onChange={(e) => setProfilePrivacy(e.target.value)}
              className={optionClass}
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Who can comment
            </p>
            <select
              value={whoCanComment}
              onChange={(e) => setWhoCanComment(e.target.value)}
              className={optionClass}
            >
              <option>Everyone</option>
              <option>Followers</option>
              <option>No one</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Who can message
            </p>
            <select
              value={whoCanMessage}
              onChange={(e) => setWhoCanMessage(e.target.value)}
              className={optionClass}
            >
              <option>Everyone</option>
              <option>Followers</option>
              <option>No one</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Notifications</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Push Notifications
            </p>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              className={checkboxClass}
            />
          </div>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Email Notifications
            </p>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className={checkboxClass}
            />
          </div>
        </div>

        {/* Account */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Account</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Change Password
            </p>
            <button onClick={handleChangePassword} className={buttonClass}>
              Change
            </button>
          </div>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Delete Account
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-400 text-white rounded-xl hover:bg-red-500 transition shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Appearance</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">Theme</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={optionClass}
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Language</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Interface Language
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={optionClass}
            >
              <option>English</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
