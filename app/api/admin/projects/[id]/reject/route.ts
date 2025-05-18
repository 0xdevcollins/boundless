import { authOptions } from "@/lib/auth.config"
import prisma from "@/lib/prisma"
import { createNotification } from "@/lib/notifications"
import { generateProjectEmailTemplate } from "@/lib/notifications/email-templates"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = (await params).id
    const { review } = await request.json()

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

    let emailDescription = `
      <p>Your project "${updatedProject.title}" has not been approved by the Boundless team at this time.</p>
    `

    if (review && review.trim()) {
      emailDescription += `
        <p>The admin has provided the following feedback:</p>
        <div style="margin: 16px 0; padding: 16px; background-color: #f9f9f9; border-left: 4px solid #f97316; border-radius: 4px;">
          ${review}
        </div>
        <p>You can make the necessary changes and resubmit your project for approval.</p>
      `
    } else {
      emailDescription += `
        <p>Please review your project details and make any necessary improvements before resubmitting.</p>
      `
    }

    await createNotification({
      userId: updatedProject.userId,
      title: "Project Not Approved",
      description: `Your project "${updatedProject.title}" has not been approved.`,
      type: "WARNING",
      sendEmail: true,
      emailSubject: `Project Update: ${updatedProject.title}`,
      emailTemplate: generateProjectEmailTemplate({
        title: "Project Review Feedback",
        description: emailDescription,
        type: "WARNING",
        projectId: updatedProject.id,
        projectTitle: updatedProject.title,
        actionText: "View Your Project",
        additionalContent: "If you have any questions, please contact our support team.",
      }),
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error rejecting project:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}