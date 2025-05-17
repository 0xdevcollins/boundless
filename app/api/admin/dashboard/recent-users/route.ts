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
		const recentUsers = await prisma.user.findMany({
			take: 5,
			orderBy: [{ emailVerified: "desc" }],
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				emailVerified: true,
			},
		});

		return NextResponse.json(recentUsers);
	} catch (error) {
		console.error("Error fetching recent users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recent users" },
			{ status: 500 },
		);
	}
}
