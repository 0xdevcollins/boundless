import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { z } from "zod"

const prisma = new PrismaClient()

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  otp: z.string().length(6, "Invalid OTP"), // Ensure OTP is exactly 6 digits
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, otp } = resetSchema.parse(body)

    // Verify OTP
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { identifier: email, token: otp },
    })

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await hash(password, 12)

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    // Delete OTP after successful password reset
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
