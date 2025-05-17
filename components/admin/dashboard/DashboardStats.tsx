import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, FolderKanban, Users } from "lucide-react";

interface DashboardStatsProps {
	projectCount: number;
	userCount: number;
	pendingProjects: number;
	totalFunding: number;
}

export function DashboardStats({
	projectCount,
	userCount,
	pendingProjects,
	totalFunding,
}: DashboardStatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Projects</CardTitle>
					<FolderKanban className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{projectCount}</div>
					<p className="text-xs text-muted-foreground">
						All projects on the platform
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Users</CardTitle>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{userCount}</div>
					<p className="text-xs text-muted-foreground">
						Registered users on the platform
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Projects
					</CardTitle>
					<Clock className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{pendingProjects}</div>
					<p className="text-xs text-muted-foreground">
						Projects awaiting approval
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Funding</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						${totalFunding.toLocaleString()}
					</div>
					<p className="text-xs text-muted-foreground">
						Completed funding amount
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
