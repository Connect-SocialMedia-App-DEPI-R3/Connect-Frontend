import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Profile from "../components/Profile.jsx";
import { api } from "../api/axios";

const ProfilePage = () => {
  const { userId } = useParams(); // هنا بناخد ID المستخدم من الرابط
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true)

  // -------- FETCH PROFILE --------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // لو في userId → جيبي بروفايل حد تاني
        // لو مفيش → جيبي بروفايل اليوزر الحالي
        const endpoint = userId
          ? `/profile/${userId}`
          : `/profile`;

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



  
  useEffect(() => {
    if (!user) return;

    const fetchUserPosts = async () => {
      setPostsLoading(true);
      try {
        const username = user.username;
        const res = await api.get(`/posts/u/${username}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
        setUserPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);



  
  // هل ده بروفايلي أنا؟ 
  const isOwner = !userId;

  if (loading || postsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
      <div className=" p-4 sm:p-8">
        <Profile
          userData={user}
          userId={userId}
          isOwner={isOwner}
          posts={userPosts}
        />
      </div>
  );
};

export default ProfilePage;
