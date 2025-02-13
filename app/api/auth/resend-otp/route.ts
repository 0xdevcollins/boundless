import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import EmailTemplate from "@/components/email-template"
import type React from "react"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 })
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes

    // Delete any existing OTP for this user
    await prisma.oTP.deleteMany({
      where: { userId: user.id },
    })

    // Save new OTP to database
    await prisma.oTP.create({
      data: {
        userId: user.id,
        token: otp,
        expires: otpExpires,
      },
    })
    await resend.emails.send({
      from: "Boundless Team <onboarding@resend.dev>",
      to: [email],
      subject: "Your New OTP for Email Verification",
      react: EmailTemplate({ name: user.name || "User", otp, resetUrl: "" }) as React.ReactElement,
    })

    return NextResponse.json({ message: "New OTP sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in resending OTP:", error)
    return NextResponse.json({ message: "An error occurred while resending OTP" }, { status: 500 })
  }
}

