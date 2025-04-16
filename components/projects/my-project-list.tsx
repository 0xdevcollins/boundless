"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { ProjectCard } from "../shared/project-card"
import { useProjects } from "@/store/useProjectStore"

export function MyProjectsList() {
  const { projects, isLoading, error, fetchProjects } = useProjects()
  const { data: session } = useSession()
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false)

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects(true);
      setHasAttemptedFetch(true);
    };
    
    loadProjects();
  }, [fetchProjects]);

  if (isLoading || !hasAttemptedFetch) {
    return <div className="text-center py-10">Loading projects...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-destructive">Error: {error}</div>
  }

  if (!projects.length) {
    return <div className="text-center py-10">No projects found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const userVoted = session?.user?.id 
          ? project.votes.some((vote) => vote.userId === session.user?.id) 
          : false

        return (
          <ProjectCard
            key={project.id}
            project={project}
            userVoted={userVoted}
          />
        )
      })}
    </div>
  )
}
