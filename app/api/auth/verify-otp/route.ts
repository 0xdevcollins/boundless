import { verifyOtp } from "@/lib/api/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, otp } = await req.json();
		console.log("Received OTP verification request:", { email, otp });

		const response = await verifyOtp({ email, otp });

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error in OTP verification:", error);
		return NextResponse.json(
			{ message: "An error occurred during OTP verification" },
			{ status: 500 },
		);
	}
}
