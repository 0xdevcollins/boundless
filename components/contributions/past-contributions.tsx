"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "../shared/pagination";
import type { PastProject } from "@/types/contributions";

interface PastContributionsProps {
	projects: PastProject[];
	navigateToProject: (projectId: string) => void;
	itemsPerPage?: number;
}

export function PastContributions({
	projects,
	navigateToProject,
	itemsPerPage = 6,
}: PastContributionsProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedProjects, setPaginatedProjects] = useState<PastProject[]>([]);

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
	};

	if (projects.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No past contributions found.</p>
			</div>
		);
	}

	return (
		<>
			<div className="rounded-md border mb-4 overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Project</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Final Votes</TableHead>
							<TableHead>Your Vote</TableHead>
							<TableHead>Comments</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedProjects.map((project) => (
							<TableRow key={project.id}>
								<TableCell className="font-medium">{project.name}</TableCell>
								<TableCell>{project.category}</TableCell>
								<TableCell>
									{project.finalVotes}/{project.requiredVotes}
									<span className="ml-2">
										{project.passed ? (
											<Badge
												variant="outline"
												className="bg-green-100 text-green-800 border-green-200"
											>
												Passed
											</Badge>
										) : (
											<Badge
												variant="outline"
												className="bg-red-100 text-red-800 border-red-200"
											>
												Failed
											</Badge>
										)}
									</span>
								</TableCell>
								<TableCell>
									{project.userVoted ? (
										<ThumbsUp className="h-4 w-4 text-green-600" />
									) : project.userRejected ? (
										<ThumbsDown className="h-4 w-4 text-red-600" />
									) : (
										"N/A"
									)}
								</TableCell>
								<TableCell>{project.userComments}</TableCell>
								<TableCell>
									{project.funded ? (
										<Badge className="bg-blue-100 text-blue-800 border-blue-200">
											Funded
										</Badge>
									) : (
										<Badge variant="outline">Not Funded</Badge>
									)}
								</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => navigateToProject(project.id)}
									>
										View
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{totalPages > 1 && (
				<div className="flex justify-between items-center mb-8">
					<p className="text-sm text-muted-foreground">
						Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
						{Math.min(currentPage * itemsPerPage, projects.length)} of{" "}
						{projects.length} projects
					</p>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</>
	);
}
