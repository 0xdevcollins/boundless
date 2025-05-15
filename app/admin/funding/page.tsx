import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.config"
import prisma from "@/lib/prisma"
import { FundingTable } from "@/components/admin/funding/FundingTable"
import { FundingFilters } from "@/components/admin/funding/FundingFilters"
import { FundingSummary } from "@/components/admin/funding/FundingSummary"

export default async function AdminFunding({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions)

  const status = searchParams.status as string | undefined
  const projectId = searchParams.projectId as string | undefined
  const search = searchParams.search as string | undefined
  const page = Number(searchParams.page) || 1
  const pageSize = 10

  // Build filter conditions
  const where: any = {}

  if (status) {
    where.status = status
  }

  if (projectId) {
    where.projectId = projectId
  }

  if (search) {
    where.OR = [
      {
        project: {
          title: { contains: search, mode: "insensitive" },
        },
      },
      {
        user: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      },
    ]
  }

  // Fetch fundings with pagination
  const fundings = await prisma.funding.findMany({
    where,
    include: {
      project: {
        select: {
          id: true,
          title: true,
          bannerUrl: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  // Get total count for pagination
  const totalFundings = await prisma.funding.count({ where })
  const totalPages = Math.ceil(totalFundings / pageSize)

  // Get funding summary
  const fundingSummary = await prisma.funding.groupBy({
    by: ["status"],
    _sum: {
      amount: true,
    },
    _count: true,
  })

  // Get top projects for filter
  const topProjects = await prisma.project.findMany({
    where: {
      fundings: {
        some: {},
      },
    },
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          fundings: true,
        },
      },
    },
    orderBy: {
      fundings: {
        _count: "desc",
      },
    },
    take: 10,
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Funding Management</h1>
      </div>

      <FundingSummary data={fundingSummary} />

      <FundingFilters projects={topProjects} currentStatus={status} currentProject={projectId} searchQuery={search} />

      <FundingTable fundings={fundings} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
