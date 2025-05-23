import { sendVerificationEmail } from "@/lib/email";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();
const userSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, email, password } = userSchema.parse(body);

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);
		}

		const hashedPassword = await hash(password, 12);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		// Generate OTP
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

		// Save OTP to database
		await prisma.oTP.create({
			data: {
				userId: user.id,
				token: otp,
				expires: otpExpires,
			},
		});

		try {
			await sendVerificationEmail(email, name, otp);
			console.log("Verification email sent successfully");
		} catch (error) {
			console.error("Error sending verification email:", error);
		}
		return NextResponse.json(
			{
				message: "User created successfully. Please check your email for OTP.",
				userId: user.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: error.errors[0].message },
				{ status: 400 },
			);
		}
		console.error("Error during registration:", error);
		return NextResponse.json(
			{ message: "An error occurred during registration" },
			{ status: 500 },
		);
	}
}
