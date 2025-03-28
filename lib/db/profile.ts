import { prisma } from "@/lib/prisma";

export async function getUserProfile(userId: string) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			username: true,
			name: true,
			bio: true,
			image: true,
			bannerImage: true,
			twitter: true,
			linkedin: true,
			totalContributions: true,
			_count: {
				select: {
					Vote: true,
					projects: true,
				},
			},
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	return {
		...user,
		votes: user._count.Vote,
		fundedProjects: user._count.projects,
	};
}

export async function updateUserProfile(
	userId: string,
	data: {
		username?: string;
		name?: string;
		bio?: string;
		image?: string;
		bannerImage?: string;
		twitter?: string;
		linkedin?: string;
	},
) {
	const user = await prisma.user.update({
		where: { id: userId },
		data: {
			...data,
			// Ensure username is unique if provided
			...(data.username && {
				username: data.username,
			}),
		},
		select: {
			id: true,
			username: true,
			name: true,
			bio: true,
			image: true,
			bannerImage: true,
			twitter: true,
			linkedin: true,
			totalContributions: true,
			_count: {
				select: {
					Vote: true,
					projects: true,
				},
			},
		},
	});

	return {
		...user,
		votes: user._count.Vote,
		fundedProjects: user._count.projects,
	};
}
