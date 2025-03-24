// app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserProfile, updateUserProfile } from '@/lib/db/profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
// import { authOptions } from '@/lib/auth';

const profileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions );
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const profile = await getUserProfile(session.user.id);
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = profileSchema.parse(body);
    
    const updatedProfile = await updateUserProfile(session.user.id, validatedData);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
