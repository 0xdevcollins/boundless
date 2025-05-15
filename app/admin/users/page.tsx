import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.config"
import prisma from "@/lib/prisma"
import { UsersTable } from "@/components/admin/users/UsersTable"
import { UserFilters } from "@/components/admin/users/UserFilter"

export default async function AdminUsers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions)

  const role = searchParams.role as string | undefined
  const search = searchParams.search as string | undefined
  const page = Number(searchParams.page) || 1
  const pageSize = 10

  // Build filter conditions
  const where: any = {}

  if (role) {
    where.role = role
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { username: { contains: search, mode: "insensitive" } },
    ]
  }

  // Fetch users with pagination
  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    //   createdAt: true,
      emailVerified: true,
      _count: {
        select: {
          projects: true,
          fundings: true,
        },
      },
    },
    // orderBy: { created_At: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  // Get total count for pagination
  const totalUsers = await prisma.user.count({ where })
  const totalPages = Math.ceil(totalUsers / pageSize)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>

      <UserFilters currentRole={role} searchQuery={search} />

      <UsersTable users={users} currentPage={page} totalPages={totalPages} />
    </div>
  )
}
