import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.config"
import prisma from "@/lib/prisma"
import { ProjectsTable } from "@/components/admin/projects/ProjectTable"
import { ProjectFilters } from "@/components/admin/projects/ProjectFilters"

export default async function AdminProjects({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions)

  const status = searchParams.status as string | undefined
  const category = searchParams.category as string | undefined
  const search = searchParams.search as string | undefined
  const page = Number(searchParams.page) || 1
  const pageSize = 10

  // Build filter conditions
  const where: any = {}

  if (status) {
    if (status === "pending") {
      where.isApproved = false
    } else if (status === "approved") {
      where.isApproved = true
    }
  }

  if (category) {
    where.category = category
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  // Fetch projects with pagination
  const projects = await prisma.project.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
      _count: {
        select: {
          fundings: true,
          votes: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  // Get total count for pagination
  const totalProjects = await prisma.project.count({ where })
  const totalPages = Math.ceil(totalProjects / pageSize)

  // Get categories for filter
  const categories = await prisma.project.groupBy({
    by: ["category"],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
      </div>

      <ProjectFilters
        categories={categories.map((c) => c.category)}
        currentCategory={category}
        currentStatus={status}
        searchQuery={search}
      />

      <ProjectsTable projects={projects} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
