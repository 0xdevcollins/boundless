"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { voteForProject } from "@/lib/actions/vote";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface VoteButtonProps {
	projectId: string;
	initialVoteCount: number;
	initialUserVoted: boolean;
	compact?: boolean;
}

export function VoteButton({
	projectId,
	initialVoteCount,
	initialUserVoted,
	compact = false,
}: VoteButtonProps) {
	const [voteCount, setVoteCount] = useState<number | undefined>(
		initialVoteCount,
	);
	const [userVoted, setUserVoted] = useState<boolean | undefined>(
		initialUserVoted,
	);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleVote = async (e: React.MouseEvent) => {
		// Prevent the click from navigating to the project page if inside a link
		e.stopPropagation();

		try {
			setIsLoading(true);
			const result = await voteForProject(projectId);

			if (result.success) {
				setVoteCount(result.count);
				setUserVoted(result.voted);

				toast.success(result.voted ? "Vote registered!" : "Vote removed!", {
					description: result.voted
						? "Thank you for supporting this project."
						: "Your vote has been removed.",
				});

				// Refresh the page to update data
				router.refresh();
			} else {
				toast.error("Error", {
					description: result.error || "Something went wrong",
				});
			}
		} catch (error) {
			toast.error(`Error:${error}`, {
				description: "Failed to register your vote",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
			<Button
				onClick={handleVote}
				disabled={isLoading}
				variant={userVoted ? "default" : "outline"}
				size={compact ? "sm" : "sm"}
				className="flex items-center gap-2"
			>
				<ThumbsUp
					className={`${compact ? "h-3.5 w-3.5" : "h-4 w-4"} ${userVoted ? "fill-current" : ""}`}
				/>
				<span>{userVoted ? "Voted" : "Vote"}</span>
			</Button>
			<span className={`${compact ? "text-xs" : "text-sm"} font-medium`}>
				{voteCount} {voteCount === 1 ? "vote" : "votes"}
			</span>
		</div>
	);
}
