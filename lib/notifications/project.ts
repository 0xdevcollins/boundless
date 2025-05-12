import { createNotification } from "@/lib/notifications";
import {
	generateMilestoneEmailTemplate,
	generateProjectEmailTemplate,
} from "./email-templates";

interface ProjectNotificationParams {
	projectId: string;
	projectTitle: string;
	userId: string;
}

/**
 * Notifies project creator when their project is created
 */
export async function notifyProjectCreated({
	projectId,
	projectTitle,
	userId,
}: ProjectNotificationParams) {
	return createNotification({
		userId,
		title: "Project Created Successfully",
		description: `Your project "${projectTitle}" has been created and is pending approval.`,
		type: "SUCCESS",
		sendEmail: true,
		emailSubject: "Your Boundless Project Has Been Created",
		emailTemplate: generateProjectEmailTemplate({
			title: "Project Created Successfully!",
			description: `
        <p>Your project "${projectTitle}" has been created on Boundless.</p>
        <p>Your project is currently pending approval. We'll notify you once it's been reviewed.</p>
      `,
			type: "SUCCESS",
			projectId,
			projectTitle,
			actionText: "View Your Project",
			additionalContent: "Thank you for using Boundless!",
		}),
	});
}

/**
 * Notifies project creator about new votes
 */
export async function notifyNewVote({
	projectId,
	projectTitle,
	userId,
	voterName,
	voteCount,
}: ProjectNotificationParams & { voterName: string; voteCount: number }) {
	return createNotification({
		userId,
		title: "New Vote on Your Project",
		description: `${voterName} has voted for your project "${projectTitle}". You now have ${voteCount} total votes.`,
		type: "INFO",
		sendEmail: true,
		emailSubject: `New Vote on ${projectTitle}`,
		emailTemplate: generateProjectEmailTemplate({
			title: "New Vote on Your Project",
			description: `
        <p>${voterName} has voted for your project "${projectTitle}".</p>
        <p>You now have <strong>${voteCount}</strong> total votes.</p>
      `,
			type: "INFO",
			projectId,
			projectTitle,
			actionText: "View Project",
			additionalContent: "Keep up the great work!",
		}),
	});
}

/**
 * Notifies project creator when a vote milestone is reached
 */
export async function notifyVoteMilestone({
	projectId,
	projectTitle,
	userId,
	threshold,
}: ProjectNotificationParams & { threshold: number }) {
	return createNotification({
		userId,
		title: "Vote Milestone Reached",
		description: `Your project "${projectTitle}" has reached ${threshold} votes! The community is showing strong support.`,
		type: "SUCCESS",
		sendEmail: true,
		emailSubject: `Congratulations! Your Project Has ${threshold} Votes`,
		emailTemplate: generateProjectEmailTemplate({
			title: "Vote Milestone Reached! 🎉",
			description: `
        <p>Your project "${projectTitle}" has reached <strong>${threshold}</strong> votes on Boundless.</p>
        <p>The community is showing strong support for your idea. Keep up the great work!</p>
      `,
			type: "SUCCESS",
			projectId,
			projectTitle,
			actionText: "View Your Project",
			additionalContent: "Thank you for being part of the Boundless community!",
		}),
	});
}

/**
 * Notifies project creator when their project is automatically validated
 */
export async function notifyProjectValidated({
	projectId,
	projectTitle,
	userId,
	voteCount,
}: ProjectNotificationParams & { voteCount: number }) {
	return createNotification({
		userId,
		title: "Project Automatically Validated",
		description: `Your project "${projectTitle}" has been automatically validated after receiving ${voteCount} community votes!`,
		type: "SUCCESS",
		sendEmail: true,
		emailSubject: `Project Validated: ${projectTitle}`,
		emailTemplate: generateProjectEmailTemplate({
			title: "Project Validated! 🎉",
			description: `
        <p>Congratulations! Your project "${projectTitle}" has been automatically validated after receiving <strong>${voteCount}</strong> community votes!</p>
        <p>This is a significant achievement that demonstrates strong community support for your idea.</p>
      `,
			type: "SUCCESS",
			projectId,
			projectTitle,
			actionText: "View Your Project",
			additionalContent:
				"Your project is now ready for the next phase of development!",
		}),
	});
}

/**
 * Notifies team members when they are added to a project
 */
export async function notifyTeamMemberAdded({
	projectId,
	projectTitle,
	userId,
	role,
}: ProjectNotificationParams & { role: string }) {
	return createNotification({
		userId,
		title: "Added to Project Team",
		description: `You have been added to the project "${projectTitle}" as a ${role}.`,
		type: "INFO",
		sendEmail: true,
		emailSubject: `You've Been Added to Project: ${projectTitle}`,
		emailTemplate: generateProjectEmailTemplate({
			title: "Welcome to the Project Team!",
			description: `
        <p>You have been added to the project "${projectTitle}" on Boundless.</p>
        <p>Your role: <strong>${role}</strong></p>
      `,
			type: "INFO",
			projectId,
			projectTitle,
			actionText: "View Project",
			additionalContent: "Thank you for being part of the team!",
		}),
	});
}

/**
 * Notifies team members about new milestones
 */
export async function notifyNewMilestones({
	projectId,
	projectTitle,
	userId,
	milestones,
}: ProjectNotificationParams & {
	milestones: Array<{ title: string; description: string | null }>;
}) {
	return createNotification({
		userId,
		title: "New Project Milestones",
		description: `${milestones.length} new milestone${milestones.length === 1 ? "" : "s"} have been added to project "${projectTitle}"`,
		type: "INFO",
		sendEmail: true,
		emailSubject: `New Milestones Added to ${projectTitle}`,
		emailTemplate: generateProjectEmailTemplate({
			title: "Project Milestones Update",
			description: `
        <p>${milestones.length} new milestone${milestones.length === 1 ? "" : "s"} have been added to project "${projectTitle}":</p>
        <ul style="padding-left: 20px; margin: 16px 0;">
          ${milestones.map((m) => `<li><strong>${m.title}</strong> - ${m.description || "No description"}</li>`).join("")}
        </ul>
      `,
			type: "INFO",
			projectId,
			projectTitle,
			actionText: "View Project",
		}),
	});
}

export async function notifyMilestoneUpdated({
	projectId,
	projectTitle,
	userId,
	milestoneTitle,
	updaterName,
}: {
	projectId: string;
	projectTitle: string;
	userId: string;
	milestoneTitle: string;
	updaterName: string;
}) {
	return createNotification({
		userId,
		title: "Milestone Updated",
		description: `${updaterName} updated the milestone "${milestoneTitle}" for project "${projectTitle}"`,
		type: "INFO",
		sendEmail: true,
		emailSubject: `Milestone Update: ${projectTitle}`,
		emailTemplate: generateMilestoneEmailTemplate({
			title: "Milestone Update",
			description: `
        <p>${updaterName} has updated the milestone "${milestoneTitle}" for project "${projectTitle}".</p>
      `,
			type: "INFO",
			projectId,
			projectTitle,
			milestoneTitle,
			actionText: "View Project",
		}),
	});
}

export async function notifyMilestoneCompleted({
	projectId,
	projectTitle,
	userId,
	milestoneTitle,
	updaterName,
	isOwner = false,
}: {
	projectId: string;
	projectTitle: string;
	userId: string;
	milestoneTitle: string;
	updaterName: string;
	isOwner?: boolean;
}) {
	const title = isOwner
		? "Project Milestone Achievement"
		: "Milestone Completed!";
	const description = isOwner
		? `Congratulations! Your project "${projectTitle}" has reached another milestone: "${milestoneTitle}"`
		: `The milestone "${milestoneTitle}" for project "${projectTitle}" has been marked as completed`;

	return createNotification({
		userId,
		title,
		description,
		type: "SUCCESS",
		sendEmail: true,
		emailSubject: `Project Milestone Completed: ${projectTitle}`,
		emailTemplate: generateMilestoneEmailTemplate({
			title: `🎉 ${title}`,
			description: `
        <p>${description}${!isOwner ? ` by ${updaterName}` : ""}.</p>
      `,
			type: "SUCCESS",
			projectId,
			projectTitle,
			milestoneTitle,
			actionText: "View Project",
			additionalContent: "Keep up the great work!",
		}),
	});
}
