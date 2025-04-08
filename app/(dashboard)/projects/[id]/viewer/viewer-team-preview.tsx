import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type TeamMember = {
  id: string
  fullName: string
  role: string
  profileImage: string | null
}

type TeamPreviewProps = {
  teamMembers: TeamMember[]
}

export function ViewerTeamPreview({ teamMembers }: TeamPreviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Team Members</CardTitle>
        <CardDescription>{teamMembers.length} people working on this project</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[300px] overflow-y-auto px-6 pb-6">
          {teamMembers.slice(0, 3).map((member) => (
            <div key={member.id} className="flex items-center space-x-3 py-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.profileImage || undefined} alt={member.fullName} />
                <AvatarFallback>{member.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.fullName}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
          {teamMembers.length > 3 && (
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View All Team Members
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
