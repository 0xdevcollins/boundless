"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function voteForProject(projectId: string) {
	try {
		// Get the session using your authOptions
		const session = await getServerSession(authOptions);

		// Check if user is authenticated
		if (!session || !session.user || !session.user.id) {
			return { success: false, error: "You must be logged in to vote" };
		}

		const userId = session.user.id;

		// Check if user has already voted for this project
		const existingVote = await prisma.vote.findUnique({
			where: {
				projectId_userId: {
					projectId,
					userId,
				},
			},
		});

		if (existingVote) {
			// User has already voted, so remove their vote (toggle functionality)
			await prisma.vote.delete({
				where: {
					id: existingVote.id,
				},
			});

			revalidatePath(`/projects/${projectId}`);
			return {
				success: true,
				voted: false,
				count: await getVoteCount(projectId),
			};
		}

		// Create a new vote
		await prisma.vote.create({
			data: {
				project: {
					connect: { id: projectId },
				},
				user: {
					connect: { id: userId },
				},
			},
		});

		revalidatePath(`/projects/${projectId}`);
		return { success: true, voted: true, count: await getVoteCount(projectId) };
	} catch (error) {
		console.error("Error voting for project:", error);
		return { success: false, error: "Failed to register vote" };
	}
}

export async function getVoteCount(projectId: string): Promise<number> {
	const count = await prisma.vote.count({
		where: {
			projectId,
		},
	});

	return count;
}

export async function hasUserVoted(projectId: string): Promise<boolean> {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user || !session.user.id) {
			return false;
		}

		const userId = session.user.id;

		const vote = await prisma.vote.findUnique({
			where: {
				projectId_userId: {
					projectId,
					userId,
				},
			},
		});

		return !!vote;
	} catch {
		return false;
	}
}
