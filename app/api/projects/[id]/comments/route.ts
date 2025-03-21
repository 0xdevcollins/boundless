import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    
    // Validate parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const projectId = params.id;
    
    // Get session but don't require it - guest users can read comments
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    // Get total count of top-level comments (those without a parent)
    const totalComments = await prisma.comment.count({
      where: {
        projectId,
        parentId: null
      }
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(totalComments / limit);
    
    // Get paginated top-level comments
    const topLevelComments = await prisma.comment.findMany({
      where: {
        projectId,
        parentId: null
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: (page - 1) * limit,
      limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true
          }
        },
        _count: {
          select: {
            reactions: true,
            replies: true
          }
        }
      }
    });
    
    // Get IDs of all top-level comments
    const commentIds = topLevelComments.map(comment => comment.id);
    
    // Get all replies for these comments
    const replies = await prisma.comment.findMany({
      where: {
        parentId: {
          in: commentIds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true
          }
        },
        _count: {
          select: {
            reactions: true,
            replies: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });
    
    // Combine top-level comments and replies
    const allComments = [...topLevelComments, ...replies];
    
    return NextResponse.json({
      comments: allComments,
      page,
      limit,
      totalComments,
      totalPages
    });

  } catch (error) {
    console.error("Error fetching project comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
} 