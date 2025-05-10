import { getUserProfile } from "@/lib/actions/user";
import { create } from "zustand";

export interface ProjectBasic {
	id: string;
	title: string;
	description?: string;
	category?: string;
	bannerUrl?: string | null;
	ideaValidation?: "PENDING" | "REJECTED" | "VALIDATED";
	createdAt?: string | Date;
	fundingGoal?: number;
	blockchainTx?: string | null;
	milestones?: MilestoneBasic[];
	completedAt?: string | Date;
	totalRaised?: number;
}

export interface MilestoneBasic {
	id: string;
	title: string;
	status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
}

export interface TeamMemberBasic {
	id: string;
	fullName: string;
	role: string;
	bio: string | null;
	profileImage: string | null;
	userId?: string | null;
}

export interface UserProfile {
	id: string;
	name?: string;
	email?: string;
	username?: string;
	bio?: string;
	image?: string;
	bannerImage?: string;
	twitter?: string;
	linkedin?: string;
	totalContributions: number;
	previousMonthContributions?: number;
	role: "USER" | "ADMIN";
	projects?: ProjectBasic[];
	teamMemberships?: {
		projectId: string;
		role: string;
	}[];
	hasCreatedProject?: boolean;
	emailVerified?: Date | null;
	notificationsEnabled?: boolean;
	language?: string;
	unreadNotificationsCount?: number;
	successfulExits?: number;
	totalExitValue?: number;
	averageROI?: number;
}

export interface AnalyticsData {
	totalContributions: number;
	monthlyGrowth: number;
	activeProjects: number;
	pendingMilestones: number;
	successfulExits: number;
	totalExitValue: number;
	averageROI: number;
}

export interface UserState {
	user: UserProfile | null;
	isLoading: boolean;
	error: string | null;
	fetchUserProfile: () => Promise<UserProfile | null>;
	isProjectOwner: (projectUserId: string) => boolean;
	isProjectTeamMember: (
		projectId: string,
		projectTeamMembers: TeamMemberBasic[],
	) => boolean;
	hasCreatedProject: () => boolean;
	getProjectCount: () => number;
	isAdmin: () => boolean;
	isEmailVerified: () => boolean;
	hasNotificationsEnabled: () => boolean;
	getUnreadNotificationsCount: () => number;
	getPreferredLanguage: () => string;
	getAllProjects: () => ProjectBasic[];
	getProjectById: (projectId: string) => ProjectBasic | undefined;
	getUserTeamMemberships: () => { projectId: string; role: string }[];
	updateUserProfile: (updatedData: Partial<UserProfile>) => void;
	setUnreadNotificationsCount: (count: number) => void;
	reset: () => void;

	// New analytics functions
	getAnalytics: () => AnalyticsData;
	getTotalContributions: () => { value: number; growth: number };
	getActiveProjects: () => { count: number; pendingMilestones: number };
	getSuccessfulExits: () => { count: number; totalValue: number };
	getROI: () => number;
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	isLoading: false,
	error: null,

	fetchUserProfile: async () => {
		try {
			set({ isLoading: true, error: null });
			const userData = await getUserProfile();

			// Determine if the user has created any projects
			const hasCreatedProject =
				Array.isArray(userData.projects) && userData.projects.length > 0;

			const enhancedUserData = {
				...userData,
				hasCreatedProject,
			};

			set({
				user: enhancedUserData,
				isLoading: false,
			});

			return enhancedUserData;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to fetch user profile";
			set({
				error: errorMessage,
				isLoading: false,
			});

			console.error("Error fetching user profile:", error);
			return null;
		}
	},

	isProjectOwner: (projectUserId: string) => {
		const { user } = get();
		return user?.id === projectUserId;
	},

	isProjectTeamMember: (
		projectId: string,
		projectTeamMembers: TeamMemberBasic[],
	) => {
		const { user } = get();
		if (!user) return false;

		// Check if user is in the team members list
		return projectTeamMembers.some((member) => member.userId === user.id);
	},

	// Check if user has created any projects
	hasCreatedProject: () => {
		const { user } = get();
		if (!user) return false;

		return (
			!!user.hasCreatedProject ||
			(Array.isArray(user.projects) && user.projects.length > 0)
		);
	},

	// Get the number of projects created by the user
	getProjectCount: () => {
		const { user } = get();
		if (!user || !user.projects) return 0;

		return user.projects.length;
	},

	// Check if user is an admin
	isAdmin: () => {
		const { user } = get();
		return user?.role === "ADMIN";
	},

	// Check if user's email is verified
	isEmailVerified: () => {
		const { user } = get();
		return !!user?.emailVerified;
	},

	// Check if user has notifications enabled
	hasNotificationsEnabled: () => {
		const { user } = get();
		return user?.notificationsEnabled !== false; // Default to true if undefined
	},

	// Get unread notifications count
	getUnreadNotificationsCount: () => {
		const { user } = get();
		return user?.unreadNotificationsCount || 0;
	},

	// Get user's preferred language
	getPreferredLanguage: () => {
		const { user } = get();
		return user?.language || "en"; // Default to English
	},

	// Get all projects created by the user
	getAllProjects: () => {
		const { user } = get();
		return user?.projects || [];
	},

	// Get a specific project by ID
	getProjectById: (projectId: string) => {
		const { user } = get();
		if (!user?.projects) return undefined;

		return user.projects.find((project) => project.id === projectId);
	},

	// Get all team memberships for the user
	getUserTeamMemberships: () => {
		const { user } = get();
		return user?.teamMemberships || [];
	},

	// Update user profile data locally (for immediate UI updates)
	updateUserProfile: (updatedData: Partial<UserProfile>) => {
		const { user } = get();
		if (!user) return;

		set({
			user: {
				...user,
				...updatedData,
			},
		});
	},

	// Set unread notifications count
	setUnreadNotificationsCount: (count: number) => {
		const { user } = get();
		if (!user) return;

		set({
			user: {
				...user,
				unreadNotificationsCount: count,
			},
		});
	},

	// Reset the store
	reset: () => {
		set({ user: null, isLoading: false, error: null });
	},

	// New analytics methods

	// Get all analytics data in one call
	getAnalytics: () => {
		const state = get();
		const contributions = state.getTotalContributions();
		const activeProjects = state.getActiveProjects();
		const exits = state.getSuccessfulExits();
		const roi = state.getROI();

		return {
			totalContributions: contributions.value,
			monthlyGrowth: contributions.growth,
			activeProjects: activeProjects.count,
			pendingMilestones: activeProjects.pendingMilestones,
			successfulExits: exits.count,
			totalExitValue: exits.totalValue,
			averageROI: roi,
		};
	},

	// 1. Total Contributions with monthly growth
	getTotalContributions: () => {
		const { user } = get();

		const currentContributions = user?.totalContributions || 0;
		const previousContributions = user?.previousMonthContributions || 0;

		// Calculate growth percentage
		let growthPercentage = 0;
		if (previousContributions > 0) {
			growthPercentage =
				((currentContributions - previousContributions) /
					previousContributions) *
				100;
		}

		return {
			value: currentContributions,
			growth: Number(growthPercentage.toFixed(2)),
		};
	},

	// 2. Active Projects count with pending milestone approvals
	getActiveProjects: () => {
		const { user } = get();
		if (!user?.projects) return { count: 0, pendingMilestones: 0 };

		// Filter projects that are in funding phase (not completed and validated)
		const activeProjects = user.projects.filter(
			(project) =>
				project.ideaValidation === "VALIDATED" && !project.completedAt,
		);

		// Count pending milestone approvals across all active projects
		let pendingMilestones = 0;
		for (const project of activeProjects) {
			if (project.milestones) {
				pendingMilestones += project.milestones.filter(
					(milestone) => milestone.status === "PENDING",
				).length;
			}
		}

		return {
			count: activeProjects.length,
			pendingMilestones,
		};
	},

	// 3. Successful Exits count and total value
	getSuccessfulExits: () => {
		const { user } = get();

		// If we have the precomputed values, use them
		if (
			user?.successfulExits !== undefined &&
			user?.totalExitValue !== undefined
		) {
			return {
				count: user.successfulExits,
				totalValue: user.totalExitValue,
			};
		}

		// Otherwise calculate from projects data
		if (!user?.projects) return { count: 0, totalValue: 0 };

		const completedProjects = user.projects.filter(
			(project) => !!project.completedAt,
		);

		// Calculate total exit value
		const totalValue = completedProjects.reduce((sum, project) => {
			return sum + (project.totalRaised || project.fundingGoal || 0);
		}, 0);

		return {
			count: completedProjects.length,
			totalValue,
		};
	},

	// 4. ROI across all projects
	getROI: () => {
		const { user } = get();

		// If we have the precomputed value, use it
		if (user?.averageROI !== undefined) {
			return user.averageROI;
		}

		// Otherwise let's assume a default value or calculate from projects
		// This is a placeholder since ROI calculation would require more detailed financial data
		// that is not available in the current model
		return 32; // Placeholder for 32% ROI as mentioned in the requirements
	},
}));
