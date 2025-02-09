import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Wallet, Plus } from "lucide-react"
import Image from "next/image"
import { ProjectActions } from "./project-actions"
import { MilestoneTracker } from "./milestone-tracker"
import { VotingSection } from "./voting-section"
import { FundingSection } from "./funding-section"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const isTeamMember = true // This would come from your auth logic to be handled by Benjamin

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative h-[200px] md:h-[300px] lg:h-[400px] w-full overflow-hidden">
        <Image src="/banner.png" alt="Project Banner" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 -mt-32 px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-card p-6 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-background md:h-32 md:w-32">
              <AvatarImage src="/project.svg" alt="Project" />
              <AvatarFallback>PJ</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold md:text-3xl">Project Name</h1>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> 50 Supporters
                    </Badge>
                    {/* <Badge variant="secondary" className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> 1.5k Points
                    </Badge> */}
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Wallet className="h-3 w-3" /> 50 Funded
                    </Badge>
                  </div>
                </div>
                <ProjectActions isTeamMember={isTeamMember} />
              </div>

              {/* Progress Section */}
              <div className="rounded-lg bg-muted p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Validation Progress</h3>
                  <Badge>Phase 4 of 4</Badge>
                </div>
                <Progress value={100} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">Currently in Technical Review Phase</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>About the Project</h3>
                  <p>Detailed project description...</p>

                  <h4>Project Goals</h4>
                  <ul>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                    <li>Goal 3</li>
                  </ul>

                  <h4>Resources</h4>
                  <div className="not-prose grid gap-4 md:grid-cols-2">
                    <Button variant="outline" className="w-full">
                      View Pitch Deck
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Whitepaper
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="mt-6">
            <MilestoneTracker isTeamMember={isTeamMember} />
          </TabsContent>

          <TabsContent value="voting" className="mt-6">
            <VotingSection />
          </TabsContent>

          <TabsContent value="funding" className="mt-6">
            <FundingSection />
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  {isTeamMember && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Member
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Team Member Name</div>
                        <div className="text-sm text-muted-foreground">Role</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

