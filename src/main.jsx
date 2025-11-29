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
import MarketplacePage from "./pages/MarketplacePage";
import PostDetailsPage from "./pages/PostDetailsPage";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
