"use client";

import { Comment } from "./comment";

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  parentId: string | null;
  replies: CommentType[];
  _count: {
    reactions: number;
  };
  reactions: {
    id: string;
    type: "LIKE" | "DISLIKE";
    userId: string;
  }[];
};

interface CommentsListProps {
  comments: CommentType[];
  onCommentUpdated: () => void;
  currentUserId?: string;
}

export function CommentsList({ comments, onCommentUpdated, currentUserId }: CommentsListProps) {
  // Filter out replies to only show top-level comments
  const topLevelComments = comments.filter(comment => !comment.parentId);

  return (
    <div className="space-y-6">
      {topLevelComments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          allComments={comments}
          onCommentUpdated={onCommentUpdated}
          currentUserId={currentUserId}
          level={0}
        />
      ))}
    </div>
  );
} 