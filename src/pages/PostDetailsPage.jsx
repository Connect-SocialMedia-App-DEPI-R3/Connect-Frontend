import { useParams } from "react-router";
import Post from "../components/Post.jsx";
import CommentsList from "../components/CommentsList.jsx";
import { usePost } from "../hook";
import { useComments } from "../hook";

const PostDetailsPage = () => {
  const { id } = useParams();

  // ✅ HOOK LESSON: Use custom hooks instead of manual data fetching
  const { post, loading: postLoading } = usePost(id);
  const {
    comments,
    loading: commentsLoading,
    addComment,
    deleteComment,
  } = useComments(id);

  // ✅ Handle loading states cleanly
  if (postLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading post...</div>
      </div>
    );
  }

  // ✅ Handle post not found
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
      {/* Post Details */}
      <Post post={post} detailed={true} />

      {/* Comments Section */}
      <div className="mt-8">
        {commentsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-600">
              Loading comments...
            </div>
          </div>
        ) : (
          <CommentsList
            comments={comments}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
