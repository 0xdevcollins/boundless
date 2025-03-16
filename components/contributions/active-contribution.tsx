"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ActiveProject } from "@/types/contributions";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "../shared/pagination";

interface ActiveContributionsProps {
	projects: ActiveProject[];
	navigateToProject: (projectId: string) => void;
	itemsPerPage?: number;
}

export function ActiveContributions({
	projects,
	navigateToProject,
	itemsPerPage = 6,
}: ActiveContributionsProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedProjects, setPaginatedProjects] = useState<ActiveProject[]>(
		[],
	);

	const totalPages = Math.max(1, Math.ceil(projects.length / itemsPerPage));

	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPaginatedProjects(projects.slice(startIndex, endIndex));

		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1);
		}
	}, [projects, currentPage, itemsPerPage, totalPages]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (projects.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No active contributions found.</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{paginatedProjects.map((project) => (
					<Card key={project.id} className="overflow-hidden">
						<CardHeader className="pb-2">
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-lg">{project.name}</CardTitle>
									<CardDescription>
										<Badge variant="outline" className="mt-1">
											{project.category}
										</Badge>
									</CardDescription>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToProject(project.id)}
								>
									{/* <Eye className="h-4 w-4" /> */}
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pb-2">
							<div className="space-y-4">
								<div>
									<div className="flex justify-between text-sm mb-1">
										<span>Voting Progress</span>
										<span>
											{project.currentVotes}/{project.requiredVotes}
										</span>
									</div>
									<Progress
										value={(project.currentVotes / project.requiredVotes) * 100}
										className="h-2"
									/>
								</div>
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										{project.userVoted && (
											<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
												<Check className="mr-1 h-3 w-3" /> Voted
											</Badge>
										)}
										{project.userRejected && (
											<Badge
												variant="outline"
												className="border-red-200 text-red-800"
											>
												<X className="mr-1 h-3 w-3" /> Rejected
											</Badge>
										)}
									</div>
									{project.userComments > 0 && (
										<Badge variant="outline">
											{project.userComments} Comment
											{project.userComments > 1 ? "s" : ""}
										</Badge>
									)}
								</div>
							</div>
						</CardContent>
						<CardFooter className="pt-2">
							<div className="w-full flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									{project.timeLeft} left
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => navigateToProject(project.id)}
								>
									View Project
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>

			{totalPages > 1 && (
				<div className="mt-6">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
						className="flex justify-center items-center gap-1"
					/>
				</div>
			)}
		</>
	);
}
