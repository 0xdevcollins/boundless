import { resendOtp } from "@/lib/api/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const response = await resendOtp({ email });

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error in resending OTP:", error);
		return NextResponse.json(
			{ message: "An error occurred while resending OTP" },
			{ status: 500 },
		);
	}
}
