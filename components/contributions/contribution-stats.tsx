import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ContributionStats as StatsType } from "@/types/contributions";

interface ContributionStatsProps {
	stats: StatsType;
}

export function ContributionStats({ stats }: ContributionStatsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl">{stats.totalContributions}</CardTitle>
					<CardDescription>Total Contributions</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between text-sm">
						<span>{stats.votesCount} Votes</span>
						<span>{stats.commentsCount} Comments</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl">{stats.ongoingVotes}</CardTitle>
					<CardDescription>Ongoing Votes</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="text-sm">
						<span>{stats.completedVotes} Completed</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl">{stats.successfulProjects}</CardTitle>
					<CardDescription>Successful Projects</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="text-sm">
						<span>{stats.rejectedProjects} Rejected</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl">{stats.fundedProjects}</CardTitle>
					<CardDescription>Funded Projects</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="text-sm">
						<span>You&apos;ve helped fund {stats.fundedProjects} projects</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
