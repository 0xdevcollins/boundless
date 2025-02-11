import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const otpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, otp } = otpSchema.parse(body)

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
        expires: { gt: new Date() },
      },
    })

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

