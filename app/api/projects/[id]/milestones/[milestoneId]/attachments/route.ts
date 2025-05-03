import { authOptions } from '@/lib/auth.config';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { type NextRequest, NextResponse } from 'next/server';

// Helper to extract dynamic route parameters from the pathname
const extractParams = (pathname: string) => {
  const match = pathname.match(/\/projects\/([^/]+)\/milestones\/([^/]+)\/attachments/);
  if (!match) return { projectId: null, milestoneId: null };
  const [, projectId, milestoneId] = match;
  return { projectId, milestoneId };
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, milestoneId } = extractParams(request.nextUrl.pathname);

    if (!projectId || !milestoneId) {
      return NextResponse.json({ error: 'Project ID and Milestone ID are required' }, { status: 400 });
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
          error: "You don't have permission to add attachments to this milestone",
        },
        { status: 403 },
      );
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    if (milestone.projectId !== projectId) {
      return NextResponse.json({ error: 'Milestone does not belong to this project' }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const fileUrl = `/uploads/${Date.now()}-${file.name}`;

    const attachment = await prisma.milestoneAttachment.create({
      data: {
        fileName: file.name,
        fileUrl,
        fileType: file.type,
        fileSize: file.size,
        milestoneId,
      },
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    console.error('Error creating attachment:', error);
    return NextResponse.json({ error: 'Failed to create attachment' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, milestoneId } = extractParams(request.nextUrl.pathname);

    if (!projectId || !milestoneId) {
      return NextResponse.json({ error: 'Project ID and Milestone ID are required' }, { status: 400 });
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    if (milestone.projectId !== projectId) {
      return NextResponse.json({ error: 'Milestone does not belong to this project' }, { status: 400 });
    }

    const attachments = await prisma.milestoneAttachment.findMany({
      where: { milestoneId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error('Error fetching attachments:', error);
    return NextResponse.json({ error: 'Failed to fetch attachments' }, { status: 500 });
  }
}
