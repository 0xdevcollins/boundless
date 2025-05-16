"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
	AlertCircle,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	Eye,
	FileText,
	MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MilestonesTableProps {
	milestones: any[];
	currentPage: number;
	totalPages: number;
}

export function MilestonesTable({
	milestones,
	currentPage,
	totalPages,
}: MilestonesTableProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<string | null>(null);
	const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
	const [showAttachments, setShowAttachments] = useState(false);

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "COMPLETED":
				return <CheckCircle2 className="h-4 w-4 text-green-500" />;
			case "IN_PROGRESS":
				return <Clock className="h-4 w-4 text-amber-500" />;
			case "REJECTED":
				return <AlertCircle className="h-4 w-4 text-red-500" />;
			default:
				return <Clock className="h-4 w-4 text-gray-400" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "COMPLETED":
				return "bg-green-500";
			case "IN_PROGRESS":
				return "bg-amber-500";
			case "REJECTED":
				return "bg-red-500";
			default:
				return "bg-gray-400";
		}
	};

	const handleUpdateStatus = async (milestoneId: string, status: string) => {
		setIsLoading(milestoneId);
		try {
			const response = await fetch(
				`/api/admin/milestones/${milestoneId}/status`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ status }),
				},
			);

			if (response.ok) {
				router.refresh();
			} else {
				console.error("Failed to update milestone status");
			}
		} catch (error) {
			console.error("Error updating milestone status:", error);
		} finally {
			setIsLoading(null);
		}
	};

	return (
		<>
			<div className="space-y-4">
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Milestone</TableHead>
								<TableHead>Project</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Progress</TableHead>
								<TableHead>Due Date</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{milestones.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center py-8 text-muted-foreground"
									>
										No milestones found
									</TableCell>
								</TableRow>
							) : (
								milestones.map((milestone) => (
									<TableRow key={milestone.id}>
										<TableCell>
											<div className="font-medium">{milestone.title}</div>
											<div className="text-sm text-muted-foreground line-clamp-1">
												{milestone.description}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarImage
														src={
															milestone.project.user?.image ||
															"/placeholder.svg"
														}
														alt={milestone.project.user?.name}
													/>
													<AvatarFallback>
														{milestone.project.user?.name?.charAt(0) || "U"}
													</AvatarFallback>
												</Avatar>
												<Link
													href={`/admin/projects/${milestone.project.id}`}
													className="text-sm hover:underline"
												>
													{milestone.project.title}
												</Link>
											</div>
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className="flex items-center gap-1"
											>
												{getStatusIcon(milestone.status)}
												{milestone.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="w-full max-w-[100px]">
												<div className="text-xs mb-1">
													{milestone.progress}%
												</div>
												<Progress
													value={milestone.progress}
													className={`h-2 ${getStatusColor(milestone.status)}`}
												/>
											</div>
										</TableCell>
										<TableCell>
											{milestone.dueDate ? (
												<span className="text-sm">
													{format(new Date(milestone.dueDate), "MMM d, yyyy")}
												</span>
											) : (
												<span className="text-sm text-muted-foreground">
													No due date
												</span>
											)}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														setSelectedMilestone(milestone);
														setShowAttachments(false);
													}}
												>
													<Eye className="h-4 w-4" />
												</Button>

												{milestone.attachments.length > 0 && (
													<Button
														variant="ghost"
														size="icon"
														onClick={() => {
															setSelectedMilestone(milestone);
															setShowAttachments(true);
														}}
													>
														<FileText className="h-4 w-4" />
													</Button>
												)}

												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() => {
																setSelectedMilestone(milestone);
																setShowAttachments(false);
															}}
														>
															View Details
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																handleUpdateStatus(milestone.id, "COMPLETED")
															}
															disabled={isLoading === milestone.id}
														>
															Mark as Completed
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																handleUpdateStatus(milestone.id, "IN_PROGRESS")
															}
															disabled={isLoading === milestone.id}
														>
															Mark as In Progress
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																handleUpdateStatus(milestone.id, "REJECTED")
															}
															disabled={isLoading === milestone.id}
														>
															Mark as Rejected
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

			{/* Milestone Details Dialog */}
			<Dialog
				open={!!selectedMilestone && !showAttachments}
				onOpenChange={(open) => !open && setSelectedMilestone(null)}
			>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{selectedMilestone?.title}</DialogTitle>
						<DialogDescription>
							Milestone details and progress
						</DialogDescription>
					</DialogHeader>

					{selectedMilestone && (
						<div className="space-y-4">
							<div>
								<Badge
									variant="outline"
									className="flex items-center gap-1 mb-2"
								>
									{getStatusIcon(selectedMilestone.status)}
									{selectedMilestone.status}
								</Badge>
								<p className="text-sm whitespace-pre-line">
									{selectedMilestone.description}
								</p>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span>Progress: {selectedMilestone.progress}%</span>
								</div>
								<Progress
									value={selectedMilestone.progress}
									className={`h-2 ${getStatusColor(selectedMilestone.status)}`}
								/>
							</div>

							{selectedMilestone.dueDate && (
								<div className="text-sm">
									<span className="font-medium">Due Date:</span>{" "}
									{format(new Date(selectedMilestone.dueDate), "MMMM d, yyyy")}
								</div>
							)}

							<div className="text-sm">
								<span className="font-medium">Project:</span>{" "}
								<Link
									href={`/admin/projects/${selectedMilestone.project.id}`}
									className="text-primary hover:underline"
								>
									{selectedMilestone.project.title}
								</Link>
							</div>

							<div className="text-sm">
								<span className="font-medium">Created:</span>{" "}
								{format(new Date(selectedMilestone.createdAt), "MMMM d, yyyy")}
							</div>

							<div className="pt-2 flex justify-between">
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										setShowAttachments(true);
									}}
									disabled={selectedMilestone.attachments.length === 0}
								>
									<FileText className="h-4 w-4 mr-2" />
									View Attachments ({selectedMilestone.attachments.length})
								</Button>

								<div className="space-x-2">
									<Button
										size="sm"
										onClick={() =>
											handleUpdateStatus(selectedMilestone.id, "COMPLETED")
										}
										className="bg-green-600 hover:bg-green-700"
									>
										Approve
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											handleUpdateStatus(selectedMilestone.id, "REJECTED")
										}
										className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
									>
										Reject
									</Button>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Attachments Dialog */}
			<Dialog
				open={!!selectedMilestone && showAttachments}
				onOpenChange={(open) => !open && setSelectedMilestone(null)}
			>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Attachments</DialogTitle>
						<DialogDescription>
							Files attached to milestone: {selectedMilestone?.title}
						</DialogDescription>
					</DialogHeader>

					{selectedMilestone && (
						<div className="space-y-4">
							{selectedMilestone.attachments.length === 0 ? (
								<div className="text-center py-6 text-muted-foreground">
									No attachments found for this milestone
								</div>
							) : (
								<div className="space-y-2">
									{selectedMilestone.attachments.map((attachment: any) => (
										<div
											key={attachment.id}
											className="flex items-center justify-between p-3 border rounded-md"
										>
											<div className="flex items-center gap-3">
												<FileText className="h-5 w-5 text-muted-foreground" />
												<div>
													<div className="font-medium">
														{attachment.fileName}
													</div>
													<div className="text-xs text-muted-foreground">
														{(attachment.fileSize / 1024).toFixed(2)} KB •{" "}
														{attachment.fileType}
													</div>
												</div>
											</div>
											<a
												href={attachment.fileUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary hover:text-primary/80"
											>
												<Eye className="h-4 w-4" />
											</a>
										</div>
									))}
								</div>
							)}

							<div className="pt-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowAttachments(false)}
								>
									Back to Details
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
