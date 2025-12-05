import PostsList from "../components/PostsList.jsx";

const marketplacePosts  = [
  {
    id: 1,
    username: "My Melody",
    time: "2 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/MyMelody1.webp",
    avatar: "src/assets/MyMelody.jpeg",
  },
  {
    id: 2,
    username: "Hello kitty",
    time: "5 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/HelloKitty1.jpg",
    avatar: "src/assets/HelloKitty.jpg",
  },
    {
    id: 3,
    username: "cinnamoroll",
    time: "7 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Cinnamoroll1.jpeg",
    avatar: "src/assets/Cinnamoroll.jpeg",
  },
    {
    id: 4,
    username: "Bubbles",
    time: "4 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Bubbles1.webp",
    avatar: "src/assets/Bubbles.jpeg",
  },
  {
    id: 5,
    username: "Kuromi",
    time: "12 hours ago",
    content: "Loving this new platform!",
    image: "src/assets/Kuromi1.jpg",
    avatar: "src/assets/Kuromi.jpg",
  }
];


const MarketplacePage = () => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl p-6">Marketplace</h1>
      <PostsList posts={marketplacePosts } />
    </div>
  );
};

export default MarketplacePage;
