/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Comment = {
  id: string;
  userId: string;
  userName: string;
  userImage: string | null;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
};

type ViewerCommentsProps = {
  projectId: string;
};

export function ViewerComments({ projectId }: ViewerCommentsProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, you would fetch comments from an API
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Alex Johnson',
      userImage: null,
      content:
        'This project looks very promising! I especially like the focus on sustainability and community involvement.',
      createdAt: '2024-03-15T14:23:00Z',
      likes: 12,
      dislikes: 1,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sam Rivera',
      userImage: null,
      content:
        'I have a few questions about the technical implementation. Will this be compatible with existing systems?',
      createdAt: '2024-03-14T09:45:00Z',
      likes: 5,
      dislikes: 0,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Taylor Kim',
      userImage: null,
      content:
        "I've been following similar projects in this space, and I think this one has a unique approach that could really work.",
      createdAt: '2024-03-12T16:30:00Z',
      likes: 8,
      dislikes: 2,
    },
  ]);

  const handleSubmitComment = async () => {
    if (!comment.trim() || !session?.user) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would make an API call here
      // const response = await fetch(`/api/projects/${projectId}/comments`, {
      //   method: 'POST',
      //   body: JSON.stringify({ content: comment }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newComment: Comment = {
        id: `temp-${Date.now()}`,
        userId: session.user.id || 'unknown',
        userName: session.user.name || 'Anonymous',
        userImage: session.user.image || null,
        content: comment,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      };

      setComments((prev) => [newComment, ...prev]);
      setComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-[320px]">
      <CardHeader>
        <CardTitle>Discussion</CardTitle>
        <CardDescription>Join the conversation about this project</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(320px-85px)] overflow-y-auto">
        {session ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts about this project..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!comment.trim() || isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-muted-foreground mb-2">Sign in to join the discussion</p>
            <Button variant="outline">Sign In</Button>
          </div>
        )}

        <Separator className="my-4" />

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userImage || undefined} alt={comment.userName} />
                    <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{comment.userName}</h4>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsUp className="h-3 w-3" /> {comment.likes}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsDown className="h-3 w-3" /> {comment.dislikes}
                      </button>
                      <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p>No comments yet. Be the first to start the discussion!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
