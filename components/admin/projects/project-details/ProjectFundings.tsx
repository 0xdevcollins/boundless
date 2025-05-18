"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Check, MoreHorizontal, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Funding {
	id: string;
	amount: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	user: {
		id: string;
		name: string | null;
		email: string | null;
		image: string | null;
	};
}

interface ProjectFundingsProps {
	projectId: string;
	fundings: Funding[];
	totalFunding: number;
	fundingGoal: number;
}

export function ProjectFundings({
	fundings,
	totalFunding,
	fundingGoal,
}: ProjectFundingsProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<string | null>(null);
	const [selectedFunding, setSelectedFunding] = useState<Funding | null>(null);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [confirmAction, setConfirmAction] = useState<string | null>(null);

	const fundingPercentage = Math.min(
		Math.round((totalFunding / fundingGoal) * 100),
		100,
	);

	const handleUpdateStatus = async (fundingId: string, status: string) => {
		setIsLoading(fundingId);
		try {
			const response = await fetch(`/api/admin/fundings/${fundingId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			});

			if (!response.ok) {
				throw new Error(`Failed to update funding status to ${status}`);
			}

			toast.success("Funding updated", {
				description: `The funding status has been updated to ${status.toLowerCase()}.`,
			});

			router.refresh();
		} catch (error) {
			toast.error("Error", {
				description:
					error instanceof Error
						? error.message
						: "Failed to update funding status. Please try again.",
			});
		} finally {
			setIsLoading(null);
			setShowConfirmDialog(false);
		}
	};

	const confirmStatusChange = (funding: Funding, action: string) => {
		setSelectedFunding(funding);
		setConfirmAction(action);
		setShowConfirmDialog(true);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "COMPLETED":
				return <Badge className="bg-green-500">Completed</Badge>;
			case "FAILED":
				return <Badge variant="destructive">Failed</Badge>;
			case "REFUNDED":
				return <Badge variant="outline">Refunded</Badge>;
			default:
				return <Badge variant="secondary">Pending</Badge>;
		}
	};

	return (
		<>
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Funding Progress</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									${totalFunding.toLocaleString()} raised
								</span>
								<span className="text-sm text-muted-foreground">
									${fundingGoal.toLocaleString()} goal
								</span>
							</div>
							<Progress value={fundingPercentage} />
							<p className="text-sm text-muted-foreground text-right">
								{fundingPercentage}% funded
							</p>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
							<div className="text-center p-2 bg-muted rounded-md">
								<p className="text-sm text-muted-foreground">Total Backers</p>
								<p className="text-xl font-bold">{fundings.length}</p>
							</div>
							<div className="text-center p-2 bg-muted rounded-md">
								<p className="text-sm text-muted-foreground">Completed</p>
								<p className="text-xl font-bold">
									{fundings.filter((f) => f.status === "COMPLETED").length}
								</p>
							</div>
							<div className="text-center p-2 bg-muted rounded-md">
								<p className="text-sm text-muted-foreground">Pending</p>
								<p className="text-xl font-bold">
									{fundings.filter((f) => f.status === "PENDING").length}
								</p>
							</div>
							<div className="text-center p-2 bg-muted rounded-md">
								<p className="text-sm text-muted-foreground">Failed/Refunded</p>
								<p className="text-xl font-bold">
									{
										fundings.filter(
											(f) => f.status === "FAILED" || f.status === "REFUNDED",
										).length
									}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Funding Transactions</CardTitle>
					</CardHeader>
					<CardContent>
						{fundings.length === 0 ? (
							<p className="text-center py-8 text-muted-foreground">
								No funding transactions found for this project.
							</p>
						) : (
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Backer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Date</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{fundings.map((funding) => (
											<TableRow key={funding.id}>
												<TableCell>
													<div className="flex items-center gap-2">
														<Avatar className="h-6 w-6">
															<AvatarImage
																src={funding.user.image || undefined}
															/>
															<AvatarFallback>
																{funding.user.name?.charAt(0) || "U"}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="text-sm font-medium">
																{funding.user.name || "Anonymous"}
															</p>
															<p className="text-xs text-muted-foreground">
																{funding.user.email}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell>
													${funding.amount.toLocaleString()}
												</TableCell>
												<TableCell>{getStatusBadge(funding.status)}</TableCell>
												<TableCell>
													{format(new Date(funding.createdAt), "PPP")}
												</TableCell>
												<TableCell className="text-right">
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost" size="icon">
																<MoreHorizontal className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															{funding.status === "PENDING" && (
																<>
																	<DropdownMenuItem
																		onClick={() =>
																			confirmStatusChange(funding, "COMPLETED")
																		}
																		disabled={isLoading === funding.id}
																	>
																		<Check className="mr-2 h-4 w-4" />
																		Mark as Completed
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={() =>
																			confirmStatusChange(funding, "FAILED")
																		}
																		disabled={isLoading === funding.id}
																	>
																		<X className="mr-2 h-4 w-4" />
																		Mark as Failed
																	</DropdownMenuItem>
																</>
															)}
															{(funding.status === "COMPLETED" ||
																funding.status === "FAILED") && (
																<DropdownMenuItem
																	onClick={() =>
																		confirmStatusChange(funding, "REFUNDED")
																	}
																	disabled={isLoading === funding.id}
																>
																	<RefreshCw className="mr-2 h-4 w-4" />
																	Mark as Refunded
																</DropdownMenuItem>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
						<AlertDialogDescription>
							{confirmAction === "COMPLETED" &&
								"Are you sure you want to mark this funding as completed? This indicates the payment has been successfully processed."}
							{confirmAction === "FAILED" &&
								"Are you sure you want to mark this funding as failed? This indicates the payment could not be processed."}
							{confirmAction === "REFUNDED" &&
								"Are you sure you want to mark this funding as refunded? This indicates the payment has been returned to the backer."}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() =>
								selectedFunding && confirmAction
									? handleUpdateStatus(selectedFunding.id, confirmAction)
									: null
							}
						>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
