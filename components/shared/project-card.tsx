"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { VoteButton } from "../shared/vote-button"
import { useProjectAuth } from "@/hooks/useProjectAuth"
import { Progress } from "@/components/ui/progress"
import { cn, formatValidationStatus } from "@/lib/utils"

type ValidationStatus = "PENDING" | "REJECTED" | "VALIDATED"

type Project = {
    id: string
    userId: string
    title: string
    description: string
    fundingGoal: number
    category: string
    bannerUrl: string | null
    profileUrl: string | null
    blockchainTx: string | null
    ideaValidation: ValidationStatus
    createdAt: string
    user: {
        id: string
        name: string | null
        image: string | null
    }
    votes: {
        id: string
        userId: string
    }[]
    _count: {
        votes: number
    }
}

interface ProjectCardProps {
    project: Project
    userVoted: boolean
    linkPath?: string
    className?: string
}

export function ProjectCard({ project, userVoted, className }: ProjectCardProps) {
    const { isOwner, isLoading } = useProjectAuth({
        projectId: project.id,
        projectUserId: project.userId,
    })
    const projectLink = isLoading
        ? "#"
        : isOwner
            ? `/projects/edit/${project.id}`
            : `/projects/${project.id}`;
    return (
        <Card
            className={cn(
                "h-full relative transition-all hover:shadow-md hover:-translate-y-1 overflow-hidden",
                "border-border/50 dark:border-border/80",
                className
            )}
        >
            <Link
                href={projectLink}
                className="block group"
            >
                {/* Banner Image */}
                {project.bannerUrl ? (
                    <div className="relative w-full h-40 overflow-hidden">
                        <Image
                            src={project.bannerUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">No banner image</span>
                    </div>
                )}

                {/* Profile Image */}
                {project.profileUrl && (
                    <div className="absolute top-6 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-background z-10">
                        <Image
                            src={project.profileUrl}
                            alt={`${project.title} profile`}
                            width={60}
                            height={60}
                            className="object-cover"
                        />
                    </div>
                )}
            </Link>

            <CardContent className="p-4 pt-3">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                            {project.title}
                        </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-3 p-4 pt-0">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 w-full">
                    <Badge
                        variant="secondary"
                        className="text-xs px-2 py-1 capitalize"
                    >
                        {project.category.toLowerCase()}
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

                {/* Progress Bar (optional - if you have funding data) */}
                {/* <Progress value={50} className="h-2 w-full" /> */}

                {/* Status & Creator */}
                <div className="flex justify-between items-center w-full text-xs">
                    <span className="font-medium text-foreground/80">
                        {project.ideaValidation === "VALIDATED"
                            ? "Funding Stage"
                            : "Validation Stage"}
                    </span>
                    {isOwner && project.user.name && (
                        <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">By</span>
                            <span className="font-medium">
                                {project.user.name}
                            </span>
                        </div>
                    )}
                </div>

                {/* Vote Button */}
                {project.ideaValidation === "PENDING" && (
                    <div className="w-full mt-2 pt-3 border-t">
                        {isLoading ? (
                            <div className="flex justify-center py-1">
                                <span className="text-xs text-muted-foreground">Loading...</span>
                            </div>
                        ) : (
                            !isOwner && (
                                <VoteButton
                                    projectId={project.id}
                                    initialVoteCount={project._count.votes}
                                    initialUserVoted={userVoted}
                                />
                            )
                        )}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}