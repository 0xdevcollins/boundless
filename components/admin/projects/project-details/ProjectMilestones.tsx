"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Check, MoreHorizontal, X, FileText } from "lucide-react"
import { toast } from "sonner"

interface Attachment {
  id: string
  fileName: string
  fileUrl: string
  fileType: string
}

interface Milestone {
  id: string
  title: string
  description: string
  status: string
  dueDate: string | null
  progress: number
  color: string | null
  attachments: Attachment[]
}

interface ProjectMilestonesProps {
  projectId: string
  milestones: Milestone[]
}

export function ProjectMilestones({ projectId, milestones }: ProjectMilestonesProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const handleUpdateStatus = async (milestoneId: string, status: string) => {
    setIsLoading(milestoneId)
    try {
      const response = await fetch(`/api/admin/milestones/${milestoneId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update milestone status to ${status}`)
      }

      toast.success( "Milestone updated",{
        description: `The milestone status has been updated to ${status.toLowerCase()}.`,
      })

      router.refresh()
    } catch (error) {
      toast.error("Error",{
        description: "Failed to update milestone status. Please try again.",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-500">Completed</Badge>
      case "IN_PROGRESS":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <>
      <div className="space-y-6">
        {milestones.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No milestones have been created for this project yet.
            </CardContent>
          </Card>
        ) : (
          milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(milestone.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedMilestone(milestone)
                            setShowDetailsDialog(true)
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {milestone.status !== "COMPLETED" && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(milestone.id, "COMPLETED")}
                            disabled={isLoading === milestone.id}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                        {milestone.status !== "IN_PROGRESS" && milestone.status !== "COMPLETED" && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(milestone.id, "IN_PROGRESS")}
                            disabled={isLoading === milestone.id}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as In Progress
                          </DropdownMenuItem>
                        )}
                        {milestone.status !== "REJECTED" && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(milestone.id, "REJECTED")}
                            disabled={isLoading === milestone.id}
                            className="text-red-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject Milestone
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{milestone.description}</p>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    {milestone.dueDate && (
                      <span className="text-muted-foreground">Due: {format(new Date(milestone.dueDate), "PPP")}</span>
                    )}
                    {milestone.attachments.length > 0 && (
                      <span className="text-muted-foreground">
                        {milestone.attachments.length} attachment{milestone.attachments.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {selectedMilestone && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMilestone.title}</DialogTitle>
              <DialogDescription>Milestone details and attachments</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Status</h4>
                {getStatusBadge(selectedMilestone.status)}
              </div>

              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-sm whitespace-pre-line">{selectedMilestone.description}</p>
              </div>

              {selectedMilestone.dueDate && (
                <div>
                  <h4 className="font-medium mb-1">Due Date</h4>
                  <p className="text-sm">{format(new Date(selectedMilestone.dueDate), "PPP")}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-1">Progress</h4>
                <div className="space-y-1">
                  <Progress value={selectedMilestone.progress} className="h-2" />
                  <p className="text-sm text-right">{selectedMilestone.progress}%</p>
                </div>
              </div>

              {selectedMilestone.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {selectedMilestone.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm">{attachment.fileName}</span>
                        <a
                          href={attachment.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <div className="flex gap-2">
                {selectedMilestone.status !== "COMPLETED" && (
                  <Button
                    onClick={() => handleUpdateStatus(selectedMilestone.id, "COMPLETED")}
                    disabled={isLoading === selectedMilestone.id}
                    className="gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Mark as Completed
                  </Button>
                )}
                {selectedMilestone.status !== "IN_PROGRESS" && selectedMilestone.status !== "COMPLETED" && (
                  <Button
                    onClick={() => handleUpdateStatus(selectedMilestone.id, "IN_PROGRESS")}
                    disabled={isLoading === selectedMilestone.id}
                    className="gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Mark as In Progress
                  </Button>
                )}
                {selectedMilestone.status !== "REJECTED" && (
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedMilestone.id, "REJECTED")}
                    disabled={isLoading === selectedMilestone.id}
                    className="gap-1"
                  >
                    <X className="h-4 w-4" />
                    Reject Milestone
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
