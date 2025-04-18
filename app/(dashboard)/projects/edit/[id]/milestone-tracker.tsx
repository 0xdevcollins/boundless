"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { MilestoneForm } from "./milestone-form";

interface Milestone {
	id: string;
	title: string;
	description: string;
	dueDate: string | null;
	progress: number;
	status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

interface MilestoneTrackerProps {
	isTeamMember: boolean;
	projectId: string;
}

export function MilestoneTracker({
	isTeamMember,
	projectId,
}: MilestoneTrackerProps) {
	const [milestones, setMilestones] = useState<Milestone[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchMilestones = async () => {
		try {
			const response = await fetch(`/api/projects/${projectId}/milestones`);
			if (!response.ok) throw new Error("Failed to fetch milestones");
			const data = await response.json();
			setMilestones(data);
		} catch (error) {
			console.error("Error fetching milestones:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMilestones();
	}, [projectId, fetchMilestones]);

	const getStatusIcon = (status: Milestone["status"]) => {
		switch (status) {
			case "COMPLETED":
				return (
					<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
						<Check className="h-4 w-4 text-white" />
					</div>
				);
			case "IN_PROGRESS":
				return (
					<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
						<Clock className="h-4 w-4 text-white" />
					</div>
				);
			default:
				return (
					<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</div>
				);
		}
	};

	const getStatusBadge = (status: Milestone["status"]) => {
		switch (status) {
			case "COMPLETED":
				return <Badge variant="secondary">Completed</Badge>;
			case "IN_PROGRESS":
				return <Badge>In Progress</Badge>;
			default:
				return <Badge variant="secondary">Pending</Badge>;
		}
	};

	if (loading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Project Milestones</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center text-muted-foreground">
						Loading milestones...
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Project Milestones</CardTitle>
					{isTeamMember && (
						<MilestoneForm projectId={projectId} onSuccess={fetchMilestones} />
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{milestones.length === 0 ? (
						<div className="text-center text-muted-foreground">
							No milestones yet.{" "}
							{isTeamMember && "Add your first milestone to get started!"}
						</div>
					) : (
						milestones.map((milestone) => (
							<div key={milestone.id} className="flex gap-4">
								{getStatusIcon(milestone.status)}
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<h4 className="font-medium">{milestone.title}</h4>
										{getStatusBadge(milestone.status)}
									</div>
									<p className="text-sm text-muted-foreground">
										{milestone.description}
									</p>
									{milestone.dueDate && (
										<p className="text-xs text-muted-foreground">
											Due: {new Date(milestone.dueDate).toLocaleDateString()}
										</p>
									)}
									{milestone.progress > 0 && (
										<div className="mt-2">
											<div className="flex justify-between text-xs text-muted-foreground">
												<span>Progress</span>
												<span>{milestone.progress}%</span>
											</div>
											<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-primary transition-all"
													style={{ width: `${milestone.progress}%` }}
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
}
