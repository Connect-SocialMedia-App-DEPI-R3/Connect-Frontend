// UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { api } from "../api/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/api/auth/me").then(res => {
        setUser(res.data.user);
        setPosts(res.data.posts); // لو الAPI بيرجع بوستات كمان
      }).catch(() => {
        setUser(null);
        setPosts([]);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};
