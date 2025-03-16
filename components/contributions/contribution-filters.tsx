"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SortOption, TabOption } from "@/types/contributions";
import { Search } from "lucide-react";

interface ContributionFiltersProps {
	activeTab: TabOption;
	setActiveTab: (tab: TabOption) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	sortOption: SortOption;
	setSortOption: (option: SortOption) => void;
	categoryFilter: string;
	setCategoryFilter: (category: string) => void;
	categories: string[];
}

export function ContributionFilters({
	activeTab,
	setActiveTab,
	searchQuery,
	setSearchQuery,
	sortOption,
	setSortOption,
	categoryFilter,
	setCategoryFilter,
	categories,
}: ContributionFiltersProps) {
	return (
		<div className="mb-8">
			<div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
				<Tabs
					defaultValue={activeTab}
					className="w-full md:w-auto"
					onValueChange={(value) => setActiveTab(value as TabOption)}
				>
					<TabsList>
						<TabsTrigger value="all">All Contributions</TabsTrigger>
						<TabsTrigger value="votes">Votes</TabsTrigger>
						<TabsTrigger value="comments">Comments</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="flex flex-col sm:flex-row gap-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search projects..."
							className="pl-8 w-full sm:w-[200px] md:w-[300px]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Select value={categoryFilter} onValueChange={setCategoryFilter}>
						<SelectTrigger className="w-full sm:w-[150px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={sortOption}
						onValueChange={(value) => setSortOption(value as SortOption)}
					>
						<SelectTrigger className="w-full sm:w-[150px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
							<SelectItem value="votes-high">Most Votes</SelectItem>
							<SelectItem value="votes-low">Least Votes</SelectItem>
							{activeTab === "comments" && (
								<>
									<SelectItem value="likes-high">Most Likes</SelectItem>
									<SelectItem value="likes-low">Least Likes</SelectItem>
								</>
							)}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
