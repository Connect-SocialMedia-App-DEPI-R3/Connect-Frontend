import { Navigate } from "react-router";
import { useUser } from "../context/UserContext";
import { isAuthenticated } from "../utils";

// ✅ Protect routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ✅ Redirect logged-in users away from login/register
export const GuestRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
