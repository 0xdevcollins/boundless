import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import Basic, { BasicFormData } from './Basic';
import Details, { DetailsFormData } from './Details';
import Milestones, { MilestonesFormData } from './Milestones';
import Team, { TeamFormData } from './Team';
import Contact, { ContactFormData } from './Contact';
import { z } from 'zod';

type StepHandle = { validate: () => boolean; markSubmitted?: () => void };

interface CreateProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ProjectFormData {
  basic: Partial<BasicFormData>;
  details: Partial<DetailsFormData>;
  milestones: Partial<MilestonesFormData>;
  team: Partial<TeamFormData>;
  contact: Partial<ContactFormData>;
}

const CreateProjectModal = ({ open, setOpen }: CreateProjectModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<ProjectFormData>({
    basic: {},
    details: {},
    milestones: {},
    team: {},
    contact: {},
  });

  // Refs for step components to access validation methods
  const stepRefs = {
    basic: useRef<StepHandle>(null),
    details: useRef<StepHandle>(null),
    milestones: useRef<StepHandle>(null),
    team: useRef<StepHandle>(null),
    contact: useRef<StepHandle>(null),
  };

  // Ref for the scrollable content container
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when step changes with smooth transition
  useEffect(() => {
    if (currentStep === 1) return; // Skip for initial load

    // Reset scroll position immediately (while content is hidden)
    const resetScroll = () => {
      // Reset window scroll first
      window.scrollTo(0, 0);

      if (contentRef.current) {
        // Try to find the scrollable parent container
        const scrollableParent =
          contentRef.current.closest('[data-radix-scroll-area-viewport]') ||
          contentRef.current.closest('.overflow-y-auto') ||
          contentRef.current.parentElement?.querySelector('.overflow-y-auto');

        if (scrollableParent) {
          scrollableParent.scrollTop = 0;
        } else {
          // Fallback to scrolling the content ref itself
          contentRef.current.scrollTop = 0;
        }

        // Also try to find any element with overflow-y-auto in the document
        const allScrollableElements =
          document.querySelectorAll('.overflow-y-auto');
        allScrollableElements.forEach(element => {
          if (element.contains(contentRef.current)) {
            element.scrollTop = 0;
          }
        });
      }
    };

    // Reset scroll immediately
    resetScroll();

    return () => {};
  }, [currentStep]);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    const stepRef = stepRefs[getStepKey(currentStep)];
    return stepRef?.current?.validate() ?? true;
  };

  const getStepKey = (step: number): keyof typeof stepRefs => {
    switch (step) {
      case 1:
        return 'basic';
      case 2:
        return 'details';
      case 3:
        return 'milestones';
      case 4:
        return 'team';
      case 5:
        return 'contact';
      default:
        return 'basic';
    }
  };

  const handleContinue = async () => {
    // Mark the step as submitted so untouched fields can show errors
    const key = getStepKey(currentStep);
    stepRefs[key].current?.markSubmitted?.();
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Handle final submission (show loader then success)
    await handleSubmit();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate full payload with master schema before submitting
      const milestoneSchema = z
        .object({
          id: z.string().optional(),
          title: z.string().trim().min(1),
          description: z.string().trim().min(1),
          startDate: z.string().min(1),
          endDate: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (new Date(val.startDate) >= new Date(val.endDate)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['endDate'],
              message: 'End date must be after start date',
            });
          }
        });

      const projectSchema = z.object({
        basic: z.object({
          projectName: z.string().trim().min(1),
          logo: z.any().optional(),
          vision: z.string().trim().min(1).max(300),
          category: z.string().trim().min(1),
          githubUrl: z.string().url().optional().or(z.literal('')).optional(),
          websiteUrl: z.string().url().optional().or(z.literal('')).optional(),
          demoVideoUrl: z
            .string()
            .url()
            .optional()
            .or(z.literal(''))
            .optional(),
          socialLinks: z.array(z.string()).min(1),
        }),
        details: z.object({
          vision: z.string().trim().min(1),
        }),
        milestones: z.object({
          fundingAmount: z
            .string()
            .refine(v => !isNaN(parseFloat(v)) && parseFloat(v) > 0),
          milestones: z.array(milestoneSchema).min(1),
        }),
        team: z
          .object({
            members: z
              .array(
                z.object({
                  id: z.string(),
                  username: z.string().trim().min(1),
                  role: z.string().optional(),
                })
              )
              .optional()
              .default([]),
          })
          .optional()
          .default({ members: [] }),
        contact: z.object({
          telegram: z.string().trim().min(1),
          backupType: z.enum(['discord', 'whatsapp']),
          backupContact: z.string().trim().min(1),
          agreeToTerms: z.literal(true),
          agreeToPrivacy: z.literal(true),
        }),
      });

      // Clicking submit implies agreement to Terms and Privacy
      const payload: ProjectFormData = {
        ...formData,
        contact: {
          ...(formData.contact || {}),
          agreeToTerms: true,
          agreeToPrivacy: true,
        },
      } as ProjectFormData;

      const parsed = projectSchema.safeParse(payload);
      if (!parsed.success) {
        setSubmitErrors(
          parsed.error.issues.map(i => `${i.path.join('.')} - ${i.message}`)
        );
        setIsSubmitting(false);
        return;
      }

      setSubmitErrors([]);

      // Simulate API call with loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success modal
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch {
      // console.error('Error submitting project:', error);
      // TODO: Show error notification
      alert('Error submitting project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDataChange = useCallback(
    <K extends keyof ProjectFormData>(step: K, data: ProjectFormData[K]) => {
      setFormData(prev => ({
        ...prev,
        [step]: {
          ...(prev[step] as Record<string, unknown>),
          ...(data as Record<string, unknown>),
        },
      }));
    },
    []
  );

  // Lightweight enable/disable for Continue button without firing validation side-effects
  const isStepValid = (() => {
    if (currentStep === 2) {
      // Details step: require non-empty vision to enable Continue
      const v = (formData.details?.vision || '').trim();
      return v.length > 0;
    }
    if (currentStep === 5) {
      // Contact step: enable when core fields are filled
      // Terms/Privacy will be enforced on submit via schema
      const contact = formData.contact || {};
      return !!(
        contact.telegram?.trim() &&
        contact.backupType &&
        contact.backupContact?.trim()
      );
    }
    // For other steps, allow Continue (validation will run on click)
    return true;
  })();

  const handleSuccessContinue = () => {
    // Reset form and close modal
    setFormData({
      basic: {},
      details: {},
      milestones: {},
      team: {},
      contact: {},
    });
    setCurrentStep(1);
    setShowSuccess(false);
    setOpen(false);
  };

  const renderStepContent = () => {
    if (showSuccess) {
      return (
        <div className='flex min-h-full flex-col items-center justify-between space-y-12 text-center'>
          {/* Success Icon */}
          <div className='relative my-10 lg:my-16'>
            <svg
              width='55'
              height='55'
              className='absolute -inset-2 top-[20%] z-10 mx-auto'
              viewBox='0 0 55 55'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M46.2034 10.109C47.808 8.50435 50.4097 8.50435 52.0144 10.109C52.8759 10.9706 52.8759 12.3674 52.0144 13.2289L20.1202 45.1232C18.8871 46.3563 16.8878 46.3563 15.6547 45.1232C14.4216 43.8901 14.4216 41.8908 15.6547 40.6577L46.2034 10.109Z'
                fill='#0F973D'
              />
              <path
                d='M3.67335 33.3904C2.0627 31.7917 2.05299 29.19 3.65168 27.5794C4.50999 26.7146 5.9068 26.7094 6.77154 27.5677L19.9508 40.649C21.1885 41.8775 21.1959 43.8768 19.9674 45.1145C18.7389 46.3522 16.7397 46.3596 15.502 45.1311L3.67335 33.3904Z'
                fill='#0F973D'
              />
            </svg>
            <div className='pointer-events-none relative -inset-2 h-[150px] w-[150px] rounded-full bg-[#0F973D] opacity-20 blur-[45px]'></div>
          </div>

          {/* Success Message */}
          <div className='space-y-2'>
            <h2 className='text-[20px] font-medium text-white'>
              Submission Successful!
            </h2>
            <p className='max-w-md leading-[160%] text-[#B5B5B5]'>
              Your project has been sent for admin review and will be processed
              within 72 hours. You can track its status anytime on the{' '}
              <Link
                href='/projects'
                className='font-medium text-[#A7F950] underline'
              >
                Projects Page
              </Link>
              .
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSuccessContinue}
            className='rounded-[10px] border border-[#2B2B2B] bg-[#A7F950] px-8 py-3 font-medium text-[#030303] transition-colors'
          >
            Continue
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Basic
            ref={stepRefs.basic}
            onDataChange={data => handleDataChange('basic', data)}
            initialData={formData.basic}
          />
        );
      case 2:
        return (
          <Details
            ref={stepRefs.details}
            onDataChange={data => handleDataChange('details', data)}
            initialData={formData.details}
          />
        );
      case 3:
        return (
          <Milestones
            ref={stepRefs.milestones}
            onDataChange={data => handleDataChange('milestones', data)}
            initialData={formData.milestones}
          />
        );
      case 4:
        return (
          <Team
            ref={stepRefs.team}
            onDataChange={data => handleDataChange('team', data)}
            initialData={formData.team}
          />
        );
      case 5:
        return (
          <Contact
            ref={stepRefs.contact}
            onDataChange={data => handleDataChange('contact', data)}
            initialData={formData.contact}
          />
        );
      default:
        return (
          <Basic
            ref={stepRefs.basic}
            onDataChange={data => handleDataChange('basic', data)}
            initialData={formData.basic}
          />
        );
    }
  };

  return (
    <BoundlessSheet
      contentClassName='h-[80vh] overflow-y-auto !overflow-x-hidden'
      open={open}
      setOpen={setOpen}
    >
      {!showSuccess && <Header currentStep={currentStep} onBack={handleBack} />}
      <div
        ref={contentRef}
        className={`min-h-[calc(55vh)] px-4 transition-opacity duration-100 md:px-[50px] lg:px-[75px] xl:px-[150px]`}
      >
        {showSuccess ? (
          <div className='flex h-full items-center justify-center'>
            {renderStepContent()}
          </div>
        ) : (
          <>
            {submitErrors.length > 0 && (
              <div className='mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-red-200'>
                <p className='mb-2 font-medium text-red-300'>
                  Please fix the following errors before submitting:
                </p>
                <ul className='list-disc space-y-1 pl-5'>
                  {submitErrors.map((e, idx) => (
                    <li key={idx} className='text-sm'>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div key={currentStep}>{renderStepContent()}</div>
          </>
        )}
      </div>
      {!showSuccess && (
        <Footer
          currentStep={currentStep}
          onContinue={handleContinue}
          isStepValid={isStepValid}
          isSubmitting={isSubmitting}
        />
      )}
    </BoundlessSheet>
  );
};

export default CreateProjectModal;
