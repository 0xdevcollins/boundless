"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Vote } from "@prisma/client"
import { Calendar, FileText, Heart, Share2, Users, Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ViewerComments } from "./viewer-comments"
import { ViewerFundingHorizontal } from "./viewer-funding"
import { ViewerMilestones } from "./viewer-milestones"
import { ViewerProjectStatus } from "./viewer-project-status"
import { ViewerTeam } from "./viewer-team"
import { ViewerVoting } from "./viewer-voting"

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
  votes: Vote[]
  teamMembers: {
    id: string
    fullName: string
    role: string
    bio: string | null
    profileImage: string | null
    github: string | null
    twitter: string | null
    discord: string | null
    linkedin: string | null
    userId: string | null
  }[]
  _count: {
    votes: number
    teamMembers: number
  }
}

export function ProjectViewerPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const id = params?.id as string
        if (!id) return

        const response = await fetch(`/api/projects/${id}`)

        if (response.status === 404) {
          router.push("/projects")
          return
        }

        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }

        const data = await response.json()
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params, router])

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 px-4">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/projects")}>
              Return to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation breadcrumb */}
      <div className="bg-background border-b">
        <div className="container py-3 px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-foreground">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-muted">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={project.profileUrl || "/project.svg"} alt={project.title} />
              <AvatarFallback>{project.title.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{project.category}</Badge>
                <Badge
                  variant={
                    project.ideaValidation === "VALIDATED"
                      ? "default"
                      : project.ideaValidation === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {project.ideaValidation}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold">{project.title}</h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(project.createdAt)}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {project._count.votes} Supporters
                </div>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-1" />${project.fundingGoal.toLocaleString()} Goal
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <Button>
                <Heart className="mr-2 h-4 w-4" /> Support
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Banner */}
      <div className="w-full h-[300px] relative">
        <Image
          src={project.bannerUrl || "/banner.png"}
          alt={`${project.title} Banner`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Project Status */}
      <div className="container px-4 -mt-8 relative z-10">
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-6">
            <ViewerProjectStatus project={project} />
          </CardContent>
        </Card>
      </div>

      {/* Funding Status - Horizontal */}
      <div className="container px-4 mt-8">
        <ViewerFundingHorizontal projectId={project.id} fundingGoal={project.fundingGoal} />
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
                  <Button variant="outline" className="mr-4">
                    <FileText className="mr-2 h-4 w-4" /> View Pitch Deck
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" /> View Whitepaper
                  </Button>
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
                    <AvatarImage src={project.user.image || undefined} alt={project.user.name || "Creator"} />
                    <AvatarFallback>
                      {project.user.name ? project.user.name.substring(0, 2).toUpperCase() : "CR"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.user.name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground">Project Creator</p>
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
                  userVoted={project.votes.some((vote) => vote.userId === session?.user?.id)}
                  status={project.ideaValidation}
                  // compact={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
