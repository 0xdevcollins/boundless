import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const {
			title,
			description,
			fundingGoal,
			category,
			bannerPath,
			profilePath,
		} = await request.json();

		if (!title || !description || !fundingGoal || !category) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const project = await prisma.project.create({
			data: {
				userId: session.user.id,
				title,
				description,
				fundingGoal,
				category,
				bannerUrl: bannerPath || null,
				profileUrl: profilePath || null,
				blockchainTx: null,
			},
		});

		return NextResponse.json({ success: true, project }, { status: 201 });
	} catch (error) {
		console.error("Project creation error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
