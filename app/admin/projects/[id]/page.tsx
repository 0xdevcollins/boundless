import { ProjectActions } from "@/components/admin/projects/project-details/ProjectActions";
import {
	type ProjectData,
	ProjectDetails,
} from "@/components/admin/projects/project-details/ProjectDetails";
import { ProjectFundings } from "@/components/admin/projects/project-details/ProjectFundings";
import { ProjectMilestones } from "@/components/admin/projects/project-details/ProjectMilestones";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AdminProjectPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	// Fetch project with related data
	const project = await prisma.project.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					image: true,
				},
			},
			teamMembers: true,
			milestones: {
				include: {
					attachments: true,
				},
				orderBy: {
					createdAt: "asc",
				},
			},
			fundings: {
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
							image: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			},
			_count: {
				select: {
					votes: true,
					comments: true,
				},
			},
		},
	});

	if (!project) {
		notFound();
	}

	// Calculate funding stats
	const totalFunding = project.fundings.reduce(
		(sum, funding) =>
			sum + (funding.status === "COMPLETED" ? funding.amount : 0),
		0,
	);

	const fundingPercentage = Math.min(
		Math.round((totalFunding / project.fundingGoal) * 100),
		100,
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">{project.title}</h1>
				<ProjectActions project={project} />
			</div>

			<Tabs defaultValue="details">
				<TabsList>
					<TabsTrigger value="details">Project Details</TabsTrigger>
					<TabsTrigger value="milestones">Milestones</TabsTrigger>
					<TabsTrigger value="fundings">Fundings</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="space-y-6">
					<ProjectDetails
						project={project as ProjectData}
						totalFunding={totalFunding}
						fundingPercentage={fundingPercentage}
					/>
				</TabsContent>

				<TabsContent value="milestones">
					<ProjectMilestones
						projectId={project.id}
						milestones={project.milestones}
					/>
				</TabsContent>

				<TabsContent value="fundings">
					<ProjectFundings
						projectId={project.id}
						fundings={project.fundings}
						totalFunding={totalFunding}
						fundingGoal={project.fundingGoal}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
