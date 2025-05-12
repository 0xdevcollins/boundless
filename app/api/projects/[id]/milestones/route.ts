import { authOptions } from "@/lib/auth.config";
import { notifyNewMilestones } from "@/lib/notifications/project";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

// Helper to extract projectId from pathname
function extractProjectId(pathname: string) {
	const parts = pathname.split("/");
	return parts[parts.indexOf("projects") + 1];
}

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const projectId = extractProjectId(request.nextUrl.pathname);
		if (!projectId) {
			return NextResponse.json(
				{ error: "Project ID is required" },
				{ status: 400 },
			);
		}

		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});
		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		const milestones = await prisma.milestone.findMany({
			where: { projectId },
			include: { attachments: true },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(milestones);
	} catch (error) {
		console.error("Error fetching milestones:", error);
		return NextResponse.json(
			{ error: "Failed to fetch milestones" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const projectId = extractProjectId(request.nextUrl.pathname);
		if (!projectId) {
			return NextResponse.json(
				{ error: "Project ID is required" },
				{ status: 400 },
			);
		}

		const project = await prisma.project.findUnique({
			where: { id: projectId },
			include: {
				teamMembers: {
					where: { userId: session.user.id },
				},
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		const isTeamMember =
			project.userId === session.user.id || project.teamMembers.length > 0;
		if (!isTeamMember) {
			return NextResponse.json(
				{
					error: "You don't have permission to add milestones to this project",
				},
				{ status: 403 },
			);
		}

		const body = await request.json();
		const { milestones } = body;

		if (!Array.isArray(milestones)) {
			return NextResponse.json(
				{ error: "Milestones must be an array" },
				{ status: 400 },
			);
		}

		const createdMilestones = await Promise.all(
			milestones.map(async (milestone) => {
				const { title, description, dueDate, progress, color } = milestone;

				if (!title) {
					throw new Error("Title is required for each milestone");
				}

				return prisma.milestone.create({
					data: {
						title,
						description: description || "",
						dueDate: dueDate ? new Date(dueDate) : null,
						progress: progress || 0,
						color: color || null,
						projectId,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				});
			}),
		);

		// Notify team members about new milestones
		if (createdMilestones.length > 0) {
			// Get project details for notification
			const projectDetails = await prisma.project.findUnique({
				where: { id: projectId },
				select: {
					title: true,
					userId: true,
					teamMembers: {
						select: {
							userId: true,
						},
					},
				},
			});

			if (projectDetails) {
				// Collect all team member IDs who should receive notifications
				const teamMemberIds = [
					projectDetails.userId,
					...projectDetails.teamMembers
						.filter((member) => member.userId !== null)
						.map((member) => member.userId as string),
				];

				// Remove duplicates and the current user
				const uniqueRecipients = [...new Set(teamMemberIds)].filter(
					(id) => id !== session.user.id,
				);

				// Create notifications for each team member
				await Promise.all(
					uniqueRecipients.map(async (userId) => {
						await notifyNewMilestones({
							projectId,
							projectTitle: projectDetails.title,
							userId,
							milestones: createdMilestones.map((m) => ({
								title: m.title,
								description: m.description,
							})),
						});
					}),
				);
			}
		}

		return NextResponse.json(createdMilestones, { status: 201 });
	} catch (error) {
		console.error("Error creating milestones:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to create milestones",
			},
			{ status: 500 },
		);
	}
}
