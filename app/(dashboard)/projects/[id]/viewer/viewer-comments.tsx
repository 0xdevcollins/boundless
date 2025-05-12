/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Comment = {
	id: string;
	userId: string;
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
	content: string;
	createdAt: string;
	reactions: {
		id: string;
		type: "LIKE" | "DISLIKE";
		userId: string;
	}[];
	_count: {
		reactions: number;
	};
};

type ViewerCommentsProps = {
	projectId: string;
};

export function ViewerComments({ projectId }: ViewerCommentsProps) {
	const { data: session } = useSession();
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchComments = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`/api/projects/${projectId}/comments?page=${currentPage}&limit=5`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch comments");
				}
				const data = await response.json();
				setComments(data.comments);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.error("Error fetching comments:", error);
				toast.error("Failed to load comments");
			} finally {
				setIsLoading(false);
			}
		};

		fetchComments();
	}, [projectId, currentPage]);

	const handleSubmitComment = async () => {
		if (!comment.trim() || !session?.user) return;

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/projects/comments/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					projectId,
					content: comment.trim(),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to post comment");
			}

			const newComment = await response.json();
			setComments((prev) => [newComment, ...prev]);
			setComment("");
			toast.success("Comment posted successfully");
		} catch (error) {
			console.error("Failed to post comment:", error);
			toast.error("Failed to post comment");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReact = async (commentId: string, type: "LIKE" | "DISLIKE") => {
		if (!session?.user) {
			toast.error("You must be signed in to react to comments");
			return;
		}

		try {
			const response = await fetch("/api/projects/comments/react", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					commentId,
					type,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to react to comment");
			}

			// Refresh comments to get updated reaction counts
			const commentsResponse = await fetch(
				`/api/projects/${projectId}/comments?page=${currentPage}&limit=5`,
			);
			if (commentsResponse.ok) {
				const data = await commentsResponse.json();
				setComments(data.comments);
			}
		} catch (error) {
			console.error("Error reacting to comment:", error);
			toast.error("Failed to process reaction");
		}
	};

	// Format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
		if (diffInSeconds < 3600)
			return `${Math.floor(diffInSeconds / 60)} minutes ago`;
		if (diffInSeconds < 86400)
			return `${Math.floor(diffInSeconds / 3600)} hours ago`;
		if (diffInSeconds < 604800)
			return `${Math.floor(diffInSeconds / 86400)} days ago`;

		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Card className="min-h-[320px] h-full">
			<CardHeader className="pb-4">
				<CardTitle>Discussion</CardTitle>
				<CardDescription>
					Join the conversation about this project
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col h-[calc(100%-85px)]">
				{session ? (
					<div className="space-y-4 mb-6">
						<Textarea
							placeholder="Share your thoughts about this project..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="min-h-[80px] resize-none"
						/>
						<div className="flex justify-end">
							<Button
								onClick={handleSubmitComment}
								disabled={!comment.trim() || isSubmitting}
							>
								{isSubmitting ? "Posting..." : "Post Comment"}
							</Button>
						</div>
					</div>
				) : (
					<div className="bg-muted p-6 rounded-lg text-center mb-6">
						<p className="text-muted-foreground mb-3">
							Sign in to join the discussion
						</p>
						<Button variant="outline">Sign In</Button>
					</div>
				)}

				<Separator className="mb-6" />

				<div className="space-y-6 flex-1 overflow-y-auto pr-2">
					{isLoading ? (
						<div className="text-center py-8 text-muted-foreground">
							<p>Loading comments...</p>
						</div>
					) : comments.length > 0 ? (
						comments.map((comment) => {
							const likes = comment.reactions.filter(
								(r) => r.type === "LIKE",
							).length;
							const dislikes = comment.reactions.filter(
								(r) => r.type === "DISLIKE",
							).length;
							const hasLiked = comment.reactions.some(
								(r) => r.type === "LIKE" && r.userId === session?.user?.id,
							);
							const hasDisliked = comment.reactions.some(
								(r) => r.type === "DISLIKE" && r.userId === session?.user?.id,
							);

							return (
								<div key={comment.id} className="space-y-3">
									<div className="flex items-start gap-4">
										<Avatar className="h-10 w-10 flex-shrink-0">
											<AvatarImage
												src={comment.user.image || undefined}
												alt={comment.user.name || "User"}
											/>
											<AvatarFallback>
												{comment.user.name?.substring(0, 2).toUpperCase() ||
													"U"}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between gap-2">
												<h4 className="font-medium truncate">
													{comment.user.name || "Anonymous"}
												</h4>
												<span className="text-xs text-muted-foreground whitespace-nowrap">
													{formatDate(comment.createdAt)}
												</span>
											</div>
											<p className="mt-1 text-sm break-words">
												{comment.content}
											</p>
											<div className="flex items-center gap-4 mt-2">
												<button
													type="button"
													onClick={() => handleReact(comment.id, "LIKE")}
													className={`flex items-center gap-1 text-xs ${
														hasLiked
															? "text-blue-500"
															: "text-muted-foreground hover:text-foreground"
													}`}
												>
													<ThumbsUp className="h-3 w-3" /> {likes}
												</button>
												<button
													type="button"
													onClick={() => handleReact(comment.id, "DISLIKE")}
													className={`flex items-center gap-1 text-xs ${
														hasDisliked
															? "text-red-500"
															: "text-muted-foreground hover:text-foreground"
													}`}
												>
													<ThumbsDown className="h-3 w-3" /> {dislikes}
												</button>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className="text-center py-8 text-muted-foreground">
							<p>No comments yet. Be the first to start the discussion!</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
