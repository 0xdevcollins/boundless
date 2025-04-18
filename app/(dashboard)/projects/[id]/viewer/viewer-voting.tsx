/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, Users } from "lucide-react";
import { useState } from "react";

type ValidationStatus = "PENDING" | "REJECTED" | "VALIDATED";

type ViewerVotingProps = {
	projectId: string;
	voteCount: number;
	userVoted: boolean;
	status: ValidationStatus;
	compact?: boolean;
};

export function ViewerVoting({
	projectId,
	voteCount,
	userVoted,
	status,
	compact = false,
}: ViewerVotingProps) {
	const [votes, setVotes] = useState(voteCount);
	const [hasVoted, setHasVoted] = useState(userVoted);
	const [isVoting, setIsVoting] = useState(false);

	const handleVote = async () => {
		if (hasVoted || status !== "PENDING") return;

		setIsVoting(true);

		try {
			// In a real app, you would make an API call here
			// const response = await fetch(`/api/projects/${projectId}/vote`, {
			//   method: 'POST',
			// })

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));

			setVotes((prev) => prev + 1);
			setHasVoted(true);
		} catch (error) {
			console.error("Failed to vote:", error);
		} finally {
			setIsVoting(false);
		}
	};

	// Calculate progress towards validation
	const validationThreshold = 100; // Example threshold
	const progressPercentage = Math.min((votes / validationThreshold) * 100, 100);

	if (compact) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Users className="h-5 w-5 mr-2 text-muted-foreground" />
						<span className="text-xl font-bold">{votes}</span>
						<span className="ml-2 text-muted-foreground">votes</span>
					</div>

					<Button
						onClick={handleVote}
						disabled={hasVoted || status !== "PENDING" || isVoting}
						size="sm"
					>
						<ThumbsUp className="h-4 w-4 mr-2" />
						{isVoting ? "Voting..." : hasVoted ? "Voted" : "Vote"}
					</Button>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Progress towards validation</span>
						<span>{Math.round(progressPercentage)}%</span>
					</div>
					<Progress value={progressPercentage} className="h-2" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Users className="h-5 w-5 mr-2 text-muted-foreground" />
					<span className="text-2xl font-bold">{votes}</span>
					<span className="ml-2 text-muted-foreground">community votes</span>
				</div>

				<Button
					onClick={handleVote}
					disabled={hasVoted || status !== "PENDING" || isVoting}
					className="gap-2"
				>
					<ThumbsUp className="h-4 w-4" />
					{isVoting ? "Voting..." : hasVoted ? "Voted" : "Vote"}
				</Button>
			</div>

			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Progress towards validation</span>
					<span>{Math.round(progressPercentage)}%</span>
				</div>
				<Progress value={progressPercentage} className="h-2" />
				<p className="text-sm text-muted-foreground">
					{status === "VALIDATED"
						? "This project has been validated by the community and is now in the funding stage."
						: status === "REJECTED"
							? "This project did not receive enough community support and has been rejected."
							: `This project needs ${validationThreshold - votes} more votes to reach validation.`}
				</p>
			</div>

			{status === "PENDING" && !compact && (
				<div className="bg-muted p-4 rounded-lg text-sm">
					<p className="font-medium">Why vote for this project?</p>
					<ul className="list-disc list-inside overflow-y-scroll mt-2 text-muted-foreground space-y-1">
						<li>Voting helps validate promising projects</li>
						<li>Validated projects move to the funding stage</li>
						<li>Your vote directly influences which innovations get built</li>
						<li>No cost to vote - just show your support</li>
					</ul>
				</div>
			)}
		</div>
	);
}
