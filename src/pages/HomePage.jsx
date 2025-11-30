import Sidebar from "../components/Sidebar.jsx";
import PostsList from "../components/PostsList.jsx";

const posts = [
  {
    id: 1,
    username: "My Melody",
    time: "2 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/MyMelody1.webp",
    avatar: "src/assets/MyMelody.jpeg",
    comments: [
      { id: 1, author: "Sara", text: "So cute!! 💗" },
      { id: 2, author: "Mona", text: "Love this!" },
    ]
  },
  {
    id: 2,
    username: "Hello kitty",
    time: "5 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/HelloKitty1.jpg",
    avatar: "src/assets/HelloKitty.jpg",
    comments: [
      { id: 1, author: "Sara", text: "So cute!! 💗" },
      { id: 2, author: "Mona", text: "Love this!" },
    ]
  },
    {
    id: 3,
    username: "cinnamoroll",
    time: "7 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Cinnamoroll1.jpeg",
    avatar: "src/assets/Cinnamoroll.jpeg",
    comments: [
      { id: 1, author: "Sara", text: "So cute!! 💗" },
      { id: 2, author: "Mona", text: "Love this!" },
    ]
  },
    {
    id: 4,
    username: "Bubbles",
    time: "4 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Bubbles1.webp",
    avatar: "src/assets/Bubbles.jpeg",
    comments: [
      { id: 1, author: "Sara", text: "So cute!! 💗" },
      { id: 2, author: "Mona", text: "Love this!" },
    ]
  },
  {
    id: 5,
    username: "Kuromi",
    time: "12 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Kuromi1.jpg",
    avatar: "src/assets/Kuromi.jpg",
    comments: [
      { id: 1, author: "Sara", text: "So cute!! 💗" },
      { id: 2, author: "Mona", text: "Love this!" },
    ]
  }
];


const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-96">
        <PostsList posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;