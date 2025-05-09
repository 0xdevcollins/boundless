import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { type NextRequest, NextResponse } from 'next/server';

// Helper to extract projectId from pathname
function extractProjectId(pathname: string) {
  const parts = pathname.split('/');
  return parts[parts.indexOf('projects') + 1];
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = extractProjectId(request.nextUrl.pathname);
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const milestones = await prisma.milestone.findMany({
      where: { projectId },
      include: { attachments: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return NextResponse.json({ error: 'Failed to fetch milestones' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = extractProjectId(request.nextUrl.pathname);
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        teamMembers: {
          where: { userId: session.user.id },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const isTeamMember = project.userId === session.user.id || project.teamMembers.length > 0;
    if (!isTeamMember) {
      return NextResponse.json(
        {
          error: "You don't have permission to add milestones to this project",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { title, description, dueDate, progress } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const milestone = await prisma.milestone.create({
      data: {
        title,
        description: description || '',
        dueDate: dueDate ? new Date(dueDate) : null,
        progress: progress || 0,
        projectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(milestone, { status: 201 });
  } catch (error) {
    console.error('Error creating milestone:', error);
    return NextResponse.json({ error: 'Failed to create milestone' }, { status: 500 });
  }
}
