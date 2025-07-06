'use client';

import { Form } from '@/components/ui/form';
import { getXLMPrice } from '@/utils/price';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from './components/form-actions';
import { FormContent } from './components/form-content';
import { ProgressTracker } from './components/progress-tracker';
import { StepNavigation } from './components/step-navigation';
import { type ProjectFormValues, projectFormSchema, steps } from './types';

export function CampaignForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [xlmPrice, setXLMPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      userId: '',
      walletAddress: '',
      teamMembers: [],
      milestones: [],
      pitchDeck: undefined,
      whitepaper: undefined,
    },
    mode: 'onChange',
  });

  // Fetch XLM price on component mount
  useEffect(() => {
    const fetchXLMPrice = async () => {
      try {
        const price = await getXLMPrice();
        setXLMPrice(price);
      } catch (error) {
        console.error('Failed to fetch XLM price:', error);
      }
    };
    fetchXLMPrice();
  }, []);

  // Calculate step completion
  const getStepCompletion = (step: number): boolean => {
    const fields = getFieldsForStep(step - 1);
    const values = form.getValues();
    return fields.every((field) => {
      const value = values[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    });
  };

  // Calculate overall progress
  const calculateProgress = () => {
    const totalSteps = steps.length - 1; // Exclude review step
    const completedSteps = steps.slice(0, -1).filter((_, index) => getStepCompletion(index + 1)).length;
    return (completedSteps / totalSteps) * 100;
  };

  const handleNavigation = async (step: number) => {
    if (step < 1 || step > steps.length) return;

    // If moving to review step, check if all previous steps are completed
    if (step === steps.length) {
      let allStepsCompleted = true;
      for (let i = 1; i < step; i++) {
        if (!getStepCompletion(i)) {
          allStepsCompleted = false;
          break;
        }
      }

      if (allStepsCompleted) {
        setCurrentStep(step);
      } else {
        toast.error('Please complete all previous steps before proceeding to review');
      }
      return;
    }

    // If moving forward, validate current step
    if (step > currentStep) {
      const fields = getFieldsForStep(currentStep - 1);
      const isValid = await form.trigger(fields);
      if (isValid) {
        setCurrentStep(step);
      } else {
        toast.error('Please fill in all required fields before proceeding');
      }
    } else {
      // Moving backward is always allowed
      setCurrentStep(step);
    }
  };

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      setIsSubmitting(true);

      // Create form data for file uploads
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('fundingGoal', String(data.fundingGoal));
      formData.append('category', data.category);

      // Handle image uploads
      if (data.bannerImage instanceof File) {
        formData.append('bannerImage', data.bannerImage);
      } else if (typeof data.bannerImage === 'string') {
        formData.append('bannerImageUrl', data.bannerImage);
      }

      if (data.profileImage instanceof File) {
        formData.append('profileImage', data.profileImage);
      } else if (typeof data.profileImage === 'string') {
        formData.append('profileImageUrl', data.profileImage);
      }

      // Add team members if any
      // if (data.teamMembers.length > 0) {
      //   formData.append('teamMembers', JSON.stringify(data.teamMembers));
      // }

      // Add milestones if any
      if (data.milestones.length > 0) {
        formData.append('milestones', JSON.stringify(data.milestones));
      }

      // Add documents if any
      if (data.pitchDeck instanceof File) {
        formData.append('pitchDeck', data.pitchDeck);
      } else if (typeof data.pitchDeck === 'string') {
        formData.append('pitchDeckUrl', data.pitchDeck);
      }

      if (data.whitepaper instanceof File) {
        formData.append('whitepaper', data.whitepaper);
      } else if (typeof data.whitepaper === 'string') {
        formData.append('whitepaperUrl', data.whitepaper);
      }

      // Initialize the project using the new init endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/campaigns`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || error.error || 'Failed to create campaign');
      }

      const { project, message } = await response.json();

      toast.success('Campaign created successfully', {
        description: message || 'Your campaign has been created.',
      });
      router.push(`/projects/${project.id}/#campaigns`);
    } catch (error: unknown) {
      console.error('Failed to create campaign:', error);
      toast.error('Failed to create campaign', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldsForStep = (step: number): (keyof ProjectFormValues)[] => {
    switch (step) {
      case 0: // Basic Info
        return ['title', 'description'];
      case 1: // Funding goal
        // return ['teamMembers'];
        return ['fundingGoal', 'category'];
      case 2: // Milestones
        return ['milestones'];
      case 3: // Documents
        return ['pitchDeck', 'whitepaper'];
      default:
        return [];
    }
  };

  return (
    <Form {...form}>
      <form
        onKeyDown={(e) => {
          // Prevent form submission on Enter key
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="space-y-8"
      >
        {/* Progress Bar */}
        <ProgressTracker progress={calculateProgress()} />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Step Navigation Cards */}
          <StepNavigation
            steps={steps}
            currentStep={currentStep}
            getStepCompletion={getStepCompletion}
            onNavigate={handleNavigation}
          />

          {/* Form Content */}
          <FormContent
            form={form}
            currentStep={currentStep}
            xlmPrice={xlmPrice}
            formActions={
              <FormActions
                currentStep={currentStep}
                totalSteps={steps.length}
                isSubmitting={isSubmitting}
                onPrevious={() => handleNavigation(currentStep - 1)}
                onNext={() => handleNavigation(currentStep + 1)}
                onSubmit={() => form.handleSubmit(handleSubmit)()}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                formData={form.getValues()}
              />
            }
          />
        </div>
      </form>
    </Form>
  );
}
