export interface BaseProject {
	id: number;
	title: string;
	progress: number;
	raised: string;
	goal: string;
	category: string;
	href: string;
}

export interface ProjectWithDays extends BaseProject {
	daysLeft: number;
}

export interface TrendingProject extends ProjectWithDays {
	engagementChange: string;
}

export interface CompletedProject {
	id: number;
	title: string;
	totalRaised: string;
	contributors: number;
	completionDate: string;
	category: string;
	href: string;
}

export interface ActivityDataPoint {
	name: string;
	contributions: number;
	participants: number;
}

export type ExploreFilter = "newest" | "popular" | "ending";
export type CompletedSort = "date" | "size" | "category";
