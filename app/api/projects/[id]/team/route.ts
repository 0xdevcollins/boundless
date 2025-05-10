import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const teamMemberSchema = z.object({
	userId: z.string(),
	role: z.string(),
	fullName: z.string(),
});

const requestSchema = z.object({
	teamMembers: z.array(teamMemberSchema),
});

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const projectId = id;

		// Validate request body
		const body = await request.json();
		const validatedData = requestSchema.parse(body);

		// Check if project exists and user has access
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Create team members
		const teamMembers = await Promise.all(
			validatedData.teamMembers.map(async (member) => {
				return prisma.teamMember.create({
					data: {
						userId: member.userId,
						role: member.role,
						fullName: member.fullName,
						projectId,
					},
				});
			}),
		);

		return NextResponse.json({ teamMembers });
	} catch (error) {
		console.error("[PROJECT_TEAM_POST]", error);
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Invalid request data" },
				{ status: 400 },
			);
		}
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const projectId = id;

		// Check if project exists and user has access
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Get team members
		const teamMembers = await prisma.teamMember.findMany({
			where: {
				projectId,
			},
			include: {
				user: true,
			},
		});

		return NextResponse.json({ teamMembers });
	} catch (error) {
		console.error("[PROJECT_TEAM_GET]", error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const projectId = id;
		const { searchParams } = new URL(request.url);
		const teamMemberId = searchParams.get("teamMemberId");

		if (!teamMemberId) {
			return NextResponse.json(
				{ error: "Team member ID is required" },
				{ status: 400 },
			);
		}

		// Check if project exists and user has access
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
				userId: session.user.id,
			},
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		await prisma.teamMember.delete({
			where: {
				id: teamMemberId,
				projectId,
			},
		});

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error("[PROJECT_TEAM_DELETE]", error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
