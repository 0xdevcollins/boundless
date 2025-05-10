import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams, pathname } = request.nextUrl;

		// Extract the ID from the pathname (e.g., /api/projects/123/comments)
		const idMatch = pathname.match(/\/projects\/([^/]+)\/comments/);
		const projectId = idMatch?.[1];

		if (!projectId) {
			return NextResponse.json(
				{ error: "Project ID not provided or invalid" },
				{ status: 400 },
			);
		}

		const page = Number.parseInt(searchParams.get("page") || "1");
		const limit = Number.parseInt(searchParams.get("limit") || "5");

		if (Number.isNaN(page) || Number.isNaN(limit) || page < 1 || limit < 1) {
			return NextResponse.json(
				{ error: "Invalid pagination parameters" },
				{ status: 400 },
			);
		}

		const totalComments = await prisma.comment.count({
			where: {
				projectId,
				parentId: null,
			},
		});

		const totalPages = Math.ceil(totalComments / limit);

		const topLevelComments = await prisma.comment.findMany({
			where: {
				projectId,
				parentId: null,
			},
			orderBy: {
				createdAt: "desc",
			},
			skip: (page - 1) * limit,
			take: limit,
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				reactions: {
					select: {
						id: true,
						type: true,
						userId: true,
					},
				},
				_count: {
					select: {
						reactions: true,
						replies: true,
					},
				},
			},
		});

		const commentIds = topLevelComments.map((comment) => comment.id);

		const replies = await prisma.comment.findMany({
			where: {
				parentId: {
					in: commentIds,
				},
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				reactions: {
					select: {
						id: true,
						type: true,
						userId: true,
					},
				},
				_count: {
					select: {
						reactions: true,
						replies: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		const allComments = [...topLevelComments, ...replies];

		return NextResponse.json({
			comments: allComments,
			page,
			limit,
			totalComments,
			totalPages,
		});
	} catch (error) {
		console.error("Error fetching project comments:", error);
		return NextResponse.json(
			{ error: "Failed to fetch comments" },
			{ status: 500 },
		);
	}
}
