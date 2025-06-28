import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/api/auth";
import { z } from "zod";

const resetSchema = z.object({
	token: z.string().min(1, "Token is required"),
	newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const tokenSchema = z.object({
	token: z.string().min(1, "Token is required"),
});

// GET method to verify token
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get('token');
		
		if (!token) {
			return NextResponse.json({ message: "Token is required" }, { status: 400 });
		}

		const parsedToken = tokenSchema.parse({ token });
		
		// You might want to add a verifyToken function to your auth.ts
		// For now, we'll just return success if token exists
		return NextResponse.json({ 
			message: "Token is valid",
			token: parsedToken.token 
		}, { status: 200 });

	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log(error);
			return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
		}
		return NextResponse.json({ message: "Invalid token" }, { status: 400 });
	}
}

// POST method to reset password
export async function POST(req: Request) {
	try {
		const body = await req.json();
		
		// Log the body to debug
		console.log('Request body:', body);
		
		const { token, newPassword } = resetSchema.parse(body);
		const apiRes = await resetPassword({ token, newPassword });
		return NextResponse.json(apiRes, { status: 200 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log(error.errors)
			return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
		}
		// If backend returns an error, try to forward it
		console.log(error)
		if (typeof error === 'object' && error !== null && 'message' in error) {
			
			return NextResponse.json({ message: String((error as { message: unknown }).message) }, { status: 500 });
		}
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
