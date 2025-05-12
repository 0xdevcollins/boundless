import { authOptions } from "@/lib/auth.config";
import {
	notifyMilestoneCompleted,
	notifyMilestoneUpdated,
} from "@/lib/notifications/project";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const url = new URL(request.url);
		const pathnameParts = url.pathname.split("/");
		const projectId = pathnameParts[pathnameParts.indexOf("projects") + 1];
		const milestoneId = pathnameParts[pathnameParts.indexOf("milestones") + 1];

		if (!projectId || !milestoneId) {
			return NextResponse.json(
				{ error: "Project ID and Milestone ID are required" },
				{ status: 400 },
			);
		}

		const milestone = await prisma.milestone.findUnique({
			where: { id: milestoneId },
			include: { attachments: true },
		});

		if (!milestone) {
			return NextResponse.json(
				{ error: "Milestone not found" },
				{ status: 404 },
			);
		}

		if (milestone.projectId !== projectId) {
			return NextResponse.json(
				{ error: "Milestone does not belong to this project" },
				{ status: 400 },
			);
		}

		return NextResponse.json(milestone);
	} catch (error) {
		console.error("Error fetching milestone:", error);
		return NextResponse.json(
			{ error: "Failed to fetch milestone" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Extract projectId and milestoneId from the URL
		const pathnameParts = request.nextUrl.pathname.split("/");
		const projectId = pathnameParts[pathnameParts.indexOf("projects") + 1];
		const milestoneId = pathnameParts[pathnameParts.indexOf("milestones") + 1];

		if (!projectId || !milestoneId) {
			return NextResponse.json(
				{ error: "Project ID and Milestone ID are required" },
				{ status: 400 },
			);
		}

		const project = await prisma.project.findUnique({
			where: { id: projectId },
			include: {
				user: {
					select: { id: true, name: true },
				},
				teamMembers: {
					select: { userId: true, fullName: true },
				},
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		const isTeamMember =
			project.userId === session.user.id ||
			project.teamMembers.some((member) => member.userId === session.user.id);
		if (!isTeamMember) {
			return NextResponse.json(
				{
					error:
						"You don't have permission to update milestones for this project",
				},
				{ status: 403 },
			);
		}

		const milestone = await prisma.milestone.findUnique({
			where: { id: milestoneId },
		});

		if (!milestone) {
			return NextResponse.json(
				{ error: "Milestone not found" },
				{ status: 404 },
			);
		}

		if (milestone.projectId !== projectId) {
			return NextResponse.json(
				{ error: "Milestone does not belong to this project" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { title, description, status, dueDate, progress } = body;

		// Check if the milestone is being marked as completed
		const isCompletionUpdate =
			(status === "COMPLETED" && milestone.status !== "COMPLETED") ||
			(progress === 100 && milestone.progress !== 100);

		// Keep track of old status for notifications
		const oldStatus = milestone.status;
		const oldProgress = milestone.progress;

		const updatedMilestone = await prisma.milestone.update({
			where: { id: milestoneId },
			data: {
				title: title || milestone.title,
				description:
					description !== undefined ? description : milestone.description,
				status: status || milestone.status,
				dueDate: dueDate ? new Date(dueDate) : milestone.dueDate,
				progress: progress !== undefined ? progress : milestone.progress,
			},
		});

		// Generate notification data
		// Collect team member IDs (excluding the current user who made the update)
		const teamMemberIds = [
			project.userId,
			...project.teamMembers
				.filter((member) => member.userId !== null)
				.map((member) => member.userId as string),
		].filter((id) => id !== session.user.id);

		// Get user name who made the update
		const updaterName = session.user.name || "A team member";

		// Create milestone update notification
		const significantChange =
			status !== oldStatus ||
			(progress !== undefined && Math.abs(progress - oldProgress) >= 20);

		if (significantChange && teamMemberIds.length > 0) {
			// Notification for regular update
			await Promise.all(
				teamMemberIds.map((userId) =>
					notifyMilestoneUpdated({
						projectId,
						projectTitle: project.title,
						userId,
						milestoneTitle: title || milestone.title,
						updaterName,
					}),
				),
			);
		}

		// Special notification for milestone completion
		if (isCompletionUpdate && teamMemberIds.length > 0) {
			// Notification for completion to all team members
			await Promise.all(
				teamMemberIds.map((userId) =>
					notifyMilestoneCompleted({
						projectId,
						projectTitle: project.title,
						userId,
						milestoneTitle: title || milestone.title,
						updaterName,
					}),
				),
			);

			// Special notification for project owner if they're not the one updating
			if (project.userId !== session.user.id) {
				await notifyMilestoneCompleted({
					projectId,
					projectTitle: project.title,
					userId: project.userId,
					milestoneTitle: title || milestone.title,
					updaterName,
					isOwner: true,
				});
			}
		}

		return NextResponse.json(updatedMilestone);
	} catch (error) {
		console.error("Error updating milestone:", error);
		return NextResponse.json(
			{ error: "Failed to update milestone" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Extract route params from the URL
		const pathnameParts = request.nextUrl.pathname.split("/");
		const projectId = pathnameParts[pathnameParts.indexOf("projects") + 1];
		const milestoneId = pathnameParts[pathnameParts.indexOf("milestones") + 1];

		if (!projectId || !milestoneId) {
			return NextResponse.json(
				{ error: "Project ID and Milestone ID are required" },
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
					error:
						"You don't have permission to delete milestones for this project",
				},
				{ status: 403 },
			);
		}

		const milestone = await prisma.milestone.findUnique({
			where: { id: milestoneId },
		});

		if (!milestone) {
			return NextResponse.json(
				{ error: "Milestone not found" },
				{ status: 404 },
			);
		}

		if (milestone.projectId !== projectId) {
			return NextResponse.json(
				{ error: "Milestone does not belong to this project" },
				{ status: 400 },
			);
		}

		await prisma.milestone.delete({
			where: { id: milestoneId },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting milestone:", error);
		return NextResponse.json(
			{ error: "Failed to delete milestone" },
			{ status: 500 },
		);
	}
}
