"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Filter from "../shared/filter";
import SortByFilter from "../shared/sort-by-filter";
import SearchBar from "../shared/search-bar";
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
	searchComponent?: React.ReactNode;
}

export function ContributionFilters({
	activeTab,
	setActiveTab,
	// searchQuery,
	setSearchQuery,
	sortOption,
	setSortOption,
	categoryFilter,
	setCategoryFilter,
	categories,
	searchComponent,
}: ContributionFiltersProps) {
	// Add "All" to the categories list for the FilterByCategory component
	const categoriesWithAll = ["Category (All)", ...categories];

	// Map the internal value "all" to display value "All" if needed
	const selectedCategory =
		categoryFilter === "all" ? "Category (All)" : categoryFilter;

	// Define sort options based on the active tab
	const sortOptions = [
		{ value: "newest", label: "Newest First" },
		{ value: "oldest", label: "Oldest First" },
		{ value: "votes-high", label: "Most Votes" },
		{ value: "votes-low", label: "Least Votes" },
		...(activeTab === "comments"
			? [
					{ value: "likes-high", label: "Most Likes" },
					{ value: "likes-low", label: "Least Likes" },
				]
			: []),
	];

	// Handler for the SearchBar's onSearch
	const handleSearch = (debouncedTerm: string) => {
		setSearchQuery(debouncedTerm);
	};

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
					{searchComponent || (
						<SearchBar
							onSearch={handleSearch}
							placeholder="Search projects..."
							className="w-full sm:w-[200px] md:w-[300px]"
							inputStyles="pl-10"
						/>
					)}

					<Filter
						categories={categoriesWithAll}
						selectedCategory={selectedCategory}
						onChange={(value: string) =>
							setCategoryFilter(value === "Category (All)" ? "all" : value)
						}
						label="Category"
						allLabel="Category (All)"
					/>

					<SortByFilter
						sortOption={sortOption}
						setSortOption={setSortOption}
						options={sortOptions}
					/>
				</div>
			</div>
		</div>
	);
}
