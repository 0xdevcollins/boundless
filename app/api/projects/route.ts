import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth.config";

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

		const project = await prisma.pconsole.log("Received POST request to create project");
console.log("Session:", session);
console.log("Request JSON:", title, description, fundingGoal, category, bannerPath, profilePath);
console.log("Created project:", project);roject.create({
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
