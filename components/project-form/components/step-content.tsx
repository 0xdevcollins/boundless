import * as React from "react"
import { cn } from "@/lib/utils"

interface StepContentProps {
  title: string
  description?: string
  isActive: boolean
}

export const StepContent = React.memo(function StepContent({ title, description, isActive }: StepContentProps) {
  return (
    <div className="bg-muted rounded-lg px-6 py-4">
      <h3 className={cn("text-lg font-medium", isActive ? "text-primary" : "text-zinc-900 dark:text-zinc-200")}>
        {title}
      </h3>
      {description && <p className="text-sm text-zinc-600 dark:text-zinc-500">{description}</p>}
    </div>
  )
})
