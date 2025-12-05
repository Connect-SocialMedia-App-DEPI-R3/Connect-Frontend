import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { authApi } from "../api";
import { setAuthToken } from "../utils";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (userInfo) => {
    setLoading(true);
    try {
      const { data } = await authApi.register(userInfo);
      setAuthToken(data.token);
      toast.success("Registered successfully!");
      navigate("/");
      navigate(0);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        for (const errorKey in error.response?.data?.errors) {
          toast.error(error.response?.data?.errors[errorKey]);
        }
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(credentials);
      setAuthToken(data.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return {
    register,
    login,
    logout,
    loading,
  };
};
