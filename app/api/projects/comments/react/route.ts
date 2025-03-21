import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { ReactionType } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// POST: Add or update a reaction
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to react to comments" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { commentId, type } = body;

    if (!commentId || !type) {
      return NextResponse.json(
        { error: "Comment ID and reaction type are required" },
        { status: 400 }
      );
    }

    // Validate reaction type
    if (!Object.values(ReactionType).includes(type as ReactionType)) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Check if user already has a reaction
    const existingReaction = await prisma.commentReaction.findFirst({
      where: {
        commentId,
        userId
      }
    });

    let reaction;

    if (existingReaction) {
      // Update the existing reaction if it's different
      if (existingReaction.type !== type) {
        reaction = await prisma.commentReaction.update({
          where: { id: existingReaction.id },
          data: { type: type as ReactionType }
        });
      } else {
        // If trying to add the same reaction, just return the existing one
        reaction = existingReaction;
      }
    } else {
      // Create a new reaction
      reaction = await prisma.commentReaction.create({
        data: {
          type: type as ReactionType,
          commentId,
          userId
        }
      });
    }

    return NextResponse.json(reaction);
  } catch (error) {
    console.error("Error adding reaction:", error);
    return NextResponse.json(
      { error: "Failed to add reaction" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a reaction
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to remove reactions" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Check if the user has a reaction to this comment
    const existingReaction = await prisma.commentReaction.findFirst({
      where: {
        commentId,
        userId
      }
    });

    if (!existingReaction) {
      return NextResponse.json(
        { error: "No reaction found to remove" },
        { status: 404 }
      );
    }

    // Delete the reaction
    await prisma.commentReaction.delete({
      where: { id: existingReaction.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing reaction:", error);
    return NextResponse.json(
      { error: "Failed to remove reaction" },
      { status: 500 }
    );
  }
} 