"use client";

import {
	Edit,
	MoreHorizontal,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserComment } from "@/types/contributions";

interface UserCommentsProps {
	comments: UserComment[];
	navigateToProject: (projectId: string) => void;
	handleEditComment: (commentId: string) => void;
	handleDeleteComment: (commentId: string) => void;
}

export function UserComments({
	comments,
	navigateToProject,
	handleEditComment,
	handleDeleteComment,
}: UserCommentsProps) {
	if (comments.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No comments found.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4 mb-8">
			{comments.map((comment) => (
				<Card key={comment.id}>
					<CardHeader className="pb-2">
						<div className="flex justify-between items-start">
							<div>
								<CardTitle className="text-lg">{comment.projectName}</CardTitle>
								<CardDescription>
									{new Date(comment.createdAt).toLocaleDateString()}
								</CardDescription>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => handleEditComment(comment.id)}
									>
										<Edit className="mr-2 h-4 w-4" />
										Edit Comment
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleDeleteComment(comment.id)}
									>
										<Trash className="mr-2 h-4 w-4" />
										Delete Comment
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => navigateToProject(comment.projectId)}
									>
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
	);
}
