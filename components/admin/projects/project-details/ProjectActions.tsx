"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Check, ChevronDown, X, Trash } from "lucide-react"
import { toast } from "sonner"

interface ProjectActionsProps {
  project: {
    id: string
    isApproved: boolean
    ideaValidation: string
  }
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleApproveProject = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/projects/${project.id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to approve project")
      }

      toast.success("Project approved",{
        description: "The project has been approved successfully.",
      })

      router.refresh()
    } catch (error) {
      toast.error( "Error",{
        description: "Failed to approve project. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectProject = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/projects/${project.id}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to reject project")
      }

      toast.warning("Project rejected",{
        description: "The project has been rejected successfully.",
      })

      router.refresh()
    } catch (error) {
      toast.error("Error",{
        description: "Failed to reject project. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      toast.warning("Project deleted",{
        description: "The project has been deleted successfully.",
      })

      router.push("/admin/projects")
    } catch (error) {
      toast("Error",{
        description: "Failed to delete project. Please try again.",
      })
    } finally {
      setIsLoading(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {!project.isApproved ? (
          <Button onClick={handleApproveProject} disabled={isLoading} className="gap-1">
            <Check className="h-4 w-4" />
            Approve
          </Button>
        ) : (
          <Button variant="outline" onClick={handleRejectProject} disabled={isLoading} className="gap-1">
            <X className="h-4 w-4" />
            Reject
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all associated data including
              team members, milestones, and fundings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
