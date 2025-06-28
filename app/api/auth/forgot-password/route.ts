import { NextResponse } from "next/server";
import { forgotPassword } from "@/lib/api/auth";
import { z } from "zod";

const emailSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email } = emailSchema.parse(body);
		const apiRes = await forgotPassword({ email });
		return NextResponse.json(apiRes, { status: 200 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
		}
		// If backend returns an error, try to forward it
		if (typeof error === 'object' && error !== null && 'message' in error) {
			return NextResponse.json({ message: String((error as { message: unknown }).message) }, { status: 500 });
		}
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
