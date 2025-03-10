"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContributionFilters } from "@/components/contributions/contribution-filters";
import { ActiveContributions } from "@/components/contributions/active-contribution";
import { PastContributions } from "@/components/contributions/past-contributions";
import { UserComments } from "@/components/contributions/user-comments";
import { CallToAction } from "@/components/contributions/call-to-action";
import { CommentEditModal } from "@/components/contributions/comment-edit-modal";
import { DeleteConfirmationDialog } from "@/components/contributions/delete-confirmation-dialog";
import { LoadingState } from "@/components/contributions/loading-state";
import type {
	ActiveProject,
	ContributionStats,
	PastProject,
	SortOption,
	TabOption,
	UserComment,
} from "@/types/contributions";
import {
	fetchActiveProjects,
	fetchCategories,
	fetchContributionStats,
	fetchPastProjects,
	fetchUserComments,
	editComment as apiEditComment,
	deleteComment as apiDeleteComment,
} from "@/lib/actions/services";
import {
	sortActiveProjects,
	sortComments,
	sortPastProjects,
} from "@/lib/utils";
import { ContributionStats as ContributionStatsComponent } from "@/components/contributions/contribution-stats";

export default function MyContributionsPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<TabOption>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState<SortOption>("newest");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [categories, setCategories] = useState<string[]>([]);

	// Data states - Fix type definitions
	const [stats, setStats] = useState<ContributionStats | null>(null);
	const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([]);
	const [pastProjects, setPastProjects] = useState<PastProject[]>([]);
	const [comments, setComments] = useState<UserComment[]>([]);

	// Loading states
	const [isLoadingStats, setIsLoadingStats] = useState(true);
	const [isLoadingActive, setIsLoadingActive] = useState(true);
	const [isLoadingPast, setIsLoadingPast] = useState(true);
	const [isLoadingComments, setIsLoadingComments] = useState(true);

	// Modal states
	const [commentToEdit, setCommentToEdit] = useState<UserComment | null>(null);
	const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

	// Fetch data on initial load
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch categories
				const categoriesData = await fetchCategories();
				setCategories(categoriesData);

				// Fetch stats
				setIsLoadingStats(true);
				const statsData = await fetchContributionStats();
				setStats(statsData);
				setIsLoadingStats(false);

				// Fetch active projects
				setIsLoadingActive(true);
				const activeData = await fetchActiveProjects();
				setActiveProjects(activeData);
				setIsLoadingActive(false);

				// Fetch past projects
				setIsLoadingPast(true);
				const pastData = await fetchPastProjects();
				setPastProjects(pastData);
				setIsLoadingPast(false);

				// Fetch comments
				setIsLoadingComments(true);
				const commentsData = await fetchUserComments();
				setComments(commentsData);
				setIsLoadingComments(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				toast.error("Error", {
					description: "Failed to load your contributions. Please try again.",
				});
			}
		};

		fetchData();
	}, []);

	// Fetch data when category filter changes
	useEffect(() => {
		const fetchFilteredData = async () => {
			try {
				if (activeTab === "all" || activeTab === "votes") {
					// Fetch active projects with category filter
					setIsLoadingActive(true);
					const activeData = await fetchActiveProjects(categoryFilter);
					setActiveProjects(activeData);
					setIsLoadingActive(false);

					// Fetch past projects with category filter
					setIsLoadingPast(true);
					const pastData = await fetchPastProjects(categoryFilter);
					setPastProjects(pastData);
					setIsLoadingPast(false);
				}
			} catch (error) {
				console.error("Error fetching filtered data:", error);
				toast.error("Error", {
					description: "Failed to load filtered data. Please try again.",
				});
			}
		};

		fetchFilteredData();
	}, [categoryFilter, activeTab]);

	// Fetch comments when search query changes
	useEffect(() => {
		const fetchFilteredComments = async () => {
			if (activeTab === "all" || activeTab === "comments") {
				try {
					setIsLoadingComments(true);
					const commentsData = await fetchUserComments(searchQuery);
					setComments(commentsData);
					setIsLoadingComments(false);
				} catch (error) {
					console.error("Error fetching comments:", error);
					toast.error("Error", {
						description: "Failed to load comments. Please try again.",
					});
				}
			}
		};

		// Debounce search to avoid too many requests
		const debounceTimeout = setTimeout(() => {
			fetchFilteredComments();
		}, 500);

		return () => clearTimeout(debounceTimeout);
	}, [searchQuery, activeTab]);

	// Sort data based on selected option
	const sortedActiveProjects = activeProjects
		? sortActiveProjects(activeProjects, sortOption)
		: [];
	const sortedPastProjects = pastProjects
		? sortPastProjects(pastProjects, sortOption)
		: [];
	const sortedComments = comments ? sortComments(comments, sortOption) : [];

	// Navigation and action handlers
	const navigateToProject = (projectId: string) => {
		router.push(`/projects/${projectId}`);
	};

	// Fix the type to match what UserComments component expects
	const handleEditComment = (commentId: string) => {
		const comment = comments.find((c) => c.id === commentId);
		if (comment) {
			setCommentToEdit(comment);
		}
	};

	const handleDeleteComment = (commentId: string) => {
		setCommentToDelete(commentId);
	};

	const saveEditedComment = async (id: string, content: string) => {
		try {
			await apiEditComment(id, content);

			// Update local state
			setComments((prevComments) =>
				prevComments.map((comment) =>
					comment.id === id ? { ...comment, content } : comment,
				),
			);

			toast.success("Success", {
				description: "Comment updated successfully",
			});
		} catch (error) {
			console.error("Error updating comment:", error);
			toast.error("Error", {
				description: "Failed to update comment. Please try again.",
			});
			throw error; // Re-throw to handle in the modal
		}
	};

	const confirmDeleteComment = async () => {
		if (!commentToDelete) return;

		try {
			await apiDeleteComment(commentToDelete);

			// Update local state
			setComments((prevComments) =>
				prevComments.filter((comment) => comment.id !== commentToDelete),
			);

			toast.success("Success", {
				description: "Comment deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting comment:", error);
			toast.error("Error", {
				description: "Failed to delete comment. Please try again.",
			});
			throw error; // Re-throw to handle in the dialog
		}
	};

	return (
		<div className="container mx-auto py-8 max-w-7xl">
			<h1 className="text-3xl font-bold mb-6">My Contributions</h1>

			{/* Summary Section */}
			{isLoadingStats ? (
				<LoadingState type="stats" />
			) : stats ? (
				<ContributionStatsComponent stats={stats} />
			) : null}

			{/* Tabs and Filters */}
			<ContributionFilters
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				sortOption={sortOption}
				setSortOption={setSortOption}
				categoryFilter={categoryFilter}
				setCategoryFilter={setCategoryFilter}
				categories={categories}
			/>

			{/* Active Contributions Section */}
			{(activeTab === "all" || activeTab === "votes") && (
				<>
					<h2 className="text-2xl font-semibold mb-4">Ongoing Contributions</h2>
					{isLoadingActive ? (
						<LoadingState type="cards" count={3} />
					) : (
						<ActiveContributions
							projects={sortedActiveProjects}
							navigateToProject={navigateToProject}
						/>
					)}
				</>
			)}

			{/* Past Contributions Section */}
			{(activeTab === "all" || activeTab === "votes") && (
				<>
					<h2 className="text-2xl font-semibold mb-4">Past Contributions</h2>
					{isLoadingPast ? (
						<LoadingState type="table" count={4} />
					) : (
						<PastContributions
							projects={sortedPastProjects}
							navigateToProject={navigateToProject}
						/>
					)}
				</>
			)}

			{/* Comments Section */}
			{(activeTab === "all" || activeTab === "comments") && (
				<>
					<h2 className="text-2xl font-semibold mb-4">My Comments</h2>
					{isLoadingComments ? (
						<LoadingState type="comments" count={3} />
					) : (
						<UserComments
							comments={sortedComments}
							navigateToProject={navigateToProject}
							handleEditComment={handleEditComment}
							handleDeleteComment={handleDeleteComment}
						/>
					)}
				</>
			)}

			{/* Call-to-Action Section */}
			<CallToAction />

			{/* Modals */}
			<CommentEditModal
				comment={commentToEdit}
				isOpen={!!commentToEdit}
				onClose={() => setCommentToEdit(null)}
				onSave={saveEditedComment}
			/>

			<DeleteConfirmationDialog
				isOpen={!!commentToDelete}
				onClose={() => setCommentToDelete(null)}
				onConfirm={confirmDeleteComment}
			/>
		</div>
	);
}
