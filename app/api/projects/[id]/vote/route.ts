import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth.config"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user ID from email since we're using JWT strategy
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        projectId_userId: {
          projectId: params.id,
          userId: user.id,
        },
      },
    })

    if (existingVote) {
      // Remove vote if it exists
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      })

      return NextResponse.json({ message: "Vote removed" })
    }

    // Add new vote
    await prisma.vote.create({
      data: {
        projectId: params.id,
        userId: user.id,
      },
    })

    return NextResponse.json({ message: "Vote added" })
  } catch (error) {
    console.error("Vote error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

