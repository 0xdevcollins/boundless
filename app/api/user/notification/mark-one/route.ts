import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth.config";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { notificationId } = await req.json();

    if (!notificationId) {
      return new NextResponse("Notification ID is required", { status: 400 });
    }

    await prisma.notification.update({
      where: {
        id: notificationId,
        userId: session.user.id,
      },
      data: {
        isRead: true,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("[NOTIFICATIONS_MARK_ONE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
