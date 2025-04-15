"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { VoteButton } from "../shared/vote-button"
import { useProjectAuth } from "@/hooks/useProjectAuth"

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
}

export function ProjectCard({ project, userVoted }: ProjectCardProps) {
    const projectOwnerLink = `/projects/edit/${project.id}`
    const projectViewerLink = `/projects/${project.id}`
    const { isOwner, isLoading } = useProjectAuth({
        projectId: project.id,
        projectUserId: project.userId,
    })

 

    return (
        <Card key={project.id} className="h-full hover:shadow-lg transition-shadow">
            <Link href={isLoading ? "#" : (isOwner ? projectOwnerLink : projectViewerLink)} className="block">
                {project.bannerUrl ? (
                    <div className="relative w-full h-32 overflow-hidden">
                        <Image src={project.bannerUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-full h-32 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No banner image</span>
                    </div>
                )}

                <CardHeader className="relative p-3 pb-0">
                    {project.profileUrl && (
                        <div className="absolute -top-8 left-3 w-12 h-12 rounded-full overflow-hidden border-2 border-background">
                            <Image
                                src={project.profileUrl || "/placeholder.svg"}
                                alt={`${project.title} profile`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-base line-clamp-1">{project.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{project.description}</p>
                    </div>
                </CardHeader>
            </Link>

            <CardFooter className="flex flex-col items-start gap-1 p-3 pt-0">
                <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                        {project.category.slice(0, 1).toUpperCase() + project.category.slice(1).toLowerCase()}
                    </Badge>
                    <Badge
                        variant={
                            project.ideaValidation === "VALIDATED"
                                ? "default"
                                : project.ideaValidation === "REJECTED"
                                    ? "destructive"
                                    : "secondary"
                        }
                        className="text-xs px-1.5 py-0"
                    >
                        {formatValidationStatus(project.ideaValidation)}
                    </Badge>
                </div>
                <div className="text-xs mb-2 flex gap-12 justify-between items-center">
                    <span className="font-medium">
                        {project.ideaValidation === "VALIDATED" ? "FUNDING STAGE" : "IDEA VALIDATION STAGE"}
                    </span>
                    <div className="text-xs">
                        <span className="font-bold mr-1">Creator</span>
                        <span className="text-muted-foreground p-1 rounded-xl border">
                            {project.user.name && project.user.name}
                        </span>
                    </div>
                </div>

                {/* Vote Button - only show if project is in PENDING state */}
                {project.ideaValidation === "PENDING" && (
                    <div className="w-full mt-2 pt-2 border-t">
                        {isLoading ? (
                            <div className="flex justify-center py-2">
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

function formatValidationStatus(status: ValidationStatus | null | undefined) {
    if (!status) return "Unknown"
    return status.charAt(0) + status.slice(1).toLowerCase()
}
