import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status"); // 'active' or 'past'
		const category = searchParams.get("category");
		const userId = session.user.id;

		// Define where conditions based on status
		// Create a properly typed where condition
		const whereCondition: Prisma.VoteFindManyArgs["where"] = {
			userId,
		};

		if (status === "active") {
			whereCondition.project = {
				ideaValidation: "PENDING",
				...(category && category !== "all" ? { category } : {}),
			};
		} else if (status === "past") {
			whereCondition.project = {
				OR: [{ ideaValidation: "VALIDATED" }, { ideaValidation: "REJECTED" }],
				...(category && category !== "all" ? { category } : {}),
			};
		} else if (category && category !== "all") {
			whereCondition.project = { category };
		}

		// Get votes with project details
		const votes = await prisma.vote.findMany({
			where: whereCondition,
			include: {
				project: {
					include: {
						_count: {
							select: {
								votes: true,
								comments: true,
							},
						},
						comments: {
							where: {
								userId,
							},
							select: {
								id: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const transformedData = votes.map((vote) => {
			const project = vote.project;
			const userComments = project.comments.length;

			if (project.ideaValidation === "PENDING") {
				// Active project format
				return {
					id: project.id,
					name: project.title,
					category: project.category,
					currentVotes: project._count.votes,
					requiredVotes: 1000, // This should be a configurable value
					userVoted: true,
					userComments,
					timeLeft: "N/A", // You might calculate this based on creation date
					image:
						project.profileUrl ||
						project.bannerUrl ||
						"/placeholder.svg?height=100&width=100",
				};
			}

			// Past project format
			return {
				id: project.id,
				name: project.title,
				category: project.category,
				finalVotes: project._count.votes,
				requiredVotes: 1000, // This should be a configurable value
				passed: project.ideaValidation === "VALIDATED",
				userVoted: true,
				userComments,
				completedDate: project.createdAt.toISOString(),
				funded: !!project.blockchainTx,
			};
		});

		return NextResponse.json(transformedData);
	} catch (error) {
		console.error("Error fetching user votes:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
