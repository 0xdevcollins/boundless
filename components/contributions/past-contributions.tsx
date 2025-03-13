"use client";

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
import type { PastProject } from "@/types/contributions";

interface PastContributionsProps {
	projects: PastProject[];
	navigateToProject: (projectId: string) => void;
}

export function PastContributions({
	projects,
	navigateToProject,
}: PastContributionsProps) {
	if (projects.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">No past contributions found.</p>
			</div>
		);
	}

	return (
		<div className="rounded-md border mb-8 overflow-hidden">
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
					{projects.map((project) => (
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
	);
}
