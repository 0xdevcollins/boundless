import { resendOTP } from '@/lib/email';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

		// Generate new OTP
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
		await prisma.oTP.deleteMany({
			where: { userId: user.id },
		});
		await prisma.oTP.create({
			data: {
				userId: user.id,
				token: otp,
				expires: otpExpires,
			},
		});
		try {
			await resendOTP(user.email || "", user.name || "", otp);
			return NextResponse.json({
				success: true,
				message: "OTP code succesfully resent",
				status: 2000,
			});
		} catch (error) {
			console.error("Error sending password reset email:", error);
			return NextResponse.json(
				{ error: "Failed to resend OTP" },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("Error in resending OTP:", error);
		return NextResponse.json(
			{ message: "An error occurred while resending OTP" },
			{ status: 500 },
		);
	}
}
