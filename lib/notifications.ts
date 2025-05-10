import { transporter } from "./nodemailer";
import { prisma } from "./prisma";

export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

interface CreateNotificationParams {
	userId: string;
	title: string;
	description: string;
	type?: NotificationType;
	sendEmail?: boolean;
	emailSubject?: string;
	emailTemplate?: string;
}

/**
 * Creates a notification in the database and optionally sends an email
 * @param params Notification parameters
 * @returns The created notification
 */
export async function createNotification({
	userId,
	title,
	description,
	type = "INFO",
	sendEmail = false,
	emailSubject,
	emailTemplate,
}: CreateNotificationParams) {
	try {
		// Create notification in database
		const notification = await prisma.notification.create({
			data: {
				userId,
				title,
				description,
			},
		});

		// If email sending is enabled and user has email notifications enabled
		if (sendEmail) {
			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: { email: true, name: true, notificationsEnabled: true },
			});

			if (user?.email && user.notificationsEnabled) {
				const mailOptions = {
					from:
						process.env.SMTP_FROM || "Boundless Team <noreply@boundlessfi.xyz>",
					to: user.email,
					subject: emailSubject || title,
					html:
						emailTemplate ||
						`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>${title}</h2>
              <p>${description}</p>
              <p>Best regards,<br>The Boundless Team</p>
            </div>
          `,
				};

				await transporter.sendMail(mailOptions);
			}
		}

		return notification;
	} catch (error) {
		console.error("Failed to create notification:", error);
		throw new Error("Failed to create notification");
	}
}

/**
 * Marks a notification as read
 * @param notificationId The ID of the notification to mark as read
 * @returns The updated notification
 */
export async function markNotificationAsRead(notificationId: string) {
	try {
		return await prisma.notification.update({
			where: { id: notificationId },
			data: { isRead: true },
		});
	} catch (error) {
		console.error("Failed to mark notification as read:", error);
		throw new Error("Failed to mark notification as read");
	}
}

/**
 * Gets all notifications for a user
 * @param userId The ID of the user
 * @param includeRead Whether to include read notifications
 * @returns Array of notifications
 */
export async function getUserNotifications(userId: string, includeRead = true) {
	try {
		return await prisma.notification.findMany({
			where: {
				userId,
				...(includeRead ? {} : { isRead: false }),
			},
			orderBy: {
				timestamp: "desc",
			},
		});
	} catch (error) {
		console.error("Failed to get user notifications:", error);
		throw new Error("Failed to get user notifications");
	}
}
