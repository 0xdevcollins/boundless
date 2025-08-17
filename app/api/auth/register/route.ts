import { register } from '@/lib/api/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = userSchema.parse(body);
    const registerData = {
      email,
      password,
      firstName,
      lastName,
      username: email.split('@')[0],
    };
    const response = await register(registerData);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'status' in error
    ) {
      const serverError = error;
      const errorMessage =
        serverError?.message || 'An unexpected error occurred';
      const statusCode =
        typeof serverError?.status === 'number' ? serverError.status : 400;

      return NextResponse.json(
        { message: errorMessage },
        { status: statusCode }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
