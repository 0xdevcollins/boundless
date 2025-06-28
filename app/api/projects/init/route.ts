import { authOptions } from '@/lib/auth.config';
import { notifyProjectCreated } from '@/lib/notifications/project';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validation schema for project initialization
const projectInitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  fundingGoal: z
    .number()
    .min(1, 'Funding goal must be greater than 0')
    .max(1000000, 'Funding goal must be less than 1,000,000'),
  category: z.string().min(1, 'Category is required'),
  bannerImage: z.union([z.instanceof(File), z.string().url()]).optional(),
  profileImage: z.union([z.instanceof(File), z.string().url()]).optional(),
  teamMembers: z
    .array(
      z.object({
        userId: z.string(),
        role: z.string().min(1, 'Role is required'),
        user: z
          .object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          })
          .optional(),
      }),
    )
    .optional(),
  milestones: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1, 'Milestone title is required'),
        description: z.string().min(10, 'Milestone description must be at least 10 characters'),
        dueDate: z.string().optional(),
        progress: z.number().min(0).max(100).default(0),
      }),
    )
    .optional(),
  pitchDeck: z.union([z.instanceof(File), z.string().url()]).optional(),
  whitepaper: z.union([z.instanceof(File), z.string().url()]).optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Extract and validate form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fundingGoal = Number(formData.get('fundingGoal'));
    const category = formData.get('category') as string;
    const bannerImage = formData.get('bannerImage') as File | null;
    const bannerImageUrl = formData.get('bannerImageUrl') as string | null;
    const profileImage = formData.get('profileImage') as File | null;
    const profileImageUrl = formData.get('profileImageUrl') as string | null;
    const teamMembers = formData.get('teamMembers') as string | null;
    const milestones = formData.get('milestones') as string | null;
    const pitchDeck = formData.get('pitchDeck') as File | null;
    const pitchDeckUrl = formData.get('pitchDeckUrl') as string | null;
    const whitepaper = formData.get('whitepaper') as File | null;
    const whitepaperUrl = formData.get('whitepaperUrl') as string | null;

    // Parse JSON fields
    let parsedTeamMembers = [];
    let parsedMilestones = [];

    if (teamMembers) {
      try {
        parsedTeamMembers = JSON.parse(teamMembers);
      } catch (error) {
        return NextResponse.json({ error: 'Invalid team members data' }, { status: 400 });
      }
    }

    if (milestones) {
      try {
        parsedMilestones = JSON.parse(milestones);
      } catch (error) {
        return NextResponse.json({ error: 'Invalid milestones data' }, { status: 400 });
      }
    }

    // Validate the data
    const validationData = {
      title,
      description,
      fundingGoal,
      category,
      bannerImage: bannerImage || bannerImageUrl,
      profileImage: profileImage || profileImageUrl,
      teamMembers: parsedTeamMembers,
      milestones: parsedMilestones,
      pitchDeck: pitchDeck || pitchDeckUrl,
      whitepaper: whitepaper || whitepaperUrl,
    };

    const validationResult = projectInitSchema.safeParse(validationData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    // Upload images if provided
    let bannerUrl = bannerImageUrl;
    let profileUrl = profileImageUrl;

    if (bannerImage) {
      try {
        const bannerResult = await uploadToCloudinary(bannerImage);
        bannerUrl = bannerResult.secure_url;
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload banner image' }, { status: 500 });
      }
    }

    if (profileImage) {
      try {
        const profileResult = await uploadToCloudinary(profileImage);
        profileUrl = profileResult.secure_url;
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload profile image' }, { status: 500 });
      }
    }

    // Create the project with PENDING validation status
    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        title,
        description,
        fundingGoal,
        category,
        bannerUrl,
        profileUrl,
        ideaValidation: 'PENDING',
        isApproved: false,
      },
    });

    // Add team members if provided
    if (parsedTeamMembers.length > 0) {
      await prisma.teamMember.createMany({
        data: parsedTeamMembers.map((member: any) => ({
          projectId: project.id,
          userId: member.userId,
          fullName: member.user?.name || 'Team Member',
          role: member.role,
        })),
      });
    }

    // Add milestones if provided
    if (parsedMilestones.length > 0) {
      await prisma.milestone.createMany({
        data: parsedMilestones.map((milestone: any) => ({
          projectId: project.id,
          title: milestone.title,
          description: milestone.description,
          dueDate: milestone.dueDate ? new Date(milestone.dueDate) : null,
          progress: milestone.progress || 0,
        })),
      });
    }

    // Upload documents if provided
    if (pitchDeck) {
      try {
        const pitchDeckResult = await uploadToCloudinary(pitchDeck);
        await prisma.project.update({
          where: { id: project.id },
          data: { pitchDeck: pitchDeckResult.secure_url },
        });
      } catch (error) {
        console.error('Failed to upload pitch deck:', error);
      }
    } else if (pitchDeckUrl) {
      await prisma.project.update({
        where: { id: project.id },
        data: { pitchDeck: pitchDeckUrl },
      });
    }

    if (whitepaper) {
      try {
        const whitepaperResult = await uploadToCloudinary(whitepaper);
        await prisma.project.update({
          where: { id: project.id },
          data: { whitepaper: whitepaperResult.secure_url },
        });
      } catch (error) {
        console.error('Failed to upload whitepaper:', error);
      }
    } else if (whitepaperUrl) {
      await prisma.project.update({
        where: { id: project.id },
        data: { whitepaper: whitepaperUrl },
      });
    }

    // Create notification for project creator
    await notifyProjectCreated({
      projectId: project.id,
      projectTitle: title,
      userId: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        project,
        message: 'Project initialized successfully and is now pending validation',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Project initialization error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function uploadToCloudinary(file: File) {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${file.type};base64,${base64}`;

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload(
      dataURI,
      {
        resource_type: 'auto',
        folder: 'project_images',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as { secure_url: string });
      },
    );
  });
}
