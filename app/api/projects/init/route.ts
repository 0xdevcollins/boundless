import { notifyProjectCreated } from '@/lib/notifications/project';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validation schema for project initialization (without File validation)
const projectInitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  tagline: z.string().min(1, 'Tagline is required').max(120, 'Tagline must be less than 120 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  fundingGoal: z
    .number()
    .min(1, 'Funding goal must be greater than 0')
    .max(1000000, 'Funding goal must be less than 1,000,000'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(), // Will be parsed as JSON string
});

// Helper function to upload to Cloudinary
async function uploadToCloudinary(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: 'boundless/projects',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({ secure_url: result!.secure_url });
          }
        },
      )
      .end(buffer);
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    // Extract form data
    const title = formData.get('title') as string;
    const tagline = formData.get('tagline') as string;
    const description = formData.get('description') as string;
    const fundingGoal = Number(formData.get('fundingGoal'));
    const category = formData.get('category') as string;
    const banner = formData.get('banner') as File | null;
    const logo = formData.get('logo') as File | null;
    const whitepaper = formData.get('whitepaper') as File | null;
    const tagsRaw = formData.get('tags') as string | null;
    let tags: string[] = [];
    if (tagsRaw) {
      try {
        tags = JSON.parse(tagsRaw);
      } catch {}
    }

    // Validate required fields
    const validationResult = projectInitSchema.safeParse({
      title,
      tagline,
      description,
      fundingGoal,
      category,
      tags: tagsRaw,
    });

    if (!validationResult.success) {
      return NextResponse.json({ error: 'Validation failed', details: validationResult.error.errors }, { status: 400 });
    }

    // Validate file uploads
    if (!banner) {
      return NextResponse.json({ error: 'Banner image is required' }, { status: 400 });
    }

    if (!logo) {
      return NextResponse.json({ error: 'Logo image is required' }, { status: 400 });
    }

    // Upload images to Cloudinary
    let bannerUrl: string;
    let logoUrl: string;
    let whitepaperUrl: string | null = null;

    try {
      const [bannerResult, logoResult] = await Promise.all([uploadToCloudinary(banner), uploadToCloudinary(logo)]);

      bannerUrl = bannerResult.secure_url;
      logoUrl = logoResult.secure_url;

      if (whitepaper) {
        const whitepaperResult = await uploadToCloudinary(whitepaper);
        whitepaperUrl = whitepaperResult.secure_url;
      }
    } catch (uploadError) {
      console.error('File upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
    }

    // Create project with initialization status
    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        title,
        tagline,
        description,
        fundingGoal,
        category,
        bannerUrl,
        profileUrl: logoUrl, // Using profileUrl field for logo
        whitepaperUrl,
        tags,
        isApproved: false, // Requires admin approval
        ideaValidation: 'PENDING', // Pending community validation
      },
    });

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
        message: 'Project initialized successfully and submitted for admin review',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Project initialization error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
