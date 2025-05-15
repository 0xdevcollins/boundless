import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RecentProjects } from "@/components/admin/dashboard/RecentProjects";
import { RecentUsers } from "@/components/admin/dashboard/RecentUsers";
import { FundingOverview } from "@/components/admin/dashboard/FundingOverview";

export default async function AdminDashboard() {
	const session = await getServerSession(authOptions);

	// Fetch dashboard statistics
	const projectCount = await prisma.project.count();
	const userCount = await prisma.user.count();
	const pendingProjects = await prisma.project.count({
		where: { isApproved: false }
	});
	const totalFunding = await prisma.funding.aggregate({
		_sum: {
			amount: true
		},
		where: {
			status: "COMPLETED"
		}
	});

	// Fetch recent projects
	const recentProjects = await prisma.project.findMany({
		take: 5,
		orderBy: { createdAt: "desc" },
		include: {
			user: {
				select: {
					name: true,
					image: true
				}
			}
		}
	});

	// Fetch recent users
	const recentUsers = await prisma.user.findMany({
		take: 5,
		// orderBy: { createdAt: "desc" },
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			role: true,
			// createdAt: true
		}
	});

	// Fetch funding overview
	const fundingOverview = await prisma.funding.groupBy({
		by: ['status'],
		_sum: {
			amount: true
		}
	});

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">{session && session.user.name ? `Welcome, ${session.user?.name.split(" ")[0]}` : "Dashoard"}</h1>

			<DashboardStats
				projectCount={projectCount}
				userCount={userCount}
				pendingProjects={pendingProjects}
				totalFunding={totalFunding._sum.amount || 0}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<RecentProjects projects={recentProjects} />
				<RecentUsers users={recentUsers} />
			</div>

			<FundingOverview fundingData={fundingOverview} />
		</div>
	);
}
