import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react"

type TeamMember = {
  id: string
  fullName: string
  role: string
  bio: string | null
  profileImage: string | null
  github: string | null
  twitter: string | null
  discord: string | null
  linkedin: string | null
}

type ViewerTeamProps = {
  teamMembers: TeamMember[]
}

export function ViewerTeam({ teamMembers }: ViewerTeamProps) {
  return (
    <Card className="h-[320px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Meet the people behind this project</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(320px-85px)] overflow-y-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage src={member.profileImage || undefined} alt={member.fullName} />
                    <AvatarFallback>{member.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                {member.bio && <p className="text-sm mb-4">{member.bio}</p>}

                <div className="flex flex-wrap gap-2">
                  {member.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" /> GitHub
                      </a>
                    </Button>
                  )}
                  {member.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-1" /> Twitter
                      </a>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                      </a>
                    </Button>
                  )}
                  {member.discord && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://discord.com/users/${member.discord}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="h-4 w-4 mr-1" /> Discord
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
