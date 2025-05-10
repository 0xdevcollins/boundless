import { z } from "zod";

export const projectFormSchema = z.object({
	userId: z.string().optional(),
	title: z.string().min(1, "Title is required"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	fundingGoal: z.number().min(1, "Funding goal must be greater than 0"),
	category: z.string().min(1, "Category is required"),
	bannerImage: z.union([z.instanceof(File), z.string()]).optional(),
	profileImage: z.union([z.instanceof(File), z.string()]).optional(),
	walletAddress: z.string().optional(),
	// Team members
	teamMembers: z.array(
		z.object({
			userId: z.string(),
			role: z.string(),
			user: z.object({
				id: z.string(),
				name: z.string(),
				image: z.string().optional(),
				email: z.string(),
				github: z.string().optional(),
				twitter: z.string().optional(),
				linkedin: z.string().optional(),
			}).optional(),
		})
	),
	// Milestones
	milestones: z.array(
		z.object({
			title: z.string().min(1, "Title is required"),
			description: z.string().min(10, "Description must be at least 10 characters"),
			dueDate: z.string().optional(),
			color: z.string().optional(),
			progress: z.number().min(0).max(100).default(0),
		})
	),
	// Documents
	pitchDeck: z.union([
		z.instanceof(File),
		z.string().url(),
		z.string().min(1).optional(),
		z.undefined()
	]).optional(),
	whitepaper: z.union([
		z.instanceof(File),
		z.string().url(),
		z.string().min(1).optional(),
		z.undefined()
	]).optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export type Step = "basic" | "team" | "milestones" | "documents" | "review";

export const categories = [
	{ id: "tech", name: "Technology" },
	{ id: "art", name: "Art & Creative" },
	{ id: "community", name: "Community" },
	{ id: "education", name: "Education" },
];

export const steps: { id: Step; title: string; description: string }[] = [
	{
		id: "basic",
		title: "Basic Information",
		description: "Project details and funding goal",
	},
	{
		id: "team",
		title: "Team Information",
		description: "Add your team members",
	},
	{
		id: "milestones",
		title: "Project Milestones",
		description: "Define your project roadmap",
	},
	{
		id: "documents",
		title: "Documents",
		description: "Upload pitch deck and whitepaper",
	},
	{
		id: "review",
		title: "Review",
		description: "Review and submit your project",
	},
]; 
