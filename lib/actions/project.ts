import type { ValidationStatus } from "@/types/project";

export type Project = {
	id: string;
	userId: string;
	title: string;
	description: string;
	fundingGoal: number;
	category: string;
	bannerUrl: string | null;
	profileUrl: string | null;
	blockchainTx: string | null;
	ideaValidation: ValidationStatus;
	createdAt: string;
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
	votes: {
		id: string;
		userId: string;
	}[];
	_count: {
		votes: number;
		teamMembers?: number;
	};
	teamMembers?: {
		id: string;
		fullName: string;
		role: string;
		bio: string | null;
		profileImage: string | null;
		github: string | null;
		twitter: string | null;
		discord: string | null;
		linkedin: string | null;
		userId: string | null;
	}[];
};

export async function fetchProjects(forUser?: boolean): Promise<Project[]> {
	try {
		const response = await fetch("/api/projects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ forUser }),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch projects");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
}

export async function fetchProjectById(id: string): Promise<Project> {
	try {
		const response = await fetch(`/api/projects/${id}`);

		if (response.status === 404) {
			throw new Error("Project not found");
		}

		if (!response.ok) {
			throw new Error("Failed to fetch project");
		}

		return await response.json();
	} catch (error) {
		console.error(`Error fetching project with ID ${id}:`, error);
		throw error;
	}
}
