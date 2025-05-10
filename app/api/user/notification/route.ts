import { authOptions } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const notifications = await prisma.notification.findMany({
			where: {
				userId: session.user.id,
			},
			orderBy: {
				timestamp: "desc",
			},
		});

		return NextResponse.json(notifications);
	} catch (error) {
		console.error("[NOTIFICATIONS_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
