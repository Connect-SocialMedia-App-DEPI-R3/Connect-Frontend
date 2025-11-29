import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPostPage from "./pages/AddPostPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import SettingsPage from "./pages/SettingsPage"; 
import ChatPage from "./pages/ChatPage";  
import AdminDashboard from "./pages/AdminDashboard"; 
import AllReportsPage from "./pages/AllReportsPage"; 
import ManageCategoriesPage from "./pages/ManageCategoriesPage"; 
import UnverifiedUsersPage from "./pages/UnverifiedUsersPage"; 
import AdminSellersPage from "./pages/AdminSellersPage"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} /> 
        <Route path="/chat" element={<ChatPage />} />  
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/all-reports" element={<AllReportsPage />} /> 
        <Route path="/manage_categories" element={<ManageCategoriesPage />} /> 
        <Route path="/Unverified_users" element={<UnverifiedUsersPage />} /> 
        <Route path="/admin_sellers" element={<AdminSellersPage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
