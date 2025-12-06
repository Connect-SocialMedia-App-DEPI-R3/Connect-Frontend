import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPostPage from "./pages/AddPostPage";
import ProfilePage from "./pages/ProfilePage";
import MarketplacePage from "./pages/MarketplacePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditProfilePage from "./pages/EditProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ChatPage from "./pages/ChatPage";
import ChatsPage from "./pages/ChatsPage";
import ChatDetailsPage from "./pages/ChatDetailsPage";
import UsersPage from "./pages/UsersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AllReportsPage from "./pages/AllReportsPage";
import ManageCategoriesPage from "./pages/ManageCategoriesPage";
import UnverifiedUsersPage from "./pages/UnverifiedUsersPage";
import AdminSellersPage from "./pages/AdminSellersPage";
import MarketPage from "./pages/MarketPage";

import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/UserContext";
import { ProtectedRoute, GuestRoute } from "./components/RouteGuards";

import Layout from "./layouts/Layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" />
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Guest Routes - redirect to home if logged in */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />

          {/* Protected Routes - require authentication */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/profile/:userId?" element={<ProfilePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chats"
              element={
                <ProtectedRoute>
                  <ChatsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chats/:chatId"
              element={
                <ProtectedRoute>
                  <ChatDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-reports"
              element={
                <ProtectedRoute>
                  <AllReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage_categories"
              element={
                <ProtectedRoute>
                  <ManageCategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Unverified_users"
              element={
                <ProtectedRoute>
                  <UnverifiedUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin_sellers"
              element={
                <ProtectedRoute>
                  <AdminSellersPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
