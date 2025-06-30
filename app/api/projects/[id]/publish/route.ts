import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projectId = id;

    // Check if project exists and user has access
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if project is validated
    if (project.ideaValidation !== 'VALIDATED') {
      return NextResponse.json({ error: 'Project must be validated before publishing' }, { status: 400 });
    }

    // Check if project is already published
    if (project.isApproved) {
      return NextResponse.json({ error: 'Project is already published' }, { status: 400 });
    }

    // Update project to published status
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        isApproved: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create notification for project creator
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Campaign Published Successfully',
        description: `Your campaign "${project.title}" has been published and is now live for funding.`,
      },
    });

    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: 'Campaign published successfully',
    });
  } catch (error) {
    console.error('Error publishing project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
