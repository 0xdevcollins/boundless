"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface PostCommentsProps {
	postId: string;
}

interface Comment {
	id: string;
	content: string;
	createdAt: string;
	author: {
		id: string;
		name: string | null;
		image: string | null;
	};
	replies: Comment[];
}

export function PostComments({ postId }: PostCommentsProps) {
	const { data: session } = useSession();
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<string | null>(null);
	const [replyContent, setReplyContent] = useState("");

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!session?.user) return;

		try {
			const response = await fetch(`/api/blog/posts/${postId}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content: newComment }),
			});

			if (!response.ok) throw new Error("Failed to post comment");

			const comment = await response.json();
			setComments([comment, ...comments]);
			setNewComment("");
			toast.success("Comment posted", {
				description: "Your comment has been posted successfully.",
			});
		} catch {
			toast.error("Failed to post comment. Please try again.", {
				description: "Failed to post comment. Please try again.",
			});
		}
	};

	const handleSubmitReply = async (parentId: string) => {
		if (!session?.user) return;

		try {
			const response = await fetch(`/api/blog/posts/${postId}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content: replyContent, parentId }),
			});

			if (!response.ok) throw new Error("Failed to post reply");

			const reply = await response.json();
			setComments(
				comments.map((comment) =>
					comment.id === parentId
						? { ...comment, replies: [...comment.replies, reply] }
						: comment,
				),
			);
			setReplyingTo(null);
			setReplyContent("");
			toast.success("Reply posted", {
				description: "Your reply has been posted successfully.",
			});
		} catch {
			toast.error("Failed to post reply. Please try again.", {
				description: "Failed to post reply. Please try again.",
			});
		}
	};

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold">Comments</h2>

			{session?.user ? (
				<form onSubmit={handleSubmitComment} className="space-y-4">
					<Textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Write a comment..."
						className="min-h-[100px]"
					/>
					<Button type="submit" disabled={!newComment.trim()}>
						Post Comment
					</Button>
				</form>
			) : (
				<p className="text-muted-foreground">
					Please sign in to leave a comment.
				</p>
			)}

			<div className="space-y-6">
				{comments.map((comment) => (
					<div key={comment.id} className="space-y-4">
						<div className="flex gap-4">
							<Avatar>
								<AvatarImage src={comment.author.image || undefined} />
								<AvatarFallback>
									{comment.author.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="font-medium">{comment.author.name}</span>
									<span className="text-sm text-muted-foreground">
										{formatDistanceToNow(new Date(comment.createdAt), {
											addSuffix: true,
										})}
									</span>
								</div>
								<p className="mt-1">{comment.content}</p>
								{session?.user && (
									<Button
										variant="ghost"
										size="sm"
										className="mt-2"
										onClick={() => setReplyingTo(comment.id)}
									>
										Reply
									</Button>
								)}
							</div>
						</div>

						{replyingTo === comment.id && (
							<div className="ml-12 space-y-4">
								<Textarea
									value={replyContent}
									onChange={(e) => setReplyContent(e.target.value)}
									placeholder="Write a reply..."
									className="min-h-[100px]"
								/>
								<div className="flex gap-2">
									<Button
										onClick={() => handleSubmitReply(comment.id)}
										disabled={!replyContent.trim()}
									>
										Post Reply
									</Button>
									<Button
										variant="ghost"
										onClick={() => {
											setReplyingTo(null);
											setReplyContent("");
										}}
									>
										Cancel
									</Button>
								</div>
							</div>
						)}

						{comment.replies && comment.replies.length > 0 && (
							<div className="ml-12 space-y-4">
								{comment.replies.map((reply) => (
									<div key={reply.id} className="flex gap-4">
										<Avatar className="h-8 w-8">
											<AvatarImage src={reply.author.image || undefined} />
											<AvatarFallback>
												{reply.author.name?.charAt(0) || "U"}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="flex items-center gap-2">
												<span className="font-medium">{reply.author.name}</span>
												<span className="text-sm text-muted-foreground">
													{formatDistanceToNow(new Date(reply.createdAt), {
														addSuffix: true,
													})}
												</span>
											</div>
											<p className="mt-1">{reply.content}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
