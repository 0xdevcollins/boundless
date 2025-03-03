import type {
	ActivityDataPoint,
	BaseProject,
	CompletedProject,
	ProjectWithDays,
	TrendingProject,
} from "@/types/project";

export const activityData: ActivityDataPoint[] = [
	{ name: "Jan", contributions: 400, participants: 250 },
	{ name: "Feb", contributions: 300, participants: 220 },
	{ name: "Mar", contributions: 600, participants: 320 },
	{ name: "Apr", contributions: 800, participants: 480 },
	{ name: "May", contributions: 1500, participants: 520 },
	{ name: "Jun", contributions: 2000, participants: 590 },
	{ name: "Jul", contributions: 2400, participants: 650 },
];

export const myProjects: ProjectWithDays[] = [
	{
		id: 1,
		title: "Decentralized Finance Platform",
		progress: 70,
		raised: "$70,000",
		goal: "$100,000",
		daysLeft: 12,
		category: "Finance",
		href: "/projects/my-projects",
	},
	{
		id: 2,
		title: "Sustainable Energy Marketplace",
		progress: 45,
		raised: "$22,500",
		goal: "$50,000",
		daysLeft: 18,
		category: "Environment",
		href: "/projects/my-projects",
	},
	{
		id: 3,
		title: "Community-Owned Media Network",
		progress: 90,
		raised: "$180,000",
		goal: "$200,000",
		daysLeft: 3,
		category: "Media",
		href: "/projects/my-projects",
	},
];

export const trendingProjects: TrendingProject[] = [
	{
		id: 1,
		title: "AI-Powered Healthcare Assistant",
		progress: 85,
		raised: "$425,000",
		goal: "$500,000",
		engagementChange: "+27%",
		category: "Healthcare",
		daysLeft: 21,
		href: "/projects/explore",
	},
	{
		id: 2,
		title: "Decentralized Social Network",
		progress: 62,
		raised: "$310,000",
		goal: "$500,000",
		engagementChange: "+18%",
		category: "Social",
		daysLeft: 14,
		href: "/projects/explore",
	},
	{
		id: 3,
		title: "Regenerative Agriculture Platform",
		progress: 54,
		raised: "$108,000",
		goal: "$200,000",
		engagementChange: "+14%",
		category: "Agriculture",
		daysLeft: 30,
		href: "/projects/explore",
	},
];

export const exploreProjects: BaseProject[] = [
	{
		id: 4,
		title: "Open Source Educational Platform",
		progress: 35,
		raised: "$70,000",
		goal: "$200,000",
		category: "Education",
		href: "/projects/explore",
	},
	{
		id: 5,
		title: "Community Art Initiative",
		progress: 25,
		raised: "$12,500",
		goal: "$50,000",
		category: "Art",
		href: "/projects/explore",
	},
	{
		id: 6,
		title: "Mental Health Resources Network",
		progress: 45,
		raised: "$90,000",
		goal: "$200,000",
		category: "Health",
		href: "/projects/explore",
	},
];

export const completedProjects: CompletedProject[] = [
	{
		id: 1,
		title: "Community Solar Initiative",
		totalRaised: "$750,000",
		contributors: 1253,
		completionDate: "Jan 15, 2024",
		category: "Energy",
		href: "/projects/funded",
	},
	{
		id: 2,
		title: "Open Source Governance Tools",
		totalRaised: "$320,000",
		contributors: 784,
		completionDate: "Feb 02, 2024",
		category: "Governance",
		href: "/projects/funded",
	},
	{
		id: 3,
		title: "Urban Vertical Farming Network",
		totalRaised: "$1,200,000",
		contributors: 3214,
		completionDate: "Feb 10, 2024",
		category: "Agriculture",
		href: "/projects/funded",
	},
];
