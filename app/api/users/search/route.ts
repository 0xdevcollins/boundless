import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q");

		if (!query) {
			return NextResponse.json({ error: "Search query is required" }, { status: 400 });
		}

		// Search users by name, email, or username
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{ name: { contains: query, mode: "insensitive" } },
					{ email: { contains: query, mode: "insensitive" } },
					{ username: { contains: query, mode: "insensitive" } },
				],
			},
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				username: true,
			},
			take: 10, // Limit results to 10 users
		});

		// Transform the data to match the expected format
		const formattedUsers = users.map(user => ({
			id: user.id,
			name: user.name || user.username || "Unknown User",
			email: user.email || "",
			image: user.image || undefined,
		}));

		return NextResponse.json(formattedUsers);
	} catch (error) {
		console.error("Error searching users:", error);
		return NextResponse.json(
			{ error: "Failed to search users" },
			{ status: 500 }
		);
	}
} 
