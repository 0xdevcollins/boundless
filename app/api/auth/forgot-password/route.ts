import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { Resend } from "resend"
import { z } from "zod"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = emailSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minutes

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires: otpExpiry,
      },
    })

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset OTP",
      html: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    })

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}