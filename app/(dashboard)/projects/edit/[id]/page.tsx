"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Vote } from "@prisma/client";
import { Users, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommentsSection } from "./comments-section";
import { FundingSection } from "./funding-section";
import { MilestoneTracker } from "./milestone-tracker";
import { ProjectActions } from "./project-actions";
import { TeamSection } from "./team-section";
import { VotingSection } from "./voting-section";

type ValidationStatus = "PENDING" | "REJECTED" | "VALIDATED";

type Project = {
	id: string;
	userId: string;
	title: string;
	description: string;
	fundingGoal: number;
	category: string;
	bannerUrl: string | null;
	profileUrl: string | null;
	blockchainTx: string | null;
	ideaValidation: ValidationStatus;
	createdAt: string;
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
	votes: Vote[];
	teamMembers: {
		id: string;
		fullName: string;
		role: string;
		bio: string | null;
		profileImage: string | null;
		github: string | null;
		twitter: string | null;
		discord: string | null;
		linkedin: string | null;
		userId: string | null;
	}[];
	_count: {
		votes: number;
		teamMembers: number;
	};
};

export default function ProjectPage() {
	const params = useParams();
	const router = useRouter();
	const { data: session } = useSession();
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Check if user is a team member
	const isTeamMember =
		project?.userId === session?.user?.id ||
		project?.teamMembers.some((member) => member.userId === session?.user?.id);

	useEffect(() => {
		async function fetchProject() {
			try {
				const id = params?.id as string;
				if (!id) return;

				const response = await fetch(`/api/projects/${id}`);

				if (response.status === 404) {
					router.push("/projects");
					return;
				}

				if (!response.ok) {
					throw new Error("Failed to fetch project");
				}

				const data = await response.json();
				setProject(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchProject();
	}, [params, router]);

	if (loading) {
		return <div className="container py-8 text-center">Loading project...</div>;
	}

	if (error) {
		return (
			<div className="container py-8 text-center text-destructive">
				Error: {error}
			</div>
		);
	}

	if (!project) {
		return <div className="container py-8 text-center">Project not found</div>;
	}

	// Calculate validation progress - this is just an example
	const validationProgress =
		project.ideaValidation === "VALIDATED"
			? 100
			: project.ideaValidation === "REJECTED"
				? 0
				: Math.min(project._count.votes, 100);

	// Determine validation phase
	const getValidationPhase = () => {
		switch (project.ideaValidation) {
			case "VALIDATED":
				return "Phase 4 of 4";
			case "REJECTED":
				return "Rejected";
			case "PENDING":
				if (project._count.votes >= 75) return "Phase 3 of 4";
				if (project._count.votes >= 50) return "Phase 2 of 4";
				if (project._count.votes >= 25) return "Phase 1 of 4";
				return "Initial Phase";
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<div className="relative h-[200px] md:h-[300px] lg:h-[400px] w-full overflow-hidden">
				<Image
					src={project.bannerUrl || "/banner.png"}
					alt={`${project.title} Banner`}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
			</div>

			<div className="container relative z-10 -mt-32 px-4 sm:px-6 lg:px-8">
				<div className="rounded-xl bg-card p-6 shadow-lg">
					<div className="flex flex-col gap-6 md:flex-row md:items-start">
						<Avatar className="h-24 w-24 shrink-0 border-4 border-background md:h-32 md:w-32">
							<AvatarImage
								src={project.profileUrl || "/project.svg"}
								alt={project.title}
							/>
							<AvatarFallback>
								{project.title.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-1 flex-col gap-4">
							<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
								<div>
									<h1 className="text-2xl font-bold md:text-3xl">
										{project.title}
									</h1>
									<div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
										<Badge
											variant="secondary"
											className="flex items-center gap-1"
										>
											<Users className="h-3 w-3" /> {project._count.votes}{" "}
											Supporters
										</Badge>
										<Badge
											variant="secondary"
											className="flex items-center gap-1"
										>
											<Wallet className="h-3 w-3" /> $
											{project.fundingGoal.toLocaleString()} Goal
										</Badge>
									</div>
								</div>
								<ProjectActions isTeamMember={!!isTeamMember} />
							</div>

							{/* Progress Section */}
							<div className="rounded-lg bg-muted p-4">
								<div className="mb-2 flex items-center justify-between">
									<h3 className="font-semibold">Validation Progress</h3>
									<Badge>{getValidationPhase()}</Badge>
								</div>
								<Progress value={validationProgress} className="h-2" />
								<p className="mt-2 text-sm text-muted-foreground">
									{project.ideaValidation === "VALIDATED"
										? "Project has been validated and is now in funding stage"
										: project.ideaValidation === "REJECTED"
											? "Project did not receive enough community support"
											: "Currently in community validation phase"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<Tabs defaultValue="milestones" className="mt-6">
					<TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
						<TabsTrigger value="milestones">Milestones</TabsTrigger>
						<TabsTrigger value="funding">Funding</TabsTrigger>
						<TabsTrigger value="team">Team</TabsTrigger>
						<TabsTrigger value="voting">Voting</TabsTrigger>
						<TabsTrigger value="comments">Comments</TabsTrigger>
					</TabsList>

					<TabsContent value="funding">
						<FundingSection projectId={project.id} />
					</TabsContent>

					<TabsContent value="team">
						<TeamSection
							teamMembers={project.teamMembers}
							isTeamMember={!!isTeamMember}
							projectId={project.id}
						/>
					</TabsContent>

					<TabsContent value="voting">
						<VotingSection
							projectId={project.id}
							initialUserVoted={project.votes.some(
								(vote) => vote.userId === session?.user?.id,
							)}
							ideaValidation={project.ideaValidation}
							initialVoteCount={project._count.votes}
						/>
					</TabsContent>

					<TabsContent value="comments">
						<CommentsSection projectId={project.id} />
					</TabsContent>

					<TabsContent value="milestones">
						<MilestoneTracker
							isTeamMember={!!isTeamMember}
							projectId={project.id}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
