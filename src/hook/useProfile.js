import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { profileApi } from "../api";

export const useProfile = (userId = null) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = userId
        ? await profileApi.getUserProfile(userId)
        : await profileApi.getMyProfile();
      setProfile(data);
      console.log("Fetched profile:", data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await profileApi.updateProfile(profileData);
      setProfile(data);
      toast.success("Profile updated successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  };

  const updateAvatar = async (file) => {
    try {
      const { data } = await profileApi.updateAvatar(file);
      setProfile((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
      toast.success("Avatar updated successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await profileApi.deleteAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return {
    profile,
    loading,
    updateProfile,
    updateAvatar,
    deleteAccount,
    refetch: fetchProfile,
  };
};
