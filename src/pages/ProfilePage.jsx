import Sidebar from "../components/Sidebar.jsx";
import Profile from "../components/Profile.jsx";

const User = {
  username: "hello_kitty1",
  name: "Hello Kitty",
  avatar: "/src/assets/HelloKitty.jpg",
  bio: "welcome to my world!",
  postsCount: 10,
  followersCount: 150,
  followingCount: 200,
  isFollowing: false,
};

const userPosts = [
  {
    id: 1,
    time: "8 hours ago",
    content: "me and my lovely friends",
    image: "/src/assets/HelloKitty1.jpg"
  },
  {
    id: 2,
    time: "2 hours ago",
    content: "we Love this new platform!",
    image: "/src/assets/HelloKitty2.webp"
  },
  {
    id: 3,
    time: "5 hours ago",
    content: "I love boba",
    image: "/src/assets/HelloKitty3.jpg"
  },
  {
    id: 4,
    time: "10 hours ago",
    content: "watching tv",
    image: "/src/assets/HelloKitty4.jpg"
  },
  {
    id: 5,
    time: "12 hours ago",
    content: "playing with my friend",
    image: "/src/assets/HelloKitty5.png"
  }
];

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-96 p-4 sm:p-8">
        <Profile user={User} posts={userPosts} isOwner={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
