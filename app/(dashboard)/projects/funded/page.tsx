"use client";

import { FundedProjectsList } from "@/components/projects/funded-projects-list";
import {
	ProjectFilters,
	type SortOption,
} from "@/components/shared/project-filters";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Trophy, Users } from "lucide-react";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function FundedProjectsPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState<SortOption>("newest");

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			{/* Hero Section */}
			<div className="relative bg-primary/5 border-b">
				<div className="container py-16">
					<div className="max-w-3xl space-y-6">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
							<Trophy className="h-4 w-4" />
							Successfully Funded
						</div>
						<h1 className="text-4xl font-bold tracking-tight">
							Funded Projects
						</h1>
						<p className="text-xl text-muted-foreground">
							Explore our collection of successfully funded projects that are
							now making an impact. These projects have reached their funding
							goals and are actively being developed.
						</p>
					</div>
				</div>
			</div>

			<div className="container py-8 space-y-8">
				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-full bg-primary/10 p-3">
								<Trophy className="h-6 w-6 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Total Funded
								</p>
								<p className="text-2xl font-bold">24</p>
							</div>
						</div>
					</Card>
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-full bg-green-500/10 p-3">
								<TrendingUp className="h-6 w-6 text-green-500" />
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Total Raised
								</p>
								<p className="text-2xl font-bold">$1.2M</p>
							</div>
						</div>
					</Card>
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-full bg-blue-500/10 p-3">
								<Users className="h-6 w-6 text-blue-500" />
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Active Projects
								</p>
								<p className="text-2xl font-bold">18</p>
							</div>
						</div>
					</Card>
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-full bg-orange-500/10 p-3">
								<Clock className="h-6 w-6 text-orange-500" />
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Avg. Time to Fund
								</p>
								<p className="text-2xl font-bold">14d</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Progress Overview */}
				<Card className="p-6">
					<h2 className="text-lg font-semibold mb-4">
						Funding Progress Overview
					</h2>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="font-medium">Overall Funding Rate</span>
								<span className="text-muted-foreground">75%</span>
							</div>
							<Progress value={75} className="h-2" />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
							<div className="space-y-1">
								<p className="text-muted-foreground">Success Rate</p>
								<p className="font-medium">68% of projects reach funding</p>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">Average Funding</p>
								<p className="font-medium">$50,000 per project</p>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">Active Backers</p>
								<p className="font-medium">2,500+ community members</p>
							</div>
						</div>
					</div>
				</Card>

				{/* Filters Section */}
				<Card className="p-6">
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Filter Projects</h2>
						<ProjectFilters
							selectedCategory={selectedCategory}
							onCategoryChange={setSelectedCategory}
							searchQuery={searchQuery}
							onSearchChange={setSearchQuery}
							sortOption={sortOption}
							onSortChange={setSortOption}
						/>
					</div>
				</Card>

				{/* Projects List */}
				<FundedProjectsList
					category={selectedCategory}
					searchQuery={searchQuery}
					sortOption={sortOption}
				/>
			</div>
		</div>
	);
}
