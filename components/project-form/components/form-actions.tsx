'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { ProjectFormValues } from '../types';
import { ProjectPreview } from './project-preview';

interface FormActionsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  formData: ProjectFormValues;
}

export function FormActions({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
  showPreview,
  setShowPreview,
  formData,
}: FormActionsProps) {
  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentStep === 1 || isSubmitting}
          className="h-8"
        >
          Previous
        </Button>
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5" disabled={isSubmitting}>
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Project Preview</DialogTitle>
              <DialogDescription>This is how your project will appear to others</DialogDescription>
            </DialogHeader>
            <ProjectPreview formData={formData} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        {currentStep === totalSteps ? (
          <Button type="button" size="sm" className="h-8" disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? 'Initializing...' : 'Initialize Project'}
          </Button>
        ) : (
          <Button type="button" size="sm" className="h-8" onClick={onNext} disabled={isSubmitting}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
