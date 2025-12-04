import defaultAvatar from "../assets/placeholder_avatar.jpeg";

// API Base URL
export const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";

// ✅ Get full image URL from relative path
export const getFullImageUrl = (url) => {
  if (!url || url === "") return null;
  if (url.startsWith("http")) return url; // Already full URL
  return `${API_BASE_URL}${url}`;
};

// ✅ Get full avatar URL with fallback to default
export const getFullAvatarUrl = (url) => {
  if (!url || url === "") return defaultAvatar;
  if (url.startsWith("http")) return url; // Already full URL
  return `${API_BASE_URL}${url}`;
};

// ✅ Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const isOwner = (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    try {
        // Decode JWT token to get userId
        const payload = JSON.parse(atob(token.split('.')[1]));
        const tokenUserId = payload.sub;
        return tokenUserId && String(tokenUserId) === String(userId);
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};


// ✅ Get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// ✅ Set auth token
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// ✅ Remove auth token (logout)
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

// ✅ Format date to readable string
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};

// ✅ Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
