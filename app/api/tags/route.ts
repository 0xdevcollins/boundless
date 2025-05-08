import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const tags = await prisma.tag.findMany({
			include: {
				_count: {
					select: { posts: true },
				},
			},
			orderBy: { name: "asc" },
		});

		return NextResponse.json(tags);
	} catch (error) {
		console.error("Error fetching tags:", error);
		return NextResponse.json(
			{ error: "Failed to fetch tags" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user || session.user.role !== "ADMIN") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { name } = body;

		if (!name) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}

		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");

		const tag = await prisma.tag.create({
			data: {
				name,
				slug,
			},
		});

		return NextResponse.json(tag);
	} catch (error) {
		console.error("Error creating tag:", error);
		return NextResponse.json(
			{ error: "Failed to create tag" },
			{ status: 500 },
		);
	}
}
