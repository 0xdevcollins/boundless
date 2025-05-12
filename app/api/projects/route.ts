import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import type { Prisma, ValidationStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");
		const status = searchParams.get("status");

		const where: Prisma.ProjectWhereInput = {
			isApproved: true,
		};

		if (category) {
			where.category = category;
		}

		if (status) {
			where.ideaValidation = status as ValidationStatus;
		}

		const projects = await prisma.project.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				votes: {
					select: {
						id: true,
						userId: true,
					},
				},
				_count: {
					select: {
						votes: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(projects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const { forUser } = await request.json();

		const session = await getServerSession(authOptions);

		const where: Prisma.ProjectWhereInput = {
			isApproved: true,
		};

		if (forUser && session?.user?.id) {
			where.userId = session.user.id;
		}

		// if (category) {
		//   where.category = category;
		// }

		// if (status) {
		//   where.ideaValidation = status as ValidationStatus;
		// }

		const projects = await prisma.project.findMany({
			where,
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				votes: {
					select: {
						id: true,
						userId: true,
					},
				},
				_count: {
					select: {
						votes: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(projects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
