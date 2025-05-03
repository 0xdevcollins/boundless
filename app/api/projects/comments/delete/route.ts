import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to delete comments' }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        replies: {
          select: { id: true },
        },
      },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check if the user is the comment author
    if (comment.userId !== userId) {
      // Check if the user is an admin
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'You can only delete your own comments' }, { status: 403 });
      }
    }

    // If the comment has replies, recursively delete them
    if (comment.replies.length > 0) {
      // Delete all reactions to replies
      await prisma.commentReaction.deleteMany({
        where: {
          commentId: {
            in: comment.replies.map((reply) => reply.id),
          },
        },
      });

      // Delete all replies
      await prisma.comment.deleteMany({
        where: {
          parentId: id,
        },
      });
    }

    // Delete all reactions to this comment
    await prisma.commentReaction.deleteMany({
      where: {
        commentId: id,
      },
    });

    // Delete the comment
    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
