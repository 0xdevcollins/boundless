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
		const fundingOverview = await prisma.funding.groupBy({
			by: ["status"],
			_sum: {
				amount: true,
			},
		});

		return NextResponse.json(fundingOverview);
	} catch (error) {
		console.error("Error fetching funding overview:", error);
		return NextResponse.json(
			{ error: "Failed to fetch funding overview" },
			{ status: 500 },
		);
	}
}
