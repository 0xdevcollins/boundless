import type {
	ActiveProject,
	PastProject,
	SortOption,
	TabOption,
	UserComment,
} from "@/types/contributions";
import type { ValidationStatus } from "@/types/project";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatValidationStatus(
	status: ValidationStatus | null | undefined,
) {
	if (!status) return "Unknown";
	return status.charAt(0) + status.slice(1).toLowerCase();
}

export const formatAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function filterActiveProjects(
	projects: ActiveProject[],
	searchQuery: string,
	categoryFilter: string,
	activeTab: TabOption,
): ActiveProject[] {
	return projects.filter((project) => {
		if (
			searchQuery &&
			!project.name.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}
		if (categoryFilter !== "all" && project.category !== categoryFilter) {
			return false;
		}
		if (
			activeTab === "votes" &&
			project.userComments > 0 &&
			!project.userVoted &&
			!project.userRejected
		) {
			return false;
		}
		if (activeTab === "comments" && project.userComments === 0) {
			return false;
		}
		return true;
	});
}

export function filterPastProjects(
	projects: PastProject[],
	searchQuery: string,
	categoryFilter: string,
	activeTab: TabOption,
): PastProject[] {
	return projects.filter((project) => {
		if (
			searchQuery &&
			!project.name.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}
		if (categoryFilter !== "all" && project.category !== categoryFilter) {
			return false;
		}
		if (
			activeTab === "votes" &&
			project.userComments > 0 &&
			!project.userVoted &&
			!project.userRejected
		) {
			return false;
		}
		if (activeTab === "comments" && project.userComments === 0) {
			return false;
		}
		return true;
	});
}

export function filterComments(
	comments: UserComment[],
	searchQuery: string,
): UserComment[] {
	return comments.filter((comment) => {
		if (
			searchQuery &&
			!comment.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
			!comment.content.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}
		return true;
	});
}

export function sortActiveProjects(
	projects: ActiveProject[],
	sortOption: SortOption,
): ActiveProject[] {
	return [...projects].sort((a, b) => {
		if (sortOption === "newest") {
			return b.id.localeCompare(a.id);
		}
		if (sortOption === "oldest") {
			return a.id.localeCompare(b.id);
		}
		if (sortOption === "votes-high") {
			return b.currentVotes - a.currentVotes;
		}
		if (sortOption === "votes-low") {
			return a.currentVotes - b.currentVotes;
		}
		return 0;
	});
}

export function sortPastProjects(
	projects: PastProject[],
	sortOption: SortOption,
): PastProject[] {
	return [...projects].sort((a, b) => {
		if (sortOption === "newest") {
			return (
				new Date(b.completedDate).getTime() -
				new Date(a.completedDate).getTime()
			);
		}
		if (sortOption === "oldest") {
			return (
				new Date(a.completedDate).getTime() -
				new Date(b.completedDate).getTime()
			);
		}
		if (sortOption === "votes-high") {
			return b.finalVotes - a.finalVotes;
		}
		if (sortOption === "votes-low") {
			return a.finalVotes - b.finalVotes;
		}
		return 0;
	});
}

export function sortComments(
	comments: UserComment[],
	sortOption: SortOption,
): UserComment[] {
	return [...comments].sort((a, b) => {
		if (sortOption === "newest") {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}
		if (sortOption === "oldest") {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		}
		if (sortOption === "likes-high") {
			return b.likes - a.likes;
		}
		if (sortOption === "likes-low") {
			return a.likes - b.likes;
		}
		return 0;
	});
}
