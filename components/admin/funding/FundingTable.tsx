"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { Project } from "@/types/project";
import type { User } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Funding {
	id: string;
	project: Project;
	user: User;
	amount: number;
	status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
	createdAt: string;
}
interface FundingTableProps {
	fundings: Funding[];
	currentPage: number;
	totalPages: number;
}

export function FundingTable({
	fundings,
	currentPage,
	totalPages,
}: FundingTableProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<string | null>(null);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "COMPLETED":
				return "bg-green-500 text-white";
			case "PENDING":
				return "bg-yellow-500 text-white";
			case "FAILED":
				return "bg-red-500 text-white";
			case "REFUNDED":
				return "bg-blue-500 text-white";
			default:
				return "bg-gray-500 text-white";
		}
	};

	const handleUpdateStatus = async (fundingId: string, status: string) => {
		setIsLoading(fundingId);
		try {
			const response = await fetch(`/api/admin/funding/${fundingId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			});

			if (response.ok) {
				router.refresh();
			} else {
				console.error("Failed to update funding status");
			}
		} catch (error) {
			console.error("Error updating funding status:", error);
		} finally {
			setIsLoading(null);
		}
	};

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Project</TableHead>
							<TableHead>Backer</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fundings.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No funding transactions found
								</TableCell>
							</TableRow>
						) : (
							fundings.map((funding) => (
								<TableRow key={funding.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
												{funding.project.bannerUrl ? (
													<Image
														src={
															funding.project.bannerUrl || "/placeholder.svg"
														}
														alt={funding.project.title}
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
													href={`/admin/projects/${funding.project.id}`}
													className="font-medium hover:underline"
												>
													{funding.project.title}
												</Link>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage
													src={funding.user?.image || "/placeholder.svg"}
													alt={`${funding.user?.name}`}
												/>
												<AvatarFallback>
													{funding.user?.name?.charAt(0) || "U"}
												</AvatarFallback>
											</Avatar>
											<Link
												href={`/admin/users/${funding.user.id}`}
												className="text-sm hover:underline"
											>
												{funding.user?.name || "Unknown"}
											</Link>
										</div>
									</TableCell>
									<TableCell>
										<span className="font-medium">
											${funding.amount.toLocaleString()}
										</span>
									</TableCell>
									<TableCell>
										<Badge className={getStatusColor(funding.status)}>
											{funding.status}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex flex-col">
											<span className="text-sm">
												{format(new Date(funding.createdAt), "MMM d, yyyy")}
											</span>
											<span className="text-xs text-muted-foreground">
												{formatDistanceToNow(new Date(funding.createdAt), {
													addSuffix: true,
												})}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem asChild>
														<Link
															href={`/admin/projects/${funding.project.id}`}
														>
															View Project
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link href={`/admin/users/${funding.user.id}`}>
															View Backer
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleUpdateStatus(funding.id, "COMPLETED")
														}
														disabled={
															funding.status === "COMPLETED" ||
															isLoading === funding.id
														}
													>
														Mark as Completed
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleUpdateStatus(funding.id, "PENDING")
														}
														disabled={
															funding.status === "PENDING" ||
															isLoading === funding.id
														}
													>
														Mark as Pending
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleUpdateStatus(funding.id, "FAILED")
														}
														disabled={
															funding.status === "FAILED" ||
															isLoading === funding.id
														}
													>
														Mark as Failed
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															handleUpdateStatus(funding.id, "REFUNDED")
														}
														disabled={
															funding.status === "REFUNDED" ||
															isLoading === funding.id
														}
													>
														Mark as Refunded
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
	);
}
