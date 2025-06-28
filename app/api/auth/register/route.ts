import { register } from '@/lib/api/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);
    // Compose RegisterRequest
    const registerData = {
      email,
      password,
      firstName: name, // or split name if needed
      lastName: name, // You may want to parse this from name or add to schema
      username: email.split('@')[0],
    };
    const response = await register(registerData);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
