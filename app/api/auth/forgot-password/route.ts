import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { z } from "zod";
import EmailTemplate from "@/components/email-template";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      throw new Error("Base URL is missing. Set NEXT_PUBLIC_APP_URL in .env");
    }

    const resetUrl = `${baseUrl}/auth/reset-password?otp=${otp}`;
    
    await resend.emails.send({
          from: "Boundless Team <onboarding@resend.dev>",
          to: [email],
          subject: "Reset you password",
          react: EmailTemplate({ firstName: user.name || "Boundless User", resetUrl: resetUrl }) as React.ReactElement,
        })
    return NextResponse.json({ message: "Password reset link sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Forgot Password API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
