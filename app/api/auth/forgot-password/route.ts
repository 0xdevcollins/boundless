import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/email";

const prisma = new PrismaClient();
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User email not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires: otpExpiry,
      },
    });

    try {
      await sendPasswordResetEmail(user.email, user.name, otp);
      return NextResponse.json({ success: true, message: "Password reset email sent" })
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError)
      return NextResponse.json({ error: "Failed to send password reset email" }, { status: 500 })
    }
    return NextResponse.json({ message: "Password reset link sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Forgot Password API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
