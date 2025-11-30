import { useParams } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import Post from "../components/Post.jsx";
import CommentsList from "../components/CommentList.jsx";
import { useState } from "react";

const postsData = [
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

const PostDetailsPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState(postsData);

  const post = posts.find((p) => p.id === Number(id));
  if (!post) return <div className="p-10">Post not found</div>;

  const handleAddComment = (text) => {
    const updatedPosts = posts.map((p) =>
      p.id === post.id
        ? {
            ...p,
            comments: [
              ...p.comments,
              { id: Date.now(), author: "You", text: text },
            ],
          }
        : p
    );

    setPosts(updatedPosts);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-6 max-w-4xl mx-auto">
        <Post post={post} detailed={true} />

        <CommentsList
          comments={post.comments}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default PostDetailsPage;
