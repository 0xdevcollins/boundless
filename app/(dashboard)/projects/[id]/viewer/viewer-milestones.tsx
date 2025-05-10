"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type Milestone = {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	completedDate: string | null;
	status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";
};

type ViewerMilestonesProps = {
	projectId: string;
};

export function ViewerMilestones({ projectId }: ViewerMilestonesProps) {
	const [milestones, setMilestones] = useState<Milestone[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Mock data - in a real app, you would fetch from API
		const mockMilestones: Milestone[] = [
			{
				id: "1",
				title: "Project Validation",
				description: "Gather community support and validate the project idea",
				dueDate: "2023-12-01",
				completedDate: "2023-11-28",
				status: "COMPLETED",
			},
			{
				id: "2",
				title: "Initial Funding Round",
				description: "Secure initial funding to begin development",
				dueDate: "2024-01-15",
				completedDate: "2024-01-10",
				status: "COMPLETED",
			},
			{
				id: "3",
				title: "MVP Development",
				description: "Develop the minimum viable product",
				dueDate: "2024-04-30",
				completedDate: null,
				status: "IN_PROGRESS",
			},
			{
				id: "4",
				title: "Beta Testing",
				description: "Release beta version for community testing",
				dueDate: "2024-06-15",
				completedDate: null,
				status: "PENDING",
			},
			{
				id: "5",
				title: "Public Launch",
				description: "Official public launch of the project",
				dueDate: "2024-08-01",
				completedDate: null,
				status: "PENDING",
			},
		];

		// Simulate API fetch
		setTimeout(() => {
			setMilestones(mockMilestones);
			setLoading(false);
		}, 500);
	}, [projectId]);

	// Calculate overall progress
	const completedMilestones = milestones.filter(
		(m) => m.status === "COMPLETED",
	).length;
	const progressPercentage =
		milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	// Get status badge
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "COMPLETED":
				return (
					<Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
				);
			case "IN_PROGRESS":
				return (
					<Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
				);
			case "DELAYED":
				return (
					<Badge className="bg-amber-500 hover:bg-amber-600">Delayed</Badge>
				);
			default:
				return <Badge variant="outline">Pending</Badge>;
		}
	};

	if (loading) {
		return (
			<Card className="h-[320px]">
				<CardHeader>
					<CardTitle>Project Milestones</CardTitle>
					<CardDescription>Loading milestone data...</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center py-8">
						<div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="h-[320px] overflow-y-scroll">
			<CardHeader>
				<CardTitle>Project Milestones</CardTitle>
				<CardDescription>
					Track the progress of this project through its key milestones
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[calc(320px-85px)] overflow-y-auto">
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">Overall Progress</span>
							<span className="text-sm">
								{completedMilestones} of {milestones.length} completed
							</span>
						</div>
						<Progress value={progressPercentage} className="h-2" />
					</div>

					<div className="space-y-4 mt-4">
						{milestones.map((milestone) => (
							<div key={milestone.id} className="border rounded-lg p-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-medium">{milestone.title}</h3>
										<p className="text-sm text-muted-foreground mt-1">
											{milestone.description}
										</p>
									</div>
									{getStatusBadge(milestone.status)}
								</div>

								<Separator className="my-3" />

								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center text-muted-foreground">
										<Calendar className="h-4 w-4 mr-1" />
										<span>Due: {formatDate(milestone.dueDate)}</span>
									</div>

									{milestone.status === "COMPLETED" ? (
										<div className="flex items-center text-green-500">
											<CheckCircle2 className="h-4 w-4 mr-1" />
											<span>
												Completed: {formatDate(milestone.completedDate || "")}
											</span>
										</div>
									) : (
										<div className="flex items-center text-muted-foreground">
											<Clock className="h-4 w-4 mr-1" />
											<span>
												{milestone.status === "IN_PROGRESS"
													? "In progress"
													: "Not started"}
											</span>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
