import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Milestone } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface UserData {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
}

interface TeamMemberData {
	id: string;
	fullName: string;
	role: string;
	bio: string | null;
	profileImage: string | null;
	github: string | null;
	twitter: string | null;
	linkedin: string | null;
}

interface FundingData {
	status: "COMPLETED" | "PENDING";
	amount: number;
	user?: UserData;
}

export interface ProjectData {
	id: string;
	userId: string;
	title: string;
	description: string;
	bannerUrl: string | null;
	profileUrl: string | null;
	blockchainTx: string | null;
	category: string;
	createdAt: Date | string;
	isApproved: boolean;
	ideaValidation: "VALIDATED" | "REJECTED" | "PENDING";
	fundingGoal: number;
	pitchDeck: string | null;
	whitepaper: string | null;

	user: UserData;
	teamMembers: TeamMemberData[];
	fundings: FundingData[];
	milestones: Milestone[];
	_count: {
		votes: number;
		comments: number;
	};
}

interface ProjectDetailsProps {
	project: ProjectData;
	totalFunding: number;
	fundingPercentage: number;
}

export function ProjectDetails({
	project,
	totalFunding,
	fundingPercentage,
}: ProjectDetailsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-2 space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Project Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{project.bannerUrl && (
							<div className="relative h-48 w-full overflow-hidden rounded-lg">
								<Image
									src={project.bannerUrl || "/placeholder.svg"}
									alt={project.title}
									fill
									className="object-cover"
								/>
							</div>
						)}

						<div className="space-y-2">
							<h3 className="font-semibold">Description</h3>
							<p className="text-sm text-muted-foreground whitespace-pre-line">
								{project.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<h3 className="font-semibold">Category</h3>
								<p className="text-sm text-muted-foreground">
									{project.category}
								</p>
							</div>
							<div>
								<h3 className="font-semibold">Created</h3>
								<p className="text-sm text-muted-foreground">
									{format(new Date(project.createdAt), "PPP")}
								</p>
							</div>
							<div>
								<h3 className="font-semibold">Status</h3>
								<div className="flex gap-2 mt-1">
									<Badge variant={project.isApproved ? "default" : "outline"}>
										{project.isApproved ? "Approved" : "Pending"}
									</Badge>
									<Badge
										variant={
											project.ideaValidation === "VALIDATED"
												? "default"
												: project.ideaValidation === "REJECTED"
													? "destructive"
													: "outline"
										}
									>
										{project.ideaValidation.charAt(0) +
											project.ideaValidation.slice(1).toLowerCase()}
									</Badge>
								</div>
							</div>
							<div>
								<h3 className="font-semibold">Engagement</h3>
								<p className="text-sm text-muted-foreground">
									{project._count.votes} votes • {project._count.comments}{" "}
									comments
								</p>
							</div>
						</div>

						{(project.pitchDeck || project.whitepaper) && (
							<div className="space-y-2">
								<h3 className="font-semibold">Documents</h3>
								<div className="flex gap-4">
									{project.pitchDeck && (
										<a
											href={project.pitchDeck}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-blue-600 hover:underline"
										>
											Pitch Deck
										</a>
									)}
									{project.whitepaper && (
										<a
											href={project.whitepaper}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-blue-600 hover:underline"
										>
											Whitepaper
										</a>
									)}
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Team Members</CardTitle>
						<CardDescription>People working on this project</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{project.teamMembers.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									No team members added yet.
								</p>
							) : (
								project.teamMembers.map((member) => (
									<div key={member.id} className="flex items-start gap-4">
										<Avatar>
											<AvatarImage src={member.profileImage || undefined} />
											<AvatarFallback>
												{member.fullName.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-medium">{member.fullName}</h4>
											<p className="text-sm text-muted-foreground">
												{member.role}
											</p>
											{member.bio && (
												<p className="text-sm mt-1">{member.bio}</p>
											)}
											<div className="flex gap-3 mt-2">
												{member.github && (
													<a
														href={member.github}
														target="_blank"
														rel="noopener noreferrer"
														className="text-xs text-blue-600 hover:underline"
													>
														GitHub
													</a>
												)}
												{member.twitter && (
													<a
														href={member.twitter}
														target="_blank"
														rel="noopener noreferrer"
														className="text-xs text-blue-600 hover:underline"
													>
														Twitter
													</a>
												)}
												{member.linkedin && (
													<a
														href={member.linkedin}
														target="_blank"
														rel="noopener noreferrer"
														className="text-xs text-blue-600 hover:underline"
													>
														LinkedIn
													</a>
												)}
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Creator</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							<Avatar className="h-12 w-12">
								<AvatarImage src={project.user.image || undefined} />
								<AvatarFallback>
									{project.user.name?.charAt(0) || "U"}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-medium">{project.user.name}</h3>
								<p className="text-sm text-muted-foreground">
									{project.user.email}
								</p>
								<Link
									href={`/admin/users/${project.user.id}`}
									className="text-xs text-blue-600 hover:underline"
								>
									View Profile
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Funding Progress</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									${totalFunding.toLocaleString()} raised
								</span>
								<span className="text-sm text-muted-foreground">
									${project.fundingGoal.toLocaleString()} goal
								</span>
							</div>
							<Progress value={fundingPercentage} />
							<p className="text-sm text-muted-foreground text-right">
								{fundingPercentage}% funded
							</p>
						</div>

						<Separator />

						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm">Total Backers</span>
								<span className="font-medium">{project.fundings.length}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm">Completed Fundings</span>
								<span className="font-medium">
									{
										project.fundings.filter((f) => f.status === "COMPLETED")
											.length
									}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm">Pending Fundings</span>
								<span className="font-medium">
									{
										project.fundings.filter((f) => f.status === "PENDING")
											.length
									}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
