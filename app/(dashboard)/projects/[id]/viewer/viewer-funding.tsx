/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreditCard, DollarSign, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FundingData = {
	raised: number;
	backers: number;
	daysLeft: number;
};

type ViewerFundingHorizontalProps = {
	projectId: string;
	fundingGoal: number;
};

export function ViewerFundingHorizontal({
	projectId,
	fundingGoal,
}: ViewerFundingHorizontalProps) {
	const { data: session } = useSession();
	const [fundingData, setFundingData] = useState<FundingData>({
		raised: 0,
		backers: 0,
		daysLeft: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchFundingData() {
			try {
				const response = await fetch(`/api/projects/${projectId}/funding`);
				if (!response.ok) throw new Error("Failed to fetch funding data");

				const data = await response.json();
				setFundingData(data);
			} catch (error) {
				console.error("Error fetching funding data:", error);
				toast.error("Failed to load funding data");
			} finally {
				setIsLoading(false);
			}
		}

		fetchFundingData();
	}, [projectId]);

	const percentFunded = (fundingData.raised / fundingGoal) * 100;

	const handleBackProject = async () => {
		if (!session) {
			toast.error("Please sign in to back this project");
			return;
		}

		// Here you would typically open a modal or navigate to a funding page
		toast.info("Funding functionality coming soon!");
	};

	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="animate-pulse space-y-4">
						<div className="h-8 bg-muted rounded w-1/3" />
						<div className="h-2 bg-muted rounded" />
						<div className="h-4 bg-muted rounded w-1/4" />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
					{/* Funding Progress */}
					<div className="md:col-span-2 space-y-3">
						<div className="flex items-baseline justify-between">
							<span className="text-2xl font-bold">
								${fundingData.raised.toLocaleString()}
							</span>
							<span className="text-muted-foreground">
								of ${fundingGoal.toLocaleString()} goal
							</span>
						</div>
						<Progress value={percentFunded} className="h-2" />
						<div className="text-sm text-muted-foreground">
							{Math.round(percentFunded)}% funded with {fundingData.daysLeft}{" "}
							days to go
						</div>
					</div>

					{/* Stats */}
					<div className="flex justify-between md:justify-around">
						<div className="text-center">
							<div className="flex justify-center mb-1">
								<Users className="h-5 w-5 text-primary" />
							</div>
							<div className="text-xl font-medium">{fundingData.backers}</div>
							<div className="text-xs text-muted-foreground">Backers</div>
						</div>

						<div className="text-center">
							<div className="flex justify-center mb-1">
								<CreditCard className="h-5 w-5 text-primary" />
							</div>
							<div className="text-xl font-medium">{fundingData.daysLeft}</div>
							<div className="text-xs text-muted-foreground">Days Left</div>
						</div>
					</div>

					{/* Action Button */}
					<div className="flex justify-center">
						<Button className="w-full md:w-auto" onClick={handleBackProject}>
							<DollarSign className="mr-2 h-4 w-4" /> Back This Project
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
