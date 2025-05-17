"use client";

import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { ErrorState } from "@/components/admin/dashboard/ErrorState";
import { FundingOverview } from "@/components/admin/dashboard/FundingOverview";
import { DashboardLoadingState } from "@/components/admin/dashboard/LoadingState";
import { RecentProjects } from "@/components/admin/dashboard/RecentProjects";
import { RecentUsers } from "@/components/admin/dashboard/RecentUsers";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [refreshing, setRefreshing] = useState(false);
	const [stats, setStats] = useState({
		projectCount: 0,
		userCount: 0,
		pendingProjects: 0,
		totalFunding: 0,
	});
	const [recentProjects, setRecentProjects] = useState([]);
	const [recentUsers, setRecentUsers] = useState([]);
	const [fundingOverview, setFundingOverview] = useState([]);

	const fetchDashboardData = useCallback(async (showRefreshing = false) => {
		try {
			if (showRefreshing) {
				setRefreshing(true);
			} else {
				setLoading(true);
			}
			setError(null);

			const [statsRes, projectsRes, usersRes, fundingRes] = await Promise.all([
				fetch("/api/admin/dashboard"),
				fetch("/api/admin/dashboard/recent-projects"),
				fetch("/api/admin/dashboard/recent-users"),
				fetch("/api/admin/dashboard/funding-overview"),
			]);

			if (!statsRes.ok) throw new Error(`Stats error: ${statsRes.status}`);
			if (!projectsRes.ok)
				throw new Error(`Projects error: ${projectsRes.status}`);
			if (!usersRes.ok) throw new Error(`Users error: ${usersRes.status}`);
			if (!fundingRes.ok)
				throw new Error(`Funding error: ${fundingRes.status}`);

			const [statsData, projectsData, usersData, fundingData] =
				await Promise.all([
					statsRes.json(),
					projectsRes.json(),
					usersRes.json(),
					fundingRes.json(),
				]);

			setStats(statsData);
			setRecentProjects(projectsData);
			setRecentUsers(usersData);
			setFundingOverview(fundingData);
		} catch (err) {
			console.error("Error fetching dashboard data:", err);
			setError(
				err instanceof Error ? err.message : "Failed to fetch dashboard data",
			);

			toast.error("Error", {
				description:
					err instanceof Error ? err.message : "Failed to fetch dashboard data",
			});
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);

	const handleRefresh = () => {
		fetchDashboardData(true);
	};

	if (loading) {
		return <DashboardLoadingState />;
	}

	if (error) {
		return <ErrorState message={error} onRetry={fetchDashboardData} />;
	}

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">
					{session?.user?.name
						? `Welcome, ${session?.user?.name.split(" ")[0]}`
						: "Dashboard"}
				</h1>
				<Button
					variant="outline"
					size="sm"
					onClick={handleRefresh}
					disabled={refreshing}
					className="flex items-center gap-2"
				>
					<RefreshCw
						className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
					/>
					{refreshing ? "Refreshing..." : "Refresh"}
				</Button>
			</div>

			<DashboardStats
				projectCount={stats.projectCount}
				userCount={stats.userCount}
				pendingProjects={stats.pendingProjects}
				totalFunding={stats.totalFunding}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<RecentProjects projects={recentProjects} />
				<RecentUsers users={recentUsers} />
			</div>

			<FundingOverview fundingData={fundingOverview} />
		</div>
	);
}
