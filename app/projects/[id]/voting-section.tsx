"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown } from "lucide-react"

export function VotingSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Voting Round</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Technical Feasibility Review</h4>
              <p className="text-sm text-muted-foreground">
                Community voting on project's technical implementation plan
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Yes Votes: 75%</span>
                <span>No Votes: 25%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" /> Vote Yes
              </Button>
              <Button className="flex-1" variant="outline">
                <ThumbsDown className="mr-2 h-4 w-4" /> Vote No
              </Button>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium">Voting ends in: 3 days</p>
              <p className="text-muted-foreground">Minimum participation required: 100 votes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Voting Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Initial Proposal</h4>
                  <p className="text-sm text-muted-foreground">Completed on Jan 15, 2024</p>
                </div>
                <Badge variant="secondary">Passed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

