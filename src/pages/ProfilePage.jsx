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

// Social Posts
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
  {
    id: 3,
    username: "hello_kitty1",
    avatar: "/src/assets/HelloKitty.jpg",
    time: "5 hours ago",
    content: "I love boba",
    image: "/src/assets/HelloKitty3.jpg",
    likes: 15,
    comments: 3,
  },
];

// Market Posts
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
  {
    id: 5,
    username: "hello_kitty1",
    avatar: "/src/assets/HelloKitty.jpg",
    time: "12 hours ago",
    content: "Handmade keychains for sale",
    image: "/src/assets/HelloKitty5.png",
    price: "$5",
    likes: 8,
    comments: 1,
  },
];

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-4 sm:p-8">

        {/* ==== PROFILE COMPONENT ==== */}
        <Profile
          user={User}
          posts={[...socialPosts, ...marketPosts]}
          isOwner={true}
        />

      </div>
    </div>
  );
};

export default ProfilePage;
