import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface RecentProjectsProps {
  projects: any[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {project.bannerUrl ? (
                    <img 
                      src={project.bannerUrl || "/placeholder.svg"} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-xs">No img</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/admin/projects/${project.id}`}
                    className="text-sm font-medium hover:underline truncate block"
                  >
                    {project.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={project.user?.image || "/placeholder.svg"} alt={project.user?.name} />
                      <AvatarFallback>{project.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate">
                      {project.user?.name || "Unknown user"}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <Badge variant={project.isApproved ? "default" : "outline"}>
                    {project.isApproved ? "Approved" : "Pending"}
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    {/* {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })} */}
                  </span>
                </div>
              </div>
            ))
          )}
          
          <div className="pt-2">
            <Link 
              href="/admin/projects"
              className="text-sm text-primary hover:underline"
            >
              View all projects
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
