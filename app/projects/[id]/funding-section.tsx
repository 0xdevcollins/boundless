"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wallet } from "lucide-react"

export function FundingSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={70} className="h-2" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-medium">Raised</div>
                <div className="text-2xl font-bold">$70,000</div>
                <div className="text-sm text-muted-foreground">of $100,000 goal</div>
              </div>
              <div>
                <div className="text-sm font-medium">Time Remaining</div>
                <div className="text-2xl font-bold">12 days</div>
                <div className="text-sm text-muted-foreground">Campaign ends on Feb 21, 2024</div>
              </div>
            </div>

            <Button className="w-full">
              <Wallet className="mr-2 h-4 w-4" /> Fund this Project
            </Button>

            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium">Funding Terms</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>• Minimum contribution: $50</li>
                <li>• Soft cap: $50,000</li>
                <li>• Hard cap: $100,000</li>
                <li>• Funds released based on milestone completion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <div className="font-medium">Anonymous Backer</div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
                <div className="font-medium">$1,000</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

