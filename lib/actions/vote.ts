"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth.config"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleVote(projectId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
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
    throw new Error("User not found")
  }

  // Check if user has already voted
  const existingVote = await prisma.vote.findUnique({
    where: {
      projectId_userId: {
        projectId,
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
  } else {
    // Add new vote
    await prisma.vote.create({
      data: {
        projectId,
        userId: user.id,
      },
    })
  }

  revalidatePath(`/projects/${projectId}`)
  return { success: true }
}

