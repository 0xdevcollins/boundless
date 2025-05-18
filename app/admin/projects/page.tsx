import { ProjectFilters } from "@/components/admin/projects/ProjectFilters";
import { ProjectsTable } from "@/components/admin/projects/ProjectTable";
import { authOptions } from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";

export default async function AdminProjects(props: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const searchParams = await props.searchParams;
	const session = await getServerSession(authOptions);

	// Check if user is authenticated and has admin role
	if (!session || session.user.role !== "ADMIN") {
		return <div>You don&apos;t have permission to access this page</div>;
	}

	const status = searchParams.status as string | undefined;
	const category = searchParams.category as string | undefined;
	const search = searchParams.search as string | undefined;
	const page = Number(searchParams.page) || 1;
	const pageSize = 10;

	const where: Prisma.ProjectWhereInput = {};

	if (status) {
		if (status === "pending") {
			where.isApproved = false;
		} else if (status === "approved") {
			where.isApproved = true;
		}
	}

	if (category) {
		where.category = category;
	}

	if (search) {
		where.OR = [
			{ title: { contains: search, mode: "insensitive" } },
			{ description: { contains: search, mode: "insensitive" } },
		];
	}

	try {
		const projectsWithCounts = Prisma.validator<Prisma.ProjectDefaultArgs>()({
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
		});

		const projects = await prisma.project.findMany({
			where,
			...projectsWithCounts,
			orderBy: { createdAt: "desc" },
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		const totalProjects = await prisma.project.count({ where });
		const totalPages = Math.ceil(totalProjects / pageSize);

		const categories = await prisma.project.groupBy({
			by: ["category"],
			where: {},
		});

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

				<ProjectsTable
					projects={projects}
					currentPage={page}
					totalPages={totalPages}
				/>
			</div>
		);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return <div>Error loading projects: {(error as Error).message}</div>;
	}
}
