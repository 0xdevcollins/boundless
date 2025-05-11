import { Card, CardContent } from "@/components/ui/card"
import type { UseFormReturn } from "react-hook-form"
import { BasicInfoStep } from "../steps/basic-info-step"
import { DocumentsStep } from "../steps/documents-step"
import { MilestonesStep } from "../steps/milestones-step"
import { ReviewStep } from "../steps/review-step"
import { TeamStep } from "../steps/team-step"
import type { ProjectFormValues } from "../types"
import type { ReactNode } from "react"

interface FormContentProps {
  form: UseFormReturn<ProjectFormValues>
  currentStep: number
  xlmPrice: number | null
  formActions: ReactNode
}

export function FormContent({ form, currentStep, xlmPrice, formActions }: FormContentProps) {
  // Get the current step component
  const getCurrentStepComponent = () => {
    const stepIndex = currentStep - 1
    switch (stepIndex) {
      case 0:
        return <BasicInfoStep form={form} xlmPrice={xlmPrice} />
      case 1:
        return <TeamStep form={form} />
      case 2:
        return <MilestonesStep form={form} />
      case 3:
        return <DocumentsStep form={form} />
      case 4:
        return <ReviewStep formData={form.getValues()} />
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden md:w-2/3 w-full h-auto">
      <CardContent className="p-6 space-y-4">
        <div className="rounded-lg p-6 transition-all duration-200" key={currentStep}>
          {getCurrentStepComponent()}
        </div>

        {formActions}
      </CardContent>
    </Card>
  )
}
