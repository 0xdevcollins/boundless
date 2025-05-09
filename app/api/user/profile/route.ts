import { authOptions } from '@/lib/auth.config';
import { getUserProfile, updateUserProfile } from '@/lib/db/profile';
import { getServerSession } from 'next-auth';
// app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
// import { z } from "zod";
// import { authOptions } from '@/lib/auth';

// const profileSchema = z.object({
// 	username: z.string().min(3).max(30).optional(),
// 	name: z.string().min(2).max(50).optional(),
// 	bio: z.string().max(500).optional(),
// 	image: z.string().url().optional(),
// 	bannerImage: z.string().url().optional(),
// 	twitter: z.string().url().optional().or(z.literal("")),
// 	linkedin: z.string().url().optional().or(z.literal("")),
// });

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await getUserProfile(session.user.id);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const profile = await updateUserProfile(session.user.id, data);

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
