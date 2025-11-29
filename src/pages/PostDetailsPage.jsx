import { useParams } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import Post from "../components/Post.jsx";

const posts = [
  {
    id: 1,
    username: "My Melody",
    time: "2 hours ago",
    content: "Loving this new platform!",
    image: "/src/assets/MyMelody1.webp",
    avatar: "/src/assets/MyMelody.jpeg",
  },
  {
    id: 2,
    username: "Hello kitty",
    time: "5 hours ago",
    content: "Loving this new platform!",
    image: "/src/assets/HelloKitty1.jpg",
    avatar: "/src/assets/HelloKitty.jpg",
  }
];

const PostDetailsPage = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <div className="p-10">Post not found</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-96 p-6 max-w-4xl mx-auto">
        <Post post={post} detailed={true} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
