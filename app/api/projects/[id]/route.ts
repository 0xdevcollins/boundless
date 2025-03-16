import prisma from "@/lib/prisma";
import type { Project, TeamMember, Vote } from "@prisma/client";
import { NextResponse } from "next/server";

// Define a type for the project with included relations
type ProjectWithRelations = Project & {
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
	votes: Vote[];
	teamMembers: TeamMember[];
	_count: {
		votes: number;
	};
};

// Only use the request parameter and extract the ID from the URL
export async function GET(request: Request) {
	try {
		// Extract the ID from the URL path
		const url = new URL(request.url);
		const pathParts = url.pathname.split("/");
		const id = pathParts[pathParts.length - 1]; // Get the last segment of the path

		const project = (await prisma.project.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				votes: true,
				teamMembers: true,
				_count: {
					select: {
						votes: true,
					},
				},
			},
		})) as ProjectWithRelations | null;

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Calculate team members count manually
		const teamMembersCount = project.teamMembers.length;

		// Return the project with the manually calculated team members count
		return NextResponse.json({
			...project,
			_count: {
				...project._count,
				teamMembers: teamMembersCount,
			},
		});
	} catch (error) {
		console.error("Error fetching project:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
