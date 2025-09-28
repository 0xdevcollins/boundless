'use client';

import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState, useRef, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectSchema,
  initialStepDefaults,
  type CreateProjectFormData,
} from './schemas';
import Header from './Header';
import Footer from './Footer';
import Basic from './Basic';
import Details from './Details';
import Milestones from './Milestones';
import Team from './Team';
import Contact from './Contact';
import SuccessScreen from './SuccessScreen';
import { toast } from 'sonner';
import { ValidationSummary } from '@/components/ui/error-display';
import {
  validateStep,
  validateAllSteps,
  getErrorMessage,
  type ValidationError,
} from '@/lib/form-validation-utils';

// Deep comparison utility function
const isDeepEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return obj1 === obj2;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object') return obj1 === obj2;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  if (Array.isArray(obj1)) {
    const arr2 = obj2 as unknown[];
    if (obj1.length !== arr2.length) return false;
    return obj1.every((item, index) => isDeepEqual(item, arr2[index]));
  }

  const obj1Record = obj1 as Record<string, unknown>;
  const obj2Record = obj2 as Record<string, unknown>;
  const keys1 = Object.keys(obj1Record);
  const keys2 = Object.keys(obj2Record);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => isDeepEqual(obj1Record[key], obj2Record[key]));
};

const CreateProjectModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const stepRefs = useRef<{ [key: number]: { validate: () => boolean } }>({});

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      basic: {
        name: '',
        category: undefined,
        type: undefined,
        shortDescription: '',
        fundingGoal: 1000,
        duration: 3,
      },
      details: {
        description: '',
        problemStatement: '',
        solution: '',
        targetAudience: '',
        keyFeatures: [],
        technologyStack: [],
        roadmap: '',
      },
      milestones: {
        milestones: [
          {
            title: '',
            description: '',
            dueDate: new Date(),
            fundingAmount: 0,
          },
        ],
      },
      team: {
        teamMembers: [
          {
            name: '',
            role: '',
            bio: '',
            linkedin: '',
            twitter: '',
            github: '',
          },
        ],
      },
      contact: {
        website: '',
        github: '',
        twitter: '',
        discord: '',
        telegram: '',
        email: '',
        whitepaper: '',
        demo: '',
      },
    },
    mode: 'onChange',
  });

  const registerStepRef = useCallback(
    (step: number, ref: { validate: () => boolean }) => {
      stepRefs.current[step] = ref;
    },
    []
  );

  const validateCurrentStep = useCallback(() => {
    const stepData = form.getValues(getStepDataKey(currentStep));
    const stepKey = getStepDataKey(currentStep);
    const initialDefaults =
      initialStepDefaults[stepKey as keyof typeof initialStepDefaults];

    // Check if the current data is identical to initial defaults
    if (isDeepEqual(stepData, initialDefaults)) {
      return true; // Allow navigation if data hasn't changed from initial state
    }

    const validation = validateStep(currentStep, stepData);
    return validation.isValid;
  }, [currentStep, form]);

  const getStepDataKey = (step: number) => {
    const keys = ['basic', 'details', 'milestones', 'team', 'contact'] as const;
    return keys[step - 1];
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = async () => {
    const isValid = validateCurrentStep();

    if (!isValid) {
      const stepData = form.getValues(getStepDataKey(currentStep));
      const validation = validateStep(currentStep, stepData);

      // Show specific error messages
      if (validation.errors.length > 0) {
        const errorMessages = validation.errors.map(error =>
          getErrorMessage(error)
        );
        const firstError = errorMessages[0];

        toast.error(firstError, {
          description:
            errorMessages.length > 1
              ? `And ${errorMessages.length - 1} more error${errorMessages.length > 2 ? 's' : ''}`
              : undefined,
          duration: 5000,
        });

        setShowValidationSummary(true);
      } else if (validation.missingFields.length > 0) {
        toast.error(`Please fill in: ${validation.missingFields.join(', ')}`, {
          duration: 5000,
        });
      }
      return;
    }

    // Clear validation errors when step is valid
    setValidationErrors([]);
    setShowValidationSummary(false);

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = form.getValues();

      // Validate all steps before submission
      const validation = validateAllSteps(formData);

      if (!validation.isValid) {
        setValidationErrors(validation.allErrors);
        setShowValidationSummary(true);

        toast.error('Please fix all errors before submitting', {
          description: `Found ${validation.allErrors.length} error${validation.allErrors.length > 1 ? 's' : ''} across multiple steps`,
          duration: 7000,
        });
        return;
      }

      // TODO: Implement actual API call to submit the project

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success screen instead of closing immediately
      setShowSuccess(true);
    } catch {
      toast.error('Failed to submit project. Please try again.', {
        description:
          'An unexpected error occurred. Please check your connection and try again.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = validateCurrentStep();

  // Simplified step completion - only calculate when needed, not on every render
  const stepCompletion = React.useMemo(() => {
    // Return empty object to avoid re-render issues
    // Step completion will be calculated on-demand in the Header component
    return {};
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Reset form and state
    form.reset();
    setCurrentStep(1);
    setValidationErrors([]);
    setShowValidationSummary(false);
    setShowSuccess(false);
  };

  const renderStepContent = () => {
    if (showSuccess) {
      return <SuccessScreen onClose={handleClose} />;
    }

    const commonProps = {
      form: form,
      registerStepRef: registerStepRef,
    };

    switch (currentStep) {
      case 1:
        return <Basic {...commonProps} />;
      case 2:
        return <Details {...commonProps} />;
      case 3:
        return <Milestones {...commonProps} />;
      case 4:
        return <Team {...commonProps} />;
      case 5:
        return <Contact {...commonProps} />;
      default:
        return <Basic {...commonProps} />;
    }
  };

  return (
    <BoundlessSheet
      contentClassName='h-[80vh] overflow-y-auto !overflow-x-hidden'
      open={open}
      setOpen={setOpen}
      centered={true}
      size='xl'
    >
      <FormProvider {...form}>
        <Header
          currentStep={currentStep}
          onBack={handleBack}
          stepCompletion={stepCompletion}
        />
        <div className='min-h-[calc(55vh)] px-4 sm:px-6 md:px-[50px] lg:px-[75px] xl:px-[150px]'>
          {showValidationSummary && validationErrors.length > 0 && (
            <div className='mb-6'>
              <ValidationSummary
                errors={validationErrors.map(error => ({
                  field: error.field,
                  message: getErrorMessage(error),
                  step: error.step,
                }))}
                onFieldClick={(field, step) => {
                  if (step && step !== currentStep) {
                    setCurrentStep(step);
                  }
                  setShowValidationSummary(false);
                }}
              />
            </div>
          )}
          {renderStepContent()}
        </div>
        {!showSuccess && (
          <Footer
            currentStep={currentStep}
            onContinue={handleContinue}
            isStepValid={isStepValid}
            isSubmitting={isSubmitting}
          />
        )}
      </FormProvider>
    </BoundlessSheet>
  );
};

export default CreateProjectModal;
