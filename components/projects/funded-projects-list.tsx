/* This page might not work as expected, we need to check if the project is funded and then sort by completion date

@Ben Please we will need to update this page later
*/

"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/store/useProjectStore";
import { AlertCircle, CheckCircle2, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCard } from "../shared/project-card";
import type { SortOption } from "../shared/project-filters";

interface FundedProjectsListProps {
	category?: string;
	searchQuery?: string;
	sortOption?: SortOption;
}

export function FundedProjectsList({
	category,
	searchQuery = "",
	sortOption = "newest",
}: FundedProjectsListProps) {
	const { projects, isLoading, error, fetchProjects } = useProjects();
	const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

	useEffect(() => {
		const loadProjects = async () => {
			await fetchProjects(true);
			setHasAttemptedFetch(true);
		};

		loadProjects();
	}, [fetchProjects]);

	if (isLoading || !hasAttemptedFetch) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<Card
						key={`skeleton-${index}-${Math.random()}`}
						className="overflow-hidden"
					>
						<Skeleton className="h-48 w-full" />
						<div className="p-6 space-y-4">
							<div className="space-y-2">
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
							<div className="flex justify-between items-center">
								<Skeleton className="h-8 w-24" />
								<Skeleton className="h-8 w-32" />
							</div>
						</div>
					</Card>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<Card className="p-8">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="rounded-full bg-destructive/10 p-3">
						<AlertCircle className="h-6 w-6 text-destructive" />
					</div>
					<h2 className="text-xl font-semibold">Error Loading Projects</h2>
					<p className="text-muted-foreground max-w-md">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="text-sm text-primary hover:underline"
						type="button"
					>
						Try Again
					</button>
				</div>
			</Card>
		);
	}

	// Apply all filters and sorting
	let filteredProjects = [...projects];

	// Filter for funded projects
	filteredProjects = filteredProjects.filter((project) => {
		const fundingPercentage =
			(project._count.votes * 10) / (project.fundingGoal || 1);
		return fundingPercentage >= 100;
	});

	// Apply category filter
	if (category) {
		filteredProjects = filteredProjects.filter(
			(project) => project.category === category,
		);
	}

	// Apply search filter
	if (searchQuery) {
		const query = searchQuery.toLowerCase();
		filteredProjects = filteredProjects.filter(
			(project) =>
				project.title.toLowerCase().includes(query) ||
				project.description.toLowerCase().includes(query),
		);
	}

	// Apply sorting
	filteredProjects.sort((a, b) => {
		switch (sortOption) {
			case "newest":
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			case "oldest":
				return (
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			case "popular":
				return b._count.votes - a._count.votes;
			case "ending":
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			default:
				return 0;
		}
	});

	if (!filteredProjects.length) {
		return (
			<Card className="p-8">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="rounded-full bg-muted p-3">
						<FolderOpen className="h-6 w-6 text-muted-foreground" />
					</div>
					<h2 className="text-xl font-semibold">No Funded Projects Found</h2>
					<p className="text-muted-foreground max-w-md">
						{category
							? "No projects found in this category. Try selecting a different category."
							: searchQuery
								? "No projects match your search. Try different keywords."
								: "There are no funded projects at the moment. Check back later for updates."}
					</p>
				</div>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Funded Projects</h2>
				<Badge variant="secondary" className="flex items-center gap-1">
					<CheckCircle2 className="h-4 w-4" />
					{filteredProjects.length} Projects
				</Badge>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredProjects.map((project) => (
					<ProjectCard key={project.id} project={project} userVoted={false} />
				))}
			</div>
		</div>
	);
}
