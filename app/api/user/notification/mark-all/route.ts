import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		await prisma.notification.updateMany({
			where: {
				userId: session.user.id,
				isRead: false,
			},
			data: {
				isRead: true,
			},
		});

		return new NextResponse("Success", { status: 200 });
	} catch (error) {
		console.error("[NOTIFICATIONS_MARK_ALL]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
