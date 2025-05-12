import { authOptions } from "@/lib/auth.config";
import {
	notifyNewVote,
	notifyProjectValidated,
	notifyVoteMilestone,
} from "@/lib/notifications/project";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

const VOTE_THRESHOLDS = [10, 25, 50, 100];

export async function POST(request: Request) {
	try {
		const url = new URL(request.url);
		const pathParts = url.pathname.split("/");
		const id = pathParts[pathParts.length - 1];
		const session = await getServerSession(authOptions);

		if (!session || !session.user || !session.user.id) {
			return NextResponse.json(
				{ error: "You must be logged in to vote" },
				{ status: 401 },
			);
		}

		const userId = session.user.id;
		const projectId = id;

		// Check if project exists
		const project = await prisma.project.findUnique({
			where: { id: projectId },
			include: {
				user: {
					select: { id: true, name: true },
				},
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Check if user has already voted
		const existingVote = await prisma.vote.findUnique({
			where: {
				projectId_userId: {
					projectId,
					userId,
				},
			},
		});

		if (existingVote) {
			// User has already voted, so remove their vote
			await prisma.vote.delete({
				where: {
					id: existingVote.id,
				},
			});

			const count = await prisma.vote.count({
				where: { projectId },
			});

			return NextResponse.json({ success: true, voted: false, count });
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

		// Get updated vote count
		const count = await prisma.vote.count({
			where: { projectId },
		});

		// Notify project creator about the new vote
		if (project.user.id !== userId) {
			const voter = await prisma.user.findUnique({
				where: { id: userId },
				select: { name: true },
			});

			await notifyNewVote({
				projectId,
				projectTitle: project.title,
				userId: project.user.id,
				voterName: voter?.name || "Someone",
				voteCount: count,
			});
		}

		// Check if a vote threshold has been reached
		for (const threshold of VOTE_THRESHOLDS) {
			if (count === threshold) {
				await notifyVoteMilestone({
					projectId,
					projectTitle: project.title,
					userId: project.user.id,
					threshold,
				});

				// If the project reaches a significant vote count and is still pending validation,
				// automatically validate it (optional feature)
				if (threshold >= 50 && project.ideaValidation === "PENDING") {
					await prisma.project.update({
						where: { id: projectId },
						data: { ideaValidation: "VALIDATED" },
					});

					// Notify about automatic validation
					await notifyProjectValidated({
						projectId,
						projectTitle: project.title,
						userId: project.user.id,
						voteCount: threshold,
					});
				}
			}
		}

		return NextResponse.json({ success: true, voted: true, count });
	} catch (error) {
		console.error("Error voting for project:", error);
		return NextResponse.json(
			{ error: "Failed to register vote" },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const pathParts = url.pathname.split("/");
		const id = pathParts[pathParts.length - 1];
		const projectId = id;

		// Get vote count
		const count = await prisma.vote.count({
			where: { projectId },
		});

		// Check if current user has voted
		const session = await getServerSession(authOptions);
		let hasVoted = false;

		if (session?.user?.id) {
			const vote = await prisma.vote.findUnique({
				where: {
					projectId_userId: {
						projectId,
						userId: session.user.id,
					},
				},
			});

			hasVoted = !!vote;
		}

		return NextResponse.json({ count, hasVoted });
	} catch (error) {
		console.error("Error getting vote data:", error);
		return NextResponse.json(
			{ error: "Failed to get vote data" },
			{ status: 500 },
		);
	}
}
