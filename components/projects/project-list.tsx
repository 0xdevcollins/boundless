"use client";

import { useProjects } from "@/store/useProjectStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProjectCard } from "../shared/project-card";
import type { SortOption } from "../shared/project-filters";

export function ProjectsList({
	category,
	searchQuery,
	sortOption,
}: {
	category: string;
	searchQuery: string;
	sortOption: SortOption;
}) {
	const { projects, isLoading, error, fetchProjects } = useProjects();
	const { data: session } = useSession();
	const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

	useEffect(() => {
		const loadProjects = async () => {
			await fetchProjects(false);
			setHasAttemptedFetch(true);
		};

		loadProjects();
	}, [fetchProjects]);

	if (isLoading || !hasAttemptedFetch) {
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

	let filteredProjects = [...projects];

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
				// This would need to be implemented based on your project's deadline logic
				return 0;
			default:
				return 0;
		}
	});

	if (!filteredProjects.length) {
		return <div className="text-center py-10">No projects found</div>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{filteredProjects.map((project) => {
				const userVoted = session?.user?.id
					? project.votes.some((vote) => vote.userId === session.user?.id)
					: false;

				return (
					<ProjectCard
						key={project.id}
						project={project}
						userVoted={userVoted}
					/>
				);
			})}
		</div>
	);
}
