"use client";

import { categories } from "@/components/project-form/types";
import Filter from "./filter";
import SearchBar from "./search-bar";
import SortByFilter from "./sort-by-filter";

export type SortOption = "newest" | "oldest" | "popular" | "ending";

interface ProjectFiltersProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	sortOption: SortOption;
	onSortChange: (option: SortOption) => void;
}

const sortOptions = [
	{ value: "newest", label: "Newest First" },
	{ value: "oldest", label: "Oldest First" },
	{ value: "popular", label: "Most Popular" },
	{ value: "ending", label: "Ending Soon" },
];

export function ProjectFilters({
	selectedCategory,
	onCategoryChange,
	onSearchChange,
	sortOption,
	onSortChange,
}: ProjectFiltersProps) {
	// Convert categories array to just the IDs for the filter
	const categoryIds = categories.map((cat) => cat.id);

	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-6">
			<div className="flex-1">
				<SearchBar
					onSearch={onSearchChange}
					placeholder="Search projects..."
					className="w-full"
				/>
			</div>
			<div className="flex gap-4">
				<Filter
					categories={categoryIds}
					selectedCategory={selectedCategory}
					onChange={onCategoryChange}
					label="Category"
				/>
				<SortByFilter
					sortOption={sortOption}
					setSortOption={onSortChange}
					options={sortOptions}
				/>
			</div>
		</div>
	);
}
