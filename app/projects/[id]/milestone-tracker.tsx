"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, Clock, AlertCircle } from "lucide-react"

interface MilestoneTrackerProps {
  isTeamMember: boolean
}

export function MilestoneTracker({ isTeamMember }: MilestoneTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Milestones</CardTitle>
          {isTeamMember && (
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Milestone
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Completed Milestone */}
          <div className="flex gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
              <Check className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Initial Planning</h4>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Project scope and timeline defined</p>
            </div>
          </div>

          {/* Current Milestone */}
          <div className="flex gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Development Phase</h4>
                <Badge>In Progress</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Core features implementation</p>
              {isTeamMember && (
                <Button variant="outline" size="sm">
                  Submit for Review
                </Button>
              )}
            </div>
          </div>

          {/* Upcoming Milestone */}
          <div className="flex gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Testing & Launch</h4>
                <Badge variant="secondary">Upcoming</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Final testing and public launch</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

