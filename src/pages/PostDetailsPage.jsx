import { useParams } from "react-router";
import Post from "../components/Post.jsx";
import CommentsList from "../components/CommentsList.jsx";
import { usePost } from "../hook";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { post, loading } = usePost(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Post not found
          </h2>
          <p className="text-gray-600">
            The post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Post post={post} detailed={true} />
      <CommentsList postId={id} />
    </div>
  );
};

export default PostDetailsPage;
