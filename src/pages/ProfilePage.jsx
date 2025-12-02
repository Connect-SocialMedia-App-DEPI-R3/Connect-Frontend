import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import Profile from "../components/Profile.jsx";
import { api } from "../api/axios";

const ProfilePage = () => {
  const { userId } = useParams(); // هنا بناخد ID المستخدم من الرابط
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------- FETCH PROFILE --------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // لو في userId → جيبي بروفايل حد تاني
        // لو مفيش → جيبي بروفايل اليوزر الحالي
        const endpoint = userId
          ? `/api/profile/${userId}`
          : `/api/profile`;

        const res = await api.get(endpoint);
        setUser(res.data);

      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // ----------------------------
  // MOCK POSTS (زي ما كانوا عندك)
  // ----------------------------
  const socialPosts = [
    {
      id: 1,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "8 hours ago",
      content: "me and my lovely friends",
      image: "/src/assets/HelloKitty1.jpg",
      likes: 25,
      comments: 4,
    },
    {
      id: 2,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "2 hours ago",
      content: "we Love this new platform!",
      image: "/src/assets/HelloKitty2.webp",
      likes: 40,
      comments: 10,
    },
  ];

  const marketPosts = [
    {
      id: 4,
      username: "hello_kitty1",
      avatar: "/src/assets/HelloKitty.jpg",
      time: "10 hours ago",
      content: "Selling cute plush toy",
      image: "/src/assets/HelloKitty4.jpg",
      price: "$20",
      likes: 10,
      comments: 2,
    },
  ];

  // هل ده بروفايلي أنا؟ 
  const isOwner = !userId;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-4 sm:p-8">
        <Profile
          userData={user}
          userId={userId}
          isOwner={isOwner}
          posts={[...socialPosts, ...marketPosts]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
