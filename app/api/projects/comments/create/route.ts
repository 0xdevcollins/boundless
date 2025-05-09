import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to comment' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { projectId, content } = body;

    if (!projectId || !content) {
      return NextResponse.json({ error: 'Project ID and comment content are required' }, { status: 400 });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        projectId,
        userId,
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

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
