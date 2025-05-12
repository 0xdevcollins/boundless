import { type Funding, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const projectId = id;

		// Get all completed fundings for the project
		const fundings = await prisma.funding.findMany({
			where: {
				projectId,
				status: "COMPLETED",
			},
		});

		// Calculate total raised amount
		const raised = fundings.reduce(
			(sum: number, funding: Funding) => sum + funding.amount,
			0,
		);

		// Get unique backers count
		const backers = new Set(fundings.map((f: Funding) => f.userId)).size;

		// Calculate days left (30 days from project creation)
		const project = await prisma.project.findUnique({
			where: { id: projectId },
			select: { createdAt: true },
		});

		if (!project) {
			return new NextResponse("Project not found", { status: 404 });
		}

		const daysLeft = Math.max(
			0,
			30 -
				Math.floor(
					(Date.now() - project.createdAt.getTime()) / (1000 * 60 * 60 * 24),
				),
		);

		return NextResponse.json({
			raised,
			backers,
			daysLeft,
		});
	} catch (error) {
		console.error("[PROJECT_FUNDING_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
