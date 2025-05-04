import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const post = await prisma.post.findUnique({
			where: {
				slug: slug,
				published: true,
			},
			include: {
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				category: true,
				tags: true,
				comments: {
					include: {
						author: {
							select: {
								name: true,
								image: true,
							},
						},
					},
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(post);
	} catch (error) {
		console.error("Error fetching blog post:", error);
		return NextResponse.json(
			{ error: "Failed to fetch blog post" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user || session.user.role !== "ADMIN") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { title, content, categoryId, tagIds, featuredImage, excerpt } = body;

		if (!title || !content || !categoryId) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");

		const post = await prisma.post.update({
			where: {
				slug: slug,
			},
			data: {
				title,
				slug,
				content,
				excerpt,
				featuredImage,
				categoryId,
				tags: {
					set: [],
					connect: tagIds?.map((id: string) => ({ id })) || [],
				},
			},
			include: {
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				category: true,
				tags: true,
			},
		});

		return NextResponse.json(post);
	} catch (error) {
		console.error("Error updating blog post:", error);
		return NextResponse.json(
			{ error: "Failed to update blog post" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const session = await getServerSession(authOptions);
		if (!session?.user || session.user.role !== "ADMIN") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.post.delete({
			where: {
				slug: slug,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting blog post:", error);
		return NextResponse.json(
			{ error: "Failed to delete blog post" },
			{ status: 500 },
		);
	}
}
