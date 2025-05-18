"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Markdown } from "@/components/ui/markdown"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ReviewFormProps {
  projectId: string
  projectTitle: string
  onApprove: (projectId: string, review: string) => Promise<void>
  onReject: (projectId: string, review: string) => Promise<void>
  onCancel: () => void
  isLoading: boolean
}

export function ReviewForm({ projectId, projectTitle, onApprove, onReject, onCancel, isLoading }: ReviewFormProps) {
  const [review, setReview] = useState("")
  const [activeTab, setActiveTab] = useState("write")
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

  const handleSubmit = async () => {
    if (action === "approve") {
      await onApprove(projectId, review)
    } else if (action === "reject") {
      await onReject(projectId, review)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Review Project: {projectTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {action && (
            <Alert variant={action === "approve" ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {action === "approve" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{action === "approve" ? "Approving Project" : "Rejecting Project"}</AlertTitle>
              </div>
              <AlertDescription className="mt-2">
                {action === "approve"
                  ? "Your review will be included in the approval notification email."
                  : "Please provide feedback on why this project is being rejected."}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-2">
              <Textarea
                placeholder="Write your review here... Markdown is supported."
                className="min-h-[200px] resize-none"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                disabled={isLoading}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-2">
              <div className="border rounded-md p-4 min-h-[200px] bg-background">
                {review ? (
                  <Markdown>{review}</Markdown>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Preview will appear here</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>This review will be sent to the project creator.</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={() => {
              setAction("reject")
              handleSubmit()
            }}
            disabled={isLoading}
          >
            Reject Project
          </Button>
          <Button
            onClick={() => {
              setAction("approve")
              handleSubmit()
            }}
            disabled={isLoading}
          >
            Approve Project
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
