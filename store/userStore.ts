import { getUserProfile } from "@/lib/actions/user";
import { create } from "zustand";

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
	role: "USER" | "ADMIN";
}

export interface UserState {
	user: UserProfile | null;
	isLoading: boolean;
	error: string | null;
	fetchUserProfile: () => Promise<void>;
	isProjectOwner: (projectUserId: string) => boolean;
	isProjectTeamMember: (
		projectId: string,
		projectTeamMembers: {
			id: string;
			fullName: string;
			role: string;
			bio: string | null;
			profileImage: string | null;
		}[],
	) => boolean;
	reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	isLoading: false,
	error: null,

	fetchUserProfile: async () => {
		try {
			set({ isLoading: true, error: null });
			const userData = await getUserProfile();
			set({ user: userData, isLoading: false });
			return userData;
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: "Failed to fetch user profile",
				isLoading: false,
			});
			return null;
		}
	},

	isProjectOwner: (projectUserId: string) => {
		const { user } = get();
		return user?.id === projectUserId;
	},

	isProjectTeamMember: (
		projectId: string,
		projectTeamMembers: {
			id: string;
			fullName: string;
			role: string;
			bio: string | null;
			profileImage: string | null;
		}[],
	) => {
		const { user } = get();
		if (!user) return false;

		return projectTeamMembers.some((member) => member.id === user.id);
	},

	reset: () => {
		set({ user: null, isLoading: false, error: null });
	},
}));
