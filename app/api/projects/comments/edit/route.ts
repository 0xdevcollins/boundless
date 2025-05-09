import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to edit comments' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'Comment ID and content are required' }, { status: 400 });
    }

    // Check if the comment exists and belongs to the user
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (comment.userId !== userId) {
      return NextResponse.json({ error: 'You can only edit your own comments' }, { status: 403 });
    }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reactions: true,
        _count: {
          select: {
            reactions: true,
          },
        },
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}
