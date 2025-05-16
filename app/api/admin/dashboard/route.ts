import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.config"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const projectCount = await prisma.project.count()
    const userCount = await prisma.user.count()
    const pendingProjects = await prisma.project.count({
      where: { isApproved: false },
    })
    const totalFunding = await prisma.funding.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "COMPLETED",
      },
    })

    return NextResponse.json({
      projectCount,
      userCount,
      pendingProjects,
      totalFunding: totalFunding._sum.amount || 0,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard statistics" }, { status: 500 })
  }
}
