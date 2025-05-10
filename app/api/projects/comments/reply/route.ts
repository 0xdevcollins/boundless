import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to reply' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { projectId, parentId, content } = body;

    if (!projectId || !parentId || !content) {
      return NextResponse.json({ error: 'Project ID, parent comment ID, and content are required' }, { status: 400 });
    }

    // Check if parent comment exists
    const parentComment = await prisma.comment.findUnique({
      where: {
        id: parentId,
        projectId, // Ensure the comment belongs to the specified project
      },
    });

    if (!parentComment) {
      return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
    }

    // Create the reply
    const reply = await prisma.comment.create({
      data: {
        content,
        projectId,
        userId,
        parentId,
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

    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
  }
}
