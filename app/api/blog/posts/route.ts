import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  categoryId: z.string(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    const where: Prisma.PostWhereInput = {
      published: true,
      ...(category && { categoryId: category }),
      ...(tag && { tags: { some: { id: tag } } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          category: true,
          tags: true,
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const json = await request.json();
    const body = postSchema.parse(json);

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const post = await prisma.post.create({
      data: {
        ...body,
        tags: {
          connect: body.tags?.map((tag) => ({ id: tag })),
        },
        slug,
        authorId: session.user.id,
        publishedAt: body.published ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
} 
