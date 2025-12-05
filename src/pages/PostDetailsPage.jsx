import { useParams } from "react-router";
import Post from "../components/Post.jsx";
import CommentsList from "../components/CommentsList.jsx";
import { usePosts } from "../hook/usePosts";
import { useComments } from "../hook/useComments";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

const API_BASE_URL = "https://connect-api-depi-r3-2025.runasp.net";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { posts, loading: postsLoading } = usePosts();
  const { comments, loading: commentsLoading, addComment, deleteComment } = useComments(id);

  const [postWithUrls, setPostWithUrls] = useState(null);
  const [commentsWithUrls, setCommentsWithUrls] = useState([]);

  useEffect(() => {
    if (!postsLoading) {
      const post = posts.find((p) => p.id === id || p.id === Number(id));
      if (!post) return;

      const fetchAuthorIfMissing = async () => {
        let authorData = post.author;
        if (!authorData) {
          try {
            const res = await api.get(`/api/profile/${post.authorId}`);
            authorData = {
              ...res.data,
              avatarUrl: res.data.avatarUrl
                ? `${API_BASE_URL}${res.data.avatarUrl}`
                : "/default-avatar.png",
            };
          } catch (err) {
            console.error("Failed to fetch author:", err);
            authorData = { username: post.authorUsername, avatarUrl: "/default-avatar.png" };
          }
        } else {
          authorData.avatarUrl = authorData.avatarUrl
            ? `${API_BASE_URL}${authorData.avatarUrl}`
            : "/default-avatar.png";
        }

        setPostWithUrls({
          ...post,
          imageUrl: post.imageUrl ? `${API_BASE_URL}${post.imageUrl}` : null,
          author: authorData,
        });

        // تعديل التعليقات
        setCommentsWithUrls(
          comments.map(c => ({
            ...c,
            author: {
              ...c.author,
              avatarUrl: c.author?.avatarUrl
                ? `${API_BASE_URL}${c.author.avatarUrl}`
                : "/default-avatar.png",
            },
          }))
        );
      };

      fetchAuthorIfMissing();
    }
  }, [posts, postsLoading, comments, id]);

  if (postsLoading || !postWithUrls) return <div className="p-10">Loading post...</div>;

  return (
    <div className=" p-6 max-w-4xl mx-auto">
        <Post post={postWithUrls} detailed={true} />
        {commentsLoading ? (
          <div>Loading comments...</div>
        ) : (
          <CommentsList
            comments={commentsWithUrls}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
          />
        )}
    </div>
  );
};

export default PostDetailsPage;
