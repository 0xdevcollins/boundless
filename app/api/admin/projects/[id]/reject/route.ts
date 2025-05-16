import { authOptions } from "@/lib/auth.config"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and has admin role
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = params.id

    // Update project approval status
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { isApproved: false },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Create notification for the project owner
    await prisma.notification.create({
      data: {
        userId: updatedProject.userId,
        title: "Project Rejected",
        description: `Your project "${updatedProject.title}" has been rejected by the Boundless team. Please review and make necessary changes.`,
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error rejecting project:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
