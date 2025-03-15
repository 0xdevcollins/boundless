import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { email, otp } = await req.json();
		console.log("Received OTP verification request:", { email, otp });

		const user = await prisma.user.findUnique({
			where: { email },
			include: { OTP: true },
		});

		console.log("User found:", user ? "Yes" : "No");

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 400 });
		}

		const validOTP = user.OTP?.find(
			(otpRecord) => otpRecord.token === otp && otpRecord.expires > new Date(),
		);

		console.log("Valid OTP found:", validOTP ? "Yes" : "No");

		if (!validOTP) {
			return NextResponse.json(
				{ message: "Invalid or expired OTP" },
				{ status: 400 },
			);
		}

		// Mark email as verified
		await prisma.user.update({
			where: { id: user.id },
			data: { emailVerified: new Date() },
		});

		console.log("User email verified");

		// Delete the used OTP
		await prisma.oTP.delete({
			where: { id: validOTP.id },
		});

		console.log("OTP deleted");

		return NextResponse.json(
			{ message: "Email verified successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in OTP verification:", error);
		return NextResponse.json(
			{ message: "An error occurred during OTP verification" },
			{ status: 500 },
		);
	}
}
