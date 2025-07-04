

import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import api from '@/lib/api/api';

const projectInitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  summary: z
    .string()
    .min(10, 'Summary must be at least 10 characters')
    .max(2000, 'Summary must be less than 2000 characters'),
  type: z.literal('crowdfund'),
  category: z.string().min(1, 'Category is required'),
  whitepaperUrl: z.string().url().optional(),
  pitchVideoUrl: z.string().url().optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  console.log('Session:', JSON.stringify(session, null, 2));
  console.log('Access Token:', session?.user?.accessToken || 'Missing');
  
  if (!session || !session.user?.email || !session.user?.accessToken) {
    console.log('No session or user email/token found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('Received JSON body:', body);

    const { title, summary, category, whitepaperUrl, pitchVideoUrl } = body;

    console.log('Extracted data:', { title, summary, category, whitepaperUrl, pitchVideoUrl });

    const validationResult = projectInitSchema.safeParse({
      title,
      summary,
      type: 'crowdfund',
      category,
      whitepaperUrl,
      pitchVideoUrl,
    });

    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.errors);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const payload = {
      title: validationResult.data.title,
      summary: validationResult.data.summary,
      type: validationResult.data.type,
      category: validationResult.data.category,
      ...(validationResult.data.whitepaperUrl && { whitepaperUrl: validationResult.data.whitepaperUrl }),
      ...(validationResult.data.pitchVideoUrl && { pitchVideoUrl: validationResult.data.pitchVideoUrl }),
    };

    console.log('Sending to backend:', payload);

    const config = {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    };

    const response = await api.post('/projects', payload, config);

    console.log('Backend response:', response);

    // Type the response properly
    const responseData = response as { data: Record<string, unknown> };
    return NextResponse.json(
      {
        success: true,
        ...responseData.data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Project initialization error:', error);

    // Handle API client errors
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { status?: number; data?: { message?: string } } };
      if (apiError.response?.status === 401) {
        return NextResponse.json(
          {
            success: false,
            error: 'Unauthorized - Please check your authentication',
          },
          { status: 401 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: apiError.response?.data?.message || 'Failed to create project',
        },
        { status: apiError.response?.status || 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

