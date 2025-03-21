"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/shared/pagination";
import { CommentsList } from "./comments/comments-list";
import { CommentInput } from "./comments/comment-input";

interface CommentsSectionProps {
  projectId: string;
}

export function CommentsSection({ projectId }: CommentsSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshComments = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/projects/${projectId}/comments?page=${currentPage}&limit=5`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.comments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [projectId, currentPage, refreshKey]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">Comments</h2>
          
          {session ? (
            <CommentInput 
              projectId={projectId} 
              onCommentAdded={refreshComments} 
            />
          ) : (
            <p className="text-muted-foreground">Sign in to leave a comment</p>
          )}
          
          <Separator className="my-4" />
          
          {isLoading ? (
            <div className="py-4 text-center">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </div>
          ) : (
            <CommentsList 
              comments={comments} 
              onCommentUpdated={refreshComments} 
              currentUserId={session?.user?.id} 
            />
          )}
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 