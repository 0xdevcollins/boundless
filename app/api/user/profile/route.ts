// app/api/user/profile/route.ts
import { NextResponse } from 'next/server';

// Example in-memory store for demonstration (replace with DB logic)
let userProfile = {
  username: 'john_doe',
  displayName: 'John Doe',
  bio: 'Software Engineer',
  twitter: 'https://twitter.com/johndoe',
  linkedIn: 'https://linkedin.com/in/johndoe'
};

export async function GET() {
  // Return the current user profile
  return NextResponse.json(userProfile);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    // Merge the updated data into userProfile
    userProfile = { ...userProfile, ...data };
    return NextResponse.json(userProfile);
  } catch {
    return new NextResponse('Error updating profile', { status: 400 });
  }
}
