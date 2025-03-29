"use server";

import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getUserSettings() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	return await prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			theme: true,
			language: true,
			notificationsEnabled: true,
		},
	});
}

export async function updateUserSettings(data: {
	theme?: string;
	language?: string;
	notificationsEnabled?: boolean;
}) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	return await prisma.user.update({
		where: { id: session.user.id },
		data,
		select: {
			theme: true,
			language: true,
			notificationsEnabled: true,
		},
	});
}
