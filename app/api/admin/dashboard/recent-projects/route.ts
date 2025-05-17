import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session || session.user.role !== "ADMIN") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const recentProjects = await prisma.project.findMany({
			take: 5,
			orderBy: { createdAt: "desc" },
			include: {
				user: {
					select: {
						name: true,
						image: true,
					},
				},
			},
		});

		return NextResponse.json(recentProjects);
	} catch (error) {
		console.error("Error fetching recent projects:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recent projects" },
			{ status: 500 },
		);
	}
}
