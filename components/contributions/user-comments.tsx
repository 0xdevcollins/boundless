'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UserComment } from '@/types/contributions';
import { Edit, MoreHorizontal, ThumbsDown, ThumbsUp, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Pagination from '../shared/pagination';

interface UserCommentsProps {
  comments: UserComment[];
  navigateToProject: (projectId: string) => void;
  handleEditComment: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  itemsPerPage?: number;
}

export function UserComments({
  comments,
  navigateToProject,
  handleEditComment,
  handleDeleteComment,
  itemsPerPage = 5,
}: UserCommentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComments, setPaginatedComments] = useState<UserComment[]>([]);

  const totalPages = Math.max(1, Math.ceil(comments.length / itemsPerPage));

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedComments(comments.slice(startIndex, endIndex));

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [comments, currentPage, itemsPerPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 mb-4">
        {paginatedComments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{comment.projectName}</CardTitle>
                  <CardDescription>{new Date(comment.createdAt).toLocaleDateString()}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditComment(comment.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Comment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Comment
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateToProject(comment.projectId)}>
                      {/* <Eye className="mr-2 h-4 w-4" /> */}
                      View Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{comment.content}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{comment.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{comment.dislikes}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, comments.length)} of{' '}
            {comments.length} comments
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblingsCount={1}
          />
        </div>
      )}
    </>
  );
}
