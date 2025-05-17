import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);

		// Check if user is authenticated and has admin role
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userId = (await params).id;
		const { role } = await request.json();

		// Validate role
		if (role !== "USER" && role !== "ADMIN") {
			return NextResponse.json({ error: "Invalid role" }, { status: 400 });
		}

		try {
			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					role: role,
				},
			});

			return NextResponse.json(
				{ message: "Role updated successfully" },
				{ status: 200 },
			);
		} catch (error) {
			console.error("Error updating role:", error);
			return NextResponse.json(
				{ error: "Failed to update role" },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error(error);
	}
}
