import { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import { api } from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { removeAuthToken } from "../utils";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await api.delete("/profile");

      toast.success("Account deleted successfully!");
      removeAuthToken();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
      setIsDeleting(false);
    }
  };

  const optionClass =
    "px-3 py-2 rounded-xl border border-pink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200";
  return (
    <div className=" bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">Settings</h1>

        {/* Account */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">Account</h2>

          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
            <p className="text-lg font-semibold text-pink-700">
              Delete Account
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
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

      {/* Delete Account Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account?"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText={isDeleting ? "Deleting..." : "Delete Account"}
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
};

export default SettingsPage;
