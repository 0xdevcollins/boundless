import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// This endpoint returns statistics about a user's contributions
export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user.id;

		// Get vote count
		const votesCount = await prisma.vote.count({
			where: { userId },
		});

		// Get comment count
		const commentsCount = await prisma.comment.count({
			where: { userId },
		});

		// Get ongoing votes (projects still in PENDING validation)
		const ongoingVotedProjects = await prisma.vote.count({
			where: {
				userId,
				project: {
					ideaValidation: "PENDING",
				},
			},
		});

		// Get completed votes (projects that are VALIDATED or REJECTED)
		const completedVotedProjects = await prisma.vote.count({
			where: {
				userId,
				project: {
					OR: [{ ideaValidation: "VALIDATED" }, { ideaValidation: "REJECTED" }],
				},
			},
		});

		// Get successful projects (VALIDATED) the user voted on
		const successfulProjects = await prisma.vote.count({
			where: {
				userId,
				project: {
					ideaValidation: "VALIDATED",
				},
			},
		});

		// Get rejected projects the user voted on
		const rejectedProjects = await prisma.vote.count({
			where: {
				userId,
				project: {
					ideaValidation: "REJECTED",
				},
			},
		});

		// Get funded projects (those with blockchainTx) the user voted on
		const fundedProjects = await prisma.vote.count({
			where: {
				userId,
				project: {
					blockchainTx: { not: null },
				},
			},
		});

		const stats = {
			totalContributions: votesCount + commentsCount,
			votesCount,
			commentsCount,
			ongoingVotes: ongoingVotedProjects,
			completedVotes: completedVotedProjects,
			successfulProjects,
			rejectedProjects,
			fundedProjects,
		};

		return NextResponse.json(stats);
	} catch (error) {
		console.error("Error fetching user contributions:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
