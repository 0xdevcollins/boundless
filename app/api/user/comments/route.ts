import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const userId = session.user.id;

    // Get user comments with project details and reaction counts
    const comments = await prisma.comment.findMany({
      where: {
        userId,
        OR: search
          ? [
              { content: { contains: search, mode: 'insensitive' } },
              { project: { title: { contains: search, mode: 'insensitive' } } },
            ]
          : undefined,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform data to match the expected format
    const transformedComments = comments.map((comment) => {
      const likes = comment.reactions.filter((r) => r.type === 'LIKE').length;
      const dislikes = comment.reactions.filter((r) => r.type === 'DISLIKE').length;

      return {
        id: comment.id,
        projectId: comment.projectId,
        projectName: comment.project.title,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        likes,
        dislikes,
      };
    });

    return NextResponse.json(transformedComments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// API endpoint for editing a comment
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'Comment ID and content are required' }, { status: 400 });
    }

    // Check if the comment belongs to the user
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.userId !== userId) {
      return NextResponse.json({ error: "Comment not found or you don't have permission to edit it" }, { status: 403 });
    }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content, updatedAt: new Date() },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// API endpoint for deleting a comment
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    // Check if the comment belongs to the user
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.userId !== userId) {
      return NextResponse.json(
        {
          error: "Comment not found or you don't have permission to delete it",
        },
        { status: 403 },
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
