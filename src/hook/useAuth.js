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
      const errorResponse = { fieldErrors: {}, message: "" };

      if (error.response?.data?.errors) {
        // Map API field errors to form field names
        const apiErrors = error.response.data.errors;

        // Handle different possible error formats from API
        Object.keys(apiErrors).forEach((key) => {
          const lowerKey = key.toLowerCase();
          const errorMessage = Array.isArray(apiErrors[key])
            ? apiErrors[key][0]
            : apiErrors[key];

          if (lowerKey.includes("fullname") || lowerKey === "fullname") {
            errorResponse.fieldErrors.fullName = errorMessage;
          } else if (lowerKey.includes("username")) {
            errorResponse.fieldErrors.username = errorMessage;
          } else if (lowerKey.includes("email")) {
            errorResponse.fieldErrors.email = errorMessage;
          } else if (lowerKey.includes("password")) {
            errorResponse.fieldErrors.password = errorMessage;
          } else {
            errorResponse.message = errorMessage;
          }
        });
      } else if (error.response?.data?.message) {
        // If there's a general message, try to map it to a field
        const message = error.response.data.message;
        const lowerMessage = message.toLowerCase();

        // Try to detect which field the error is about
        if (lowerMessage.includes("password")) {
          errorResponse.fieldErrors.password = message;
        } else if (lowerMessage.includes("email")) {
          errorResponse.fieldErrors.email = message;
        } else if (lowerMessage.includes("username")) {
          errorResponse.fieldErrors.username = message;
        } else if (lowerMessage.includes("name")) {
          errorResponse.fieldErrors.fullName = message;
        } else {
          errorResponse.message = message;
        }
      } else {
        errorResponse.message = "Registration failed";
      }

      throw errorResponse;
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
