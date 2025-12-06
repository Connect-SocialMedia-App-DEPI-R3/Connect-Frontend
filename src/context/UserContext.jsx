import React, { createContext, useState, useEffect, useContext } from "react";
import { profileApi } from "../api";
import { isAuthenticated } from "../utils";

// ✅ Create context
const UserContext = createContext(null);

// ✅ Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

// ✅ Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Only fetch if user is authenticated
      if (!isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // ✅ Use the correct API endpoint (GET /api/profile)
        const { data } = await profileApi.getMyProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Provide value with helper methods
  const value = {
    user,
    setUser,
    loading,
    isLoggedIn: !!user,
    refreshUser: async () => {
      if (!isAuthenticated()) return;
      try {
        const { data } = await profileApi.getMyProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
