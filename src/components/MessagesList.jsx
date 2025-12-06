import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessagesList = ({ messages, loading, hasMore, onLoadMore, onDelete }) => {
  const scrollRef = useRef(null);
  const previousScrollHeight = useRef(0);
  const isInitialLoad = useRef(true);

  // Scroll to bottom on initial load and new messages
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      // On initial load, scroll to bottom immediately
      if (isInitialLoad.current) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
          isInitialLoad.current = false;
        }, 100);
        return;
      }

      // For new messages, scroll to bottom if already near bottom
      const isAtBottom =
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop <=
        scrollRef.current.clientHeight + 100;

      if (isAtBottom) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // Handle scroll for loading more
  const handleScroll = () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop === 0 &&
      hasMore &&
      !loading
    ) {
      previousScrollHeight.current = scrollRef.current.scrollHeight;
      onLoadMore();
    }
  };

  // Restore scroll position after loading more
  useEffect(() => {
    if (scrollRef.current && previousScrollHeight.current > 0) {
      const newScrollHeight = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTop =
        newScrollHeight - previousScrollHeight.current;
      previousScrollHeight.current = 0;
    }
  }, [messages.length]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
    >
      {loading && hasMore && (
        <div className="text-center py-2">
          <span className="text-sm text-gray-500">Loading more...</span>
        </div>
      )}

      {/* Messages in reverse order (oldest first) */}
      {[...messages].reverse().map((message) => (
        <MessageBubble key={message.id} message={message} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default MessagesList;
