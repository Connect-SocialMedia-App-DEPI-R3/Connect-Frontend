const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b border-gray-300 pb-3">
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">{comment.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
