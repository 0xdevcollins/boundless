"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Trash2, 
  Edit,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CommentInput } from "../comments/comment-input";
import { toast } from "sonner";

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

interface CommentProps {
  comment: CommentType;
  allComments: CommentType[];
  onCommentUpdated: () => void;
  currentUserId?: string;
  level: number;
}

export function Comment({ comment, allComments, onCommentUpdated, currentUserId, level }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(level < 2); // Auto-expand first two levels
  
  // Find direct replies to this comment
  const replies = allComments.filter(c => c.parentId === comment.id);
  
  // Calculate likes and dislikes
  const likes = comment.reactions.filter(r => r.type === "LIKE").length;
  const dislikes = comment.reactions.filter(r => r.type === "DISLIKE").length;
  
  // Check if current user has reacted
  const userReaction = comment.reactions.find(r => r.userId === currentUserId);
  const hasLiked = userReaction?.type === "LIKE";
  const hasDisliked = userReaction?.type === "DISLIKE";
  
  // Check if comment belongs to current user
  const isOwnComment = comment.userId === currentUserId;
  
  // Format date
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
  const wasEdited = comment.createdAt !== comment.updatedAt;
  
  const handleReact = async (type: "LIKE" | "DISLIKE") => {
    if (!currentUserId) {
      toast.error("You must be signed in to react to comments");
      return;
    }
    
    try {
      // If already reacted with same type, remove reaction
      const isRemovingReaction = 
        (type === "LIKE" && hasLiked) || 
        (type === "DISLIKE" && hasDisliked);
      
      const endpoint = isRemovingReaction 
        ? `/api/projects/comments/react?commentId=${comment.id}`
        : `/api/projects/comments/react`;
      
      const response = await fetch(endpoint, {
        method: isRemovingReaction ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isRemovingReaction ? undefined : JSON.stringify({
          commentId: comment.id,
          type
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to react to comment");
      }
      
      onCommentUpdated();
    } catch (error) {
      console.error("Error reacting to comment:", error);
      toast.error("Failed to process reaction");
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/projects/comments/delete?id=${comment.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      
      toast.success("Comment deleted successfully");
      onCommentUpdated();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };
  
  return (
    <Card className={`border-l-4 ${level > 0 ? "border-l-muted" : "border-l-primary"}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.user.image || undefined} alt={comment.user.name || "User"} />
            <AvatarFallback>
              {comment.user.name?.substring(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            {/* Comment Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-medium">{comment.user.name || "Anonymous User"}</p>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
                {wasEdited && <span className="text-xs text-muted-foreground">(edited)</span>}
              </div>
            </div>
            
            {/* Comment Content */}
            {isEditing ? (
              <CommentInput
                projectId=""
                onCommentAdded={() => {
                  setIsEditing(false);
                  onCommentUpdated();
                }}
                onCancel={() => setIsEditing(false)}
                initialValue={comment.content}
                commentId={comment.id}
                isEditing={true}
              />
            ) : (
              <p className="mt-1 text-sm">{comment.content}</p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-2 px-4 flex flex-wrap gap-2 justify-between">
        <div className="flex gap-1">
          {/* Reaction Buttons */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 ${hasLiked ? "text-primary" : ""}`}
            onClick={() => handleReact("LIKE")}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">{likes > 0 ? likes : ""}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 ${hasDisliked ? "text-primary" : ""}`}
            onClick={() => handleReact("DISLIKE")}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span className="text-xs">{dislikes > 0 ? dislikes : ""}</span>
          </Button>
          
          {/* Reply Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-2"
            onClick={() => setIsReplying(!isReplying)}
          >
            <Reply className="h-4 w-4 mr-1" />
            <span className="text-xs">Reply</span>
          </Button>
        </div>
        
        <div className="flex gap-1">
          {/* Edit & Delete Buttons (only for user's own comments) */}
          {isOwnComment && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-2 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this comment? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </CardFooter>
      
      {/* Reply Input */}
      {isReplying && (
        <div className="px-4 pb-4 ml-8">
          <CommentInput
            projectId={comment.id.split("_")[0]}
            parentId={comment.id}
            onCommentAdded={() => {
              setIsReplying(false);
              onCommentUpdated();
              setShowReplies(true);
            }}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}
      
      {/* Replies */}
      {replies.length > 0 && (
        <div className="px-4 pb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2 text-xs"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Hide {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </>
            )}
          </Button>
          
          {showReplies && (
            <div className="ml-8 space-y-4 mt-2">
              {replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  allComments={allComments}
                  onCommentUpdated={onCommentUpdated}
                  currentUserId={currentUserId}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
} 