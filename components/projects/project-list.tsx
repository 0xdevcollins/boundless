"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { VoteButton } from "../shared/vote-button";
import { useSession } from "next-auth/react";

type ValidationStatus = "PENDING" | "REJECTED" | "VALIDATED";

type Project = {
	id: string;
	userId: string;
	title: string;
	description: string;
	fundingGoal: number;
	category: string;
	bannerUrl: string | null;
	profileUrl: string | null;
	blockchainTx: string | null;
	ideaValidation: ValidationStatus;
	createdAt: string;
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
	votes: {
		id: string;
		userId: string;
	}[];
	_count: {
		votes: number;
	};
};

export function ProjectsList() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		async function fetchProjects() {
			try {
				const response = await fetch("/api/projects");

				if (!response.ok) {
					throw new Error("Failed to fetch projects");
				}

				const data = await response.json();
				setProjects(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchProjects();
	}, []);

	if (loading) {
		return <div className="text-center py-10">Loading projects...</div>;
	}

	if (error) {
		return (
			<div className="text-center py-10 text-destructive">Error: {error}</div>
		);
	}

	if (!projects.length) {
		return <div className="text-center py-10">No projects found</div>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{projects.map((project) => {
				// Check if the current user has voted for this project
				const userVoted = session?.user?.id
					? project.votes.some((vote) => vote.userId === session.user?.id)
					: false;

				return (
					<Card
						key={project.id}
						className="h-full hover:shadow-lg transition-shadow"
					>
						<Link href={`/projects/${project.id}`} className="block">
							{project.bannerUrl ? (
								<div className="relative w-full h-32 overflow-hidden">
									<Image
										src={project.bannerUrl || "/placeholder.svg"}
										alt={project.title}
										fill
										className="object-cover"
									/>
								</div>
							) : (
								<div className="w-full h-32 bg-muted flex items-center justify-center">
									<span className="text-muted-foreground">No banner image</span>
								</div>
							)}

							<CardHeader className="relative p-3 pb-0">
								{project.profileUrl && (
									<div className="absolute -top-8 left-3 w-12 h-12 rounded-full overflow-hidden border-2 border-background">
										<Image
											src={project.profileUrl || "/placeholder.svg"}
											alt={`${project.title} profile`}
											fill
											className="object-cover"
										/>
									</div>
								)}
								<div className="mt-4">
									<div className="flex justify-between items-start">
										<h3 className="font-bold text-base line-clamp-1">
											{project.title}
										</h3>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-1 mt-1">
										{project.description}
									</p>
								</div>
							</CardHeader>
						</Link>

						<CardFooter className="flex flex-col items-start gap-1 p-3 pt-0">
							<div className="flex flex-wrap gap-1 mt-2">
								<Badge variant="outline" className="text-xs px-1.5 py-0">
									{project.category.slice(0, 1).toUpperCase() +
										project.category.slice(1).toLowerCase()}
								</Badge>
								<Badge
									variant={
										project.ideaValidation === "VALIDATED"
											? "default"
											: project.ideaValidation === "REJECTED"
												? "destructive"
												: "secondary"
									}
									className="text-xs px-1.5 py-0"
								>
									{formatValidationStatus(project.ideaValidation)}
								</Badge>
							</div>
							<div className="text-xs mb-2">
								<span className="font-medium">
									{project.ideaValidation === "VALIDATED"
										? "FUNDING STAGE"
										: "IDEA VALIDATION STAGE"}
								</span>
							</div>

							{/* Vote Button - only show if project is in PENDING state */}
							{project.ideaValidation === "PENDING" && (
								<div className="w-full mt-2 pt-2 border-t">
									<VoteButton
										projectId={project.id}
										initialVoteCount={project._count.votes}
										initialUserVoted={userVoted}
									/>
								</div>
							)}
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}

function formatValidationStatus(status: ValidationStatus | null | undefined) {
	if (!status) return "Unknown";
	return status.charAt(0) + status.slice(1).toLowerCase();
}
