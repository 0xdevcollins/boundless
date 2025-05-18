"use client";

import { ReviewForm } from "@/components/admin/projects/ReviewForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ValidationStatus } from "@/types/project";
import { formatDistanceToNow } from "date-fns";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Eye,
	MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TableProject {
	id: string;
	title: string;
	description: string;
	userId: string;
	fundingGoal: number;
	category: string;
	bannerUrl: string | null;
	profileUrl: string | null;
	blockchainTx: string | null;
	ideaValidation: ValidationStatus;
	createdAt: Date;
	updatedAt?: Date;
	isApproved: boolean;
	whitepaper: string | null;
	user: {
		id: string;
		name: string | null;
		image: string | null;
		email: string | null;
	};
	_count: {
		fundings: number;
		votes: number;
	};
}

interface ProjectsTableProps {
	projects: TableProject[];
	currentPage: number;
	totalPages: number;
}

export function ProjectsTable({
	projects,
	currentPage,
	totalPages,
}: ProjectsTableProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<string | null>(null);
	const [reviewProject, setReviewProject] = useState<TableProject | null>(null);
	const [isReviewOpen, setIsReviewOpen] = useState(false);

	const handleApproveProject = async (projectId: string, review: string) => {
		setIsLoading(projectId);
		try {
			const response = await fetch(`/api/admin/projects/${projectId}/approve`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ review }),
			});

			if (response.ok) {
				setIsReviewOpen(false);
				setReviewProject(null);
				router.refresh();
			} else {
				console.error("Failed to approve project");
			}
		} catch (error) {
			console.error("Error approving project:", error);
		} finally {
			setIsLoading(null);
		}
	};

	const handleRejectProject = async (projectId: string, review: string) => {
		setIsLoading(projectId);
		try {
			const response = await fetch(`/api/admin/projects/${projectId}/reject`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ review }),
			});

			if (response.ok) {
				setIsReviewOpen(false);
				setReviewProject(null);
				router.refresh();
			} else {
				console.error("Failed to reject project");
			}
		} catch (error) {
			console.error("Error rejecting project:", error);
		} finally {
			setIsLoading(null);
		}
	};

	const openReviewDialog = (project: TableProject) => {
		setReviewProject(project);
		setIsReviewOpen(true);
	};

	return (
		<>
			<div className="space-y-4">
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Project</TableHead>
								<TableHead>Creator</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center py-8 text-muted-foreground"
									>
										No projects found
									</TableCell>
								</TableRow>
							) : (
								projects.map((project) => (
									<TableRow key={project.id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
													{project.bannerUrl ? (
														<Image
															src={project.bannerUrl || "/placeholder.svg"}
															alt={project.title}
															className="w-full h-full object-cover"
															width={100}
															height={100}
														/>
													) : (
														<div className="w-full h-full flex items-center justify-center text-gray-400">
															<span className="text-xs">No img</span>
														</div>
													)}
												</div>
												<div>
													<Link
														href={`/admin/projects/${project.id}`}
														className="font-medium hover:underline"
													>
														{project.title}
													</Link>
													<div className="text-xs text-muted-foreground mt-1">
														{project._count.fundings} fundings ·{" "}
														{project._count.votes} votes
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarImage
														src={project.user?.image || "/placeholder.svg"}
														alt={`${project.user?.name}`}
													/>
													<AvatarFallback>
														{project.user?.name?.charAt(0) || "U"}
													</AvatarFallback>
												</Avatar>
												<span className="text-sm">
													{project.user?.name || "Unknown"}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline">{project.category}</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant={project.isApproved ? "default" : "outline"}
											>
												{project.isApproved ? "Approved" : "Pending"}
											</Badge>
										</TableCell>
										<TableCell>
											<span className="text-sm text-muted-foreground">
												{formatDistanceToNow(new Date(project.createdAt), {
													addSuffix: true,
												})}
											</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Link href={`/admin/projects/${project.id}`}>
													<Button variant="ghost" size="icon">
														<Eye className="h-4 w-4" />
													</Button>
												</Link>

												{!project.isApproved && (
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openReviewDialog(project)}
														disabled={isLoading === project.id}
													>
														<Check className="h-4 w-4 text-green-500" />
													</Button>
												)}

												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem asChild>
															<Link href={`/admin/projects/${project.id}`}>
																View Details
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link
																href={`/projects/${project.id}`}
																target="_blank"
															>
																View on Site
															</Link>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between">
						<div className="text-sm text-muted-foreground">
							Page {currentPage} of {totalPages}
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									const searchParams = new URLSearchParams(
										window.location.search,
									);
									searchParams.set("page", String(currentPage - 1));
									router.push(`?${searchParams.toString()}`);
								}}
								disabled={currentPage <= 1}
							>
								<ChevronLeft className="h-4 w-4 mr-1" />
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									const searchParams = new URLSearchParams(
										window.location.search,
									);
									searchParams.set("page", String(currentPage + 1));
									router.push(`?${searchParams.toString()}`);
								}}
								disabled={currentPage >= totalPages}
							>
								Next
								<ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</div>
					</div>
				)}
			</div>

			{/* Review Dialog */}
			<Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
				<DialogContent className="sm:max-w-[600px]">
					{reviewProject && (
						<ReviewForm
							projectId={reviewProject.id}
							projectTitle={reviewProject.title}
							onApprove={handleApproveProject}
							onReject={handleRejectProject}
							onCancel={() => setIsReviewOpen(false)}
							isLoading={isLoading === reviewProject.id}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
