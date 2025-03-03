import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">
						Total Contributions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">$24,780</div>
					<p className="text-xs text-muted-foreground">+12% from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">Active Projects</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">7</div>
					<p className="text-xs text-muted-foreground">
						3 pending milestone approval
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">
						Successful Exits
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">12</div>
					<p className="text-xs text-muted-foreground">Total value: $3.2M</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">ROI</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">+32%</div>
					<p className="text-xs text-muted-foreground">
						Avg. across all projects
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
