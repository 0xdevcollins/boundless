"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useProjectAuth } from "@/hooks/useProjectAuth";
import {
	calculateDaysLeft,
	calculateFundingPercentage,
	cn,
	formatValidationStatus,
} from "@/lib/utils";
import type { Project } from "@/types/project";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
	project: Project;
	className?: string;
}

export function PublicProjectCard({ project, className }: ProjectCardProps) {
	const { isOwner, isLoading } = useProjectAuth({
		projectId: project.id,
		projectUserId: project.userId,
	});

	const projectLink = isLoading
		? "#"
		: isOwner
			? `/projects/edit/${project.id}`
			: `/projects/${project.id}`;

	const isFunded = project.ideaValidation === "VALIDATED";
	const daysLeft = calculateDaysLeft(project.createdAt);
	const fundingPercentage = calculateFundingPercentage(project);

	return (
		<Card
			className={cn(
				"h-full flex relative flex-col hover:shadow-lg transition-all duration-300 border border-border",
				className,
			)}
		>
			{/* Banner Image */}
			<Link href={projectLink} className="block">
				{project.bannerUrl ? (
					<div className="relative w-full h-40 overflow-hidden">
						<Image
							src={project.bannerUrl}
							alt={project.title}
							fill
							className="object-cover"
						/>
					</div>
				) : (
					<div className="w-full h-40 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
						<span className="text-muted-foreground text-sm">
							No banner image
						</span>
					</div>
				)}
			</Link>

			{/* Profile Image */}
			{project.profileUrl && (
				<div className="absolute top-2 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-background z-10">
					<Image
						src={project.profileUrl}
						alt={`${project.title} profile`}
						width={48}
						height={48}
						className="object-cover"
					/>
				</div>
			)}

			<CardHeader className="pb-2 relative pt-4">
				<div className="flex justify-between items-start">
					<Badge variant="secondary" className="text-xs px-2 py-1 capitalize">
						{project.category.toLowerCase()}
					</Badge>
					{isFunded && daysLeft > 0 && (
						<div className="flex items-center text-sm text-muted-foreground">
							<Clock className="h-4 w-4 mr-1" />
							<span className={daysLeft <= 5 ? "text-amber-500" : ""}>
								{daysLeft} days left
							</span>
						</div>
					)}
				</div>

				<h3 className="font-semibold text-xl mt-4">
					<Link href={projectLink} className="hover:underline">
						{project.title}
					</Link>
				</h3>
			</CardHeader>

			<CardContent className="flex-1">
				<p className="text-muted-foreground text-sm line-clamp-3">
					{project.description}
				</p>

				{/* Funding Status - Only shown when validated */}
				{isFunded && (
					<div className="mt-6">
						<div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
							<motion.div
								className="h-full bg-primary"
								initial={{ width: 0 }}
								whileInView={{ width: `${fundingPercentage}%` }}
								viewport={{ once: true }}
								transition={{
									duration: 1,
									ease: "easeOut",
									delay: 0.2,
								}}
							/>
						</div>
						<div className="flex justify-between mt-2 text-sm">
							<div className="flex items-center">
								{fundingPercentage >= 80 && (
									<Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1" />
								)}
								<span className={fundingPercentage >= 80 ? "font-medium" : ""}>
									{fundingPercentage}% funded
								</span>
							</div>
						</div>
					</div>
				)}
				{!isFunded && (
					<div className="flex gap-2 mt-2">
						<Badge variant="secondary" className="text-xs px-2 py-1 capitalize">
							{project._count.votes} votes
						</Badge>
						<Badge
							variant={
								project.ideaValidation === "VALIDATED"
									? "default"
									: project.ideaValidation === "REJECTED"
										? "destructive"
										: "secondary"
							}
							className="text-xs px-2 py-1"
						>
							{formatValidationStatus(project.ideaValidation)}
						</Badge>
					</div>
				)}
			</CardContent>

			<CardFooter>
				<Button
					className="w-full group relative overflow-hidden"
					variant={isFunded && fundingPercentage >= 80 ? "default" : "outline"}
				>
					<Link
						href={projectLink}
						className="w-full flex items-center justify-center"
					>
						{isOwner ? "Manage project" : "View project"}
					</Link>
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/50"
						initial={{ scaleX: 0 }}
						whileHover={{ scaleX: 1 }}
						transition={{ duration: 0.3 }}
					/>
				</Button>
			</CardFooter>
		</Card>
	);
}
