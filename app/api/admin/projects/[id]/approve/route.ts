import { authOptions } from "@/lib/auth.config";
import { createNotification } from "@/lib/notifications";
import { generateProjectEmailTemplate } from "@/lib/notifications/email-templates";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await getServerSession(authOptions);

		// Check if user is authenticated and has admin role
		if (!session || session.user.role !== "ADMIN") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const projectId = (await params).id;
		const { review } = await request.json();

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: { isApproved: true },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		let emailDescription = `
      <p>Your project "${updatedProject.title}" has been approved by the Boundless team.</p>
    `;

		if (review?.trim()) {
			emailDescription += `
        <p>The admin has provided the following feedback:</p>
        <div style="margin: 16px 0; padding: 16px; background-color: #f9f9f9; border-left: 4px solid #0d9488; border-radius: 4px;">
          ${review}
        </div>
      `;
		}

		await createNotification({
			userId: updatedProject.userId,
			title: "Project Approved",
			description: `Your project "${updatedProject.title}" has been approved by the Boundless team.`,
			type: "SUCCESS",
			sendEmail: true,
			emailSubject: `Project Approved: ${updatedProject.title}`,
			emailTemplate: generateProjectEmailTemplate({
				title: "Project Approved! 🎉",
				description: emailDescription,
				type: "SUCCESS",
				projectId: updatedProject.id,
				projectTitle: updatedProject.title,
				actionText: "View Your Project",
				additionalContent: "Thank you for using Boundless!",
			}),
		});

		return NextResponse.json(updatedProject);
	} catch (error) {
		console.error("Error approving project:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
