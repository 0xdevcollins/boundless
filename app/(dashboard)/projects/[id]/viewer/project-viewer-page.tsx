"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Vote } from "@prisma/client";
import {
	Calendar,
	Copy,
	Facebook,
	FileText,
	Heart,
	Linkedin,
	MessageCircle,
	Share2,
	Twitter,
	Users,
	Wallet,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ViewerComments } from "./viewer-comments";
import { ViewerFundingHorizontal } from "./viewer-funding";
import { ViewerMilestones } from "./viewer-milestones";
import { ViewerProjectStatus } from "./viewer-project-status";
import { ViewerTeam } from "./viewer-team";
import { ViewerVoting } from "./viewer-voting";

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
	pitchDeck: string | null;
	whitepaper: string | null;
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

export function ProjectViewerPage({ id }: { id: string }) {
	const router = useRouter();
	const { data: session } = useSession();
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProject() {
			try {
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
	}, [id, router]);

	const handleShare = async (platform?: string) => {
		if (!project) return;

		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent(`Check out ${project.title} on Boundless!`);
		const hashtags = encodeURIComponent("boundless,web3,blockchain");

		try {
			switch (platform) {
				case "twitter":
					window.open(
						`https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`,
						"_blank",
					);
					break;
				case "facebook":
					window.open(
						`https://www.facebook.com/dialog/share?app_id=YOUR_FB_APP_ID&href=${url}&quote=${text}`,
						"_blank",
					);
					break;
				case "linkedin":
					window.open(
						`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
						"_blank",
					);
					break;
				case "whatsapp":
					window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
					break;
				case "telegram":
					window.open(
						`https://t.me/share/url?url=${url}&text=${text}`,
						"_blank",
					);
					break;
				case "copy":
					await navigator.clipboard.writeText(window.location.href);
					toast.success("Link copied to clipboard!");
					break;
				default:
					if (navigator.share) {
						await navigator.share({
							title: project.title,
							text: `Check out ${project.title} on Boundless!`,
							url: window.location.href,
						});
					} else {
						await navigator.clipboard.writeText(window.location.href);
						toast.success("Link copied to clipboard!");
					}
			}
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				toast.error("Failed to share project");
			}
		}
	};

	if (loading) {
		return (
			<div className="container flex items-center justify-center min-h-[60vh]">
				<div className="text-center space-y-4">
					<div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
					<p className="text-muted-foreground">Loading project details...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container py-12 px-4">
				<Card className="border-destructive/50">
					<CardHeader>
						<CardTitle className="text-destructive">
							Error Loading Project
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{error}</p>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => router.push("/projects")}
						>
							Return to Projects
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="container py-12 px-4">
				<Card>
					<CardHeader>
						<CardTitle>Project Not Found</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline" onClick={() => router.push("/projects")}>
							Browse Projects
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	// Format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation breadcrumb */}

			{/* Project Banner with Overlay */}
			<div className="relative w-full h-[400px] rounded-lg overflow-hidden">
				<div className=" absolute left-0 top-0 z-10">
					<div className="container py-3 px-4">
						<div className="flex items-center text-sm text-muted-foreground">
							<Link
								href="/projects"
								className="text-white hover:text-foreground font-bold transition-colors"
							>
								Projects
							</Link>
							<span className="mx-2">/</span>
							<span className="font-semibold text-white/80">
								{project.title}
							</span>
						</div>
					</div>
				</div>
				<Image
					src={project.bannerUrl || "/banner.png"}
					alt={`${project.title} Banner`}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

				{/* Project Header Overlay */}
				<div className="absolute inset-0">
					<div className="container h-full px-4">
						<div className="flex flex-col justify-end h-full pb-8 gap-6">
							<div className="flex flex-col md:flex-row md:items-end gap-6">
								<Avatar className="h-24 w-24 border-4 border-background">
									<AvatarImage
										src={project.profileUrl || "/project.svg"}
										alt={project.title}
										className="object-cover object-center"
									/>
									<AvatarFallback>
										{project.title.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 text-white">
									<div className="flex flex-wrap gap-2 mb-2">
										<Badge
											variant="secondary"
											className="bg-white hover:bg-white/30"
										>
											{project.category}
										</Badge>
										<Badge
											variant={
												project.ideaValidation === "VALIDATED"
													? "default"
													: project.ideaValidation === "REJECTED"
														? "destructive"
														: "secondary"
											}
											className="bg-white hover:bg-white/30"
										>
											{project.ideaValidation}
										</Badge>
									</div>

									<h1 className="text-4xl font-bold mb-4">{project.title}</h1>

									<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
										<div className="flex items-center">
											<Calendar className="h-4 w-4 mr-1" />
											{formatDate(project.createdAt)}
										</div>
										<div className="flex items-center">
											<Users className="h-4 w-4 mr-1" />
											{project._count.votes} Supporters
										</div>
										<div className="flex items-center">
											<Wallet className="h-4 w-4 mr-1" />$
											{project.fundingGoal.toLocaleString()} Goal
										</div>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-3">
									<Button className="bg-white text-black hover:bg-white/90">
										<Heart className="mr-2 h-4 w-4" /> Support
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												className="border-white hover:bg-white/10"
											>
												<Share2 className="mr-2 h-4 w-4" /> Share
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-48">
											<DropdownMenuItem onClick={() => handleShare("twitter")}>
												<Twitter className="mr-2 h-4 w-4" />
												Share on X
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleShare("facebook")}>
												<Facebook className="mr-2 h-4 w-4" />
												Share on Facebook
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleShare("linkedin")}>
												<Linkedin className="mr-2 h-4 w-4" />
												Share on LinkedIn
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleShare("whatsapp")}>
												<MessageCircle className="mr-2 h-4 w-4" />
												Share on WhatsApp
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleShare("telegram")}>
												<MessageCircle className="mr-2 h-4 w-4" />
												Share on Telegram
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleShare("copy")}>
												<Copy className="mr-2 h-4 w-4" />
												Copy Link
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Project Status */}
			<div className="container px-4 -mt-4 relative z-10">
				<Card className="border-t-4 border-t-primary">
					<CardContent className="p-6">
						<ViewerProjectStatus project={project} />
					</CardContent>
				</Card>
			</div>

			{/* Funding Status - Horizontal */}
			<div className="container px-4 mt-8">
				<ViewerFundingHorizontal
					projectId={project.id}
					fundingGoal={project.fundingGoal}
				/>
			</div>

			{/* Main Content */}
			<div className="container px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Column */}
					<div className="lg:col-span-2 space-y-8">
						{/* About */}
						<Card className="h-auto">
							<CardHeader>
								<CardTitle>About the Project</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose max-w-none dark:prose-invert max-h-[300px] overflow-y-auto">
									<p>{project.description}</p>
								</div>

								<div className="mt-6">
									{project.pitchDeck ? (
										<Button
											variant="outline"
											className="mr-4"
											onClick={() =>
												window.open(project.pitchDeck || "", "_blank")
											}
										>
											<FileText className="mr-2 h-4 w-4" /> View Pitch Deck
										</Button>
									) : (
										<Button variant="outline" className="mr-4" disabled>
											<FileText className="mr-2 h-4 w-4" /> Pitch Deck
											Unavailable
										</Button>
									)}

									{project.whitepaper ? (
										<Button
											variant="outline"
											onClick={() =>
												window.open(project.whitepaper || "", "_blank")
											}
										>
											<FileText className="mr-2 h-4 w-4" /> View Whitepaper
										</Button>
									) : (
										<Button variant="outline" disabled>
											<FileText className="mr-2 h-4 w-4" /> Whitepaper
											Unavailable
										</Button>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Tabs */}
						<Tabs defaultValue="milestones">
							<TabsList className="w-full grid grid-cols-3">
								<TabsTrigger value="milestones">Milestones</TabsTrigger>
								<TabsTrigger value="team">Team</TabsTrigger>
								<TabsTrigger value="discussion">Discussion</TabsTrigger>
							</TabsList>

							<TabsContent value="milestones" className="mt-6">
								<ViewerMilestones projectId={project.id} />
							</TabsContent>

							<TabsContent value="team" className="mt-6">
								<ViewerTeam teamMembers={project.teamMembers} />
							</TabsContent>

							<TabsContent value="discussion" className="mt-6">
								<ViewerComments projectId={project.id} />
							</TabsContent>
						</Tabs>
					</div>

					{/* Sidebar */}
					<div className="space-y-8">
						{/* Creator */}
						<Card className="h-auto">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Project Creator</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarImage
											src={project.user.image || undefined}
											alt={project.user.name || "Creator"}
										/>
										<AvatarFallback>
											{project.user.name
												? project.user.name.substring(0, 2).toUpperCase()
												: "CR"}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">
											{project.user.name || "Anonymous"}
										</p>
										<p className="text-sm text-muted-foreground">
											Project Creator
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Voting */}
						<Card className="h-auto">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Community Voting</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<ViewerVoting
									projectId={project.id}
									voteCount={project._count.votes}
									userVoted={project.votes.some(
										(vote) => vote.userId === session?.user?.id,
									)}
									status={project.ideaValidation}
									// compact={true}
								/>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
