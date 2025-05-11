"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { ProjectFormValues } from "../types"

interface MilestonesStepProps {
  form: UseFormReturn<ProjectFormValues>
}

export function MilestonesStep({ form }: MilestonesStepProps) {
  const [openMilestones, setOpenMilestones] = useState<Record<string, boolean>>({})

  const toggleMilestone = (id: string) => {
    setOpenMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const addMilestone = () => {
    const milestones = form.getValues("milestones")
    const newMilestone = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      dueDate: "",
      progress: 0,
      color: "#6366f1", // Default indigo color
    }
    form.setValue("milestones", [...milestones, newMilestone])
    // Open the newly added milestone
    setOpenMilestones((prev) => ({
      ...prev,
      [newMilestone.id]: true,
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Project Milestones</h3>
        <p className="text-sm text-muted-foreground">Define your project roadmap and key milestones</p>
        <Separator className="my-3" />
      </div>

      <div className="space-y-3">
        {form.watch("milestones").length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 border border-dashed rounded-lg bg-muted/30">
            <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">No milestones added yet</p>
            <Button variant="outline" type="button" size="sm" className="mt-4" onClick={addMilestone}>
              <Plus className="mr-2 h-4 w-4" /> Add First Milestone
            </Button>
          </div>
        ) : (
          <>
            {form.watch("milestones").map((milestone, index) => (
              <Collapsible
                key={milestone.id}
                open={openMilestones[milestone.id]}
                onOpenChange={() => toggleMilestone(milestone.id)}
                className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/50"
              >
                <div className="flex items-center justify-between p-3 bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: form.watch(`milestones.${index}.color`) || "#6366f1",
                      }}
                    />
                    <h4 className="font-medium">
                      {form.watch(`milestones.${index}.title`) || `Milestone ${index + 1}`}
                    </h4>
                    {form.watch(`milestones.${index}.dueDate`) && (
                      <Badge variant="outline" className="text-xs">
                        {new Date(form.watch(`milestones.${index}.dueDate`) || "").toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      type="button"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        const milestones = form.getValues("milestones")
                        milestones.splice(index, 1)
                        form.setValue("milestones", milestones)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {openMilestones[milestone.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="p-3 space-y-3 border-t">
                    <FormField
                      control={form.control}
                      name={`milestones.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Title</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-8 text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`milestones.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-[60px] text-sm resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`milestones.${index}.dueDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium">Due Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="h-8 text-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`milestones.${index}.color`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium">Color</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="color"
                                  {...field}
                                  value={field.value || "#6366f1"}
                                  className="h-8 w-16 cursor-pointer rounded-md border p-1"
                                />
                                <div
                                  className="h-6 w-6 rounded-full border"
                                  style={{
                                    backgroundColor: field.value || "#6366f1",
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`milestones.${index}.progress`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-xs font-medium">Progress</FormLabel>
                            <span className="text-xs text-muted-foreground">{field.value || 0}%</span>
                          </div>
                          <FormControl>
                            <div className="space-y-1">
                              <Input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={field.value || 0}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary"
                                style={{
                                  background: `linear-gradient(to right, ${
                                    form.watch(`milestones.${index}.color`) || "#6366f1"
                                  } ${field.value || 0}%, var(--secondary) ${field.value || 0}%)`,
                                }}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <Button type="button" variant="outline" size="sm" className="w-full mt-2" onClick={addMilestone}>
              <Plus className="mr-2 h-4 w-4" /> Add Milestone
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
