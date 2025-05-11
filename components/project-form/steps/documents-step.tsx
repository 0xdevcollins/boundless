"use client"

import { Button } from "@/components/ui/button"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FileText, LinkIcon, Upload } from "lucide-react"
import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormValues } from "../types"

interface DocumentsStepProps {
  form: UseFormReturn<ProjectFormValues>
}

export function DocumentsStep({ form }: DocumentsStepProps) {
  const [activeTab, setActiveTab] = useState<Record<string, string>>({
    pitchDeck: "file",
    whitepaper: "file",
  })

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Project Documents</h3>
        <p className="text-sm text-muted-foreground">Upload your pitch deck and whitepaper</p>
        <Separator className="my-3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="pitchDeck"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Pitch Deck</FormLabel>
              <Tabs
                defaultValue="file"
                value={activeTab.pitchDeck}
                onValueChange={(value) => setActiveTab({ ...activeTab, pitchDeck: value })}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                  <TabsTrigger value="url">Enter URL</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-0">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors",
                      "hover:border-primary/50 hover:bg-muted/50 cursor-pointer",
                    )}
                    onClick={() => document.getElementById("pitch-deck-file")?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        document.getElementById("pitch-deck-file")?.click()
                      }
                    }}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, PPT, or PPTX (max 10MB)</p>
                    <Input
                      id="pitch-deck-file"
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    {field.value instanceof File && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{field.value.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(undefined)
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-0">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      type="url"
                      placeholder="https://example.com/pitch-deck.pdf"
                      className="border-0 p-0 shadow-none focus-visible:ring-0"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={typeof field.value === "string" ? field.value : ""}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription className="text-xs">Upload your project pitch deck (PDF, PPT, or PPTX)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whitepaper"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Whitepaper</FormLabel>
              <Tabs
                defaultValue="file"
                value={activeTab.whitepaper}
                onValueChange={(value) => setActiveTab({ ...activeTab, whitepaper: value })}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                  <TabsTrigger value="url">Enter URL</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-0">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors",
                      "hover:border-primary/50 hover:bg-muted/50 cursor-pointer",
                    )}
                    onClick={() => document.getElementById("whitepaper-file")?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        document.getElementById("whitepaper-file")?.click()
                      }
                    }}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF (max 10MB)</p>
                    <Input
                      id="whitepaper-file"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    {field.value instanceof File && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{field.value.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(undefined)
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="url" className="mt-0">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      type="url"
                      placeholder="https://example.com/whitepaper.pdf"
                      className="border-0 p-0 shadow-none focus-visible:ring-0"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={typeof field.value === "string" ? field.value : ""}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription className="text-xs">Upload your project whitepaper (PDF)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
