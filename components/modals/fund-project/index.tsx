'use client';

import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Amount, { AmountFormData, AmountHandle } from './Amount';
import Confirm, { ConfirmHandle, ConfirmFormData } from './Confirm';
import Success from '../Success';
import Loading from '../Loading';
import {
  prepareProjectFunding,
  confirmProjectFunding,
} from '@/lib/api/project';
import { useWalletInfo, useWalletSigning } from '@/hooks/use-wallet';
import { useWalletProtection } from '@/hooks/use-wallet-protection';

interface FundProjectProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project?: {
    _id: string;
    title: string;
    logo?: string;
    description?: string;
    creator?: {
      profile?: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
      };
    };
    milestones?: Array<{
      title: string;
      description: string;
      dueDate: string;
      amount: number;
      status: string;
    }>;
    funding?: {
      goal: number;
      raised: number;
    };
  };
}

export interface FundProjectFormData {
  amount: Partial<AmountFormData>;
  confirm: Partial<ConfirmFormData>;
}

const FundProject = ({ open, setOpen, project }: FundProjectProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flowStep, setFlowStep] = useState<
    'form' | 'preparing' | 'signing' | 'confirming' | 'success'
  >('form');
  const [error, setError] = useState<string | null>(null);

  // Wallet hooks
  const { signTransaction } = useWalletSigning();
  const { address } = useWalletInfo() || { address: '' };
  const { requireWallet } = useWalletProtection({
    actionName: 'fund project',
  });
  // Form data state
  const [formData, setFormData] = useState<FundProjectFormData>({
    amount: {},
    confirm: {},
  });

  // Refs for step components to access validation methods
  const stepRefs = {
    amount: useRef<AmountHandle>(null),
    confirm: useRef<ConfirmHandle>(null),
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
    return stepRef?.current?.validate?.() ?? true;
  };

  const getStepKey = (step: number): keyof typeof stepRefs => {
    switch (step) {
      case 1:
        return 'amount';
      case 2:
        return 'confirm';
      default:
        return 'amount';
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

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Handle final submission
    await handleSubmit();
  };

  const handleSubmit = async () => {
    if (!project?._id) {
      setError('Project ID is required');
      return;
    }

    const amount = parseFloat(formData.amount?.amount || '0');
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!address) {
      setError('Wallet address is required');
      return;
    }

    // Check if amount exceeds remaining funding goal
    if (project.funding) {
      const remainingGoal = Math.max(
        0,
        project.funding.goal - project.funding.raised
      );
      if (amount > remainingGoal) {
        setError(
          `Amount cannot exceed remaining goal of $${remainingGoal.toLocaleString()}`
        );
        return;
      }
    }

    setIsSubmitting(true);
    setIsLoading(true);
    setFlowStep('preparing');
    setSubmitErrors([]);
    setError(null);

    try {
      // Step 1: Prepare funding
      setFlowStep('signing');
      const prepareResponse = await prepareProjectFunding(project._id, {
        amount,
        signer: address,
      });

      if (!prepareResponse.success) {
        throw new Error(prepareResponse.message || 'Failed to prepare funding');
      }

      // Step 2: Sign transaction with wallet protection
      const walletValid = await requireWallet();

      if (!walletValid) {
        setError('Wallet connection required to fund project');
        setFlowStep('form');
        setIsLoading(false);
        setIsSubmitting(false);
        return;
      }

      const signedXdr = await signTransaction(prepareResponse.data.unsignedXdr);

      // Step 3: Confirm funding
      setFlowStep('confirming');
      const confirmResponse = await confirmProjectFunding(project._id, {
        signedXdr,
        transactionHash: 'mock-hash', // This should come from the signing process
        amount,
      });

      if (!confirmResponse.success) {
        throw new Error(confirmResponse.message || 'Failed to confirm funding');
      }

      // Success - move to success state
      setFlowStep('success');
      setShowSuccess(true);
      setIsLoading(false);
      setIsSubmitting(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setSubmitErrors([errorMessage]);
      setFlowStep('form');
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleDataChange = useCallback(
    <K extends keyof FundProjectFormData>(
      step: K,
      data: FundProjectFormData[K]
    ) => {
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
    if (currentStep === 1) {
      // Amount step: require amount to enable Continue
      const amount = (formData.amount?.amount || '').trim();
      return (
        amount.length > 0 &&
        !isNaN(parseFloat(amount)) &&
        parseFloat(amount) > 0
      );
    }
    if (currentStep === 2) {
      // Confirm step: require both agreements to enable Continue
      const confirm = formData.confirm || {};
      return !!(confirm.agreeToTerms && confirm.agreeToPrivacy);
    }
    return true;
  })();

  const handleReset = () => {
    // Reset form and close modal
    setFormData({
      amount: {},
      confirm: {},
    });
    setCurrentStep(1);
    setShowSuccess(false);
    setIsLoading(false);
    setSubmitErrors([]);
    setFlowStep('form');
    setError(null);
    setOpen(false);
  };

  // Function to populate test data for easy testing
  const handleTestData = () => {
    const testData: FundProjectFormData = {
      amount: {
        amount: '100',
        currency: 'USD',
        message: 'Great project! Looking forward to seeing the results.',
      },
      confirm: {
        agreeToTerms: true,
        agreeToPrivacy: true,
      },
    };

    setFormData(testData);
  };

  const renderStepContent = () => {
    // Handle the flow states
    if (flowStep === 'preparing' || isLoading) {
      return <Loading />;
    }
    if (flowStep === 'success' || showSuccess) {
      const amount = formData.amount?.amount
        ? `$${formData.amount.amount} ${formData.amount.currency}`
        : undefined;

      return (
        <Success
          onContinue={handleReset}
          title='Contribution Successful!'
          description={`You have backed [${project?.title || 'this project'}](${typeof window !== 'undefined' ? window.location.pathname : ''}) with ${amount} USDC. Funds are securely held in escrow.`}
          buttonText='Continue'
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Amount
            ref={stepRefs.amount}
            onDataChange={data => handleDataChange('amount', data)}
            initialData={formData.amount}
            project={project}
          />
        );
      case 2:
        return (
          <Confirm
            ref={stepRefs.confirm}
            onDataChange={data => handleDataChange('confirm', data)}
            initialData={formData.confirm}
            fundingData={formData.amount as AmountFormData}
            project={project}
          />
        );
      default:
        return (
          <Amount
            ref={stepRefs.amount}
            onDataChange={data => handleDataChange('amount', data)}
            initialData={formData.amount}
            project={project}
          />
        );
    }
  };

  return (
    <BoundlessSheet
      contentClassName='h-[90vh] overflow-y-auto !overflow-x-hidden'
      open={open}
      setOpen={setOpen}
    >
      {flowStep === 'form' && (
        <Header
          currentStep={currentStep}
          onBack={handleBack}
          onTestData={handleTestData}
          project={project}
        />
      )}
      <div
        ref={contentRef}
        className={`min-h-[calc(55vh)] px-4 transition-opacity duration-100 md:px-[50px] lg:px-[75px] xl:px-[150px]`}
      >
        {flowStep !== 'form' ? (
          <div className='flex h-full items-center justify-center'>
            {renderStepContent()}
          </div>
        ) : (
          <>
            {(submitErrors.length > 0 || error) && (
              <div className='mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-red-200'>
                <p className='mb-2 font-medium text-red-300'>
                  {submitErrors.length > 0
                    ? 'Please fix the following errors before submitting:'
                    : 'An error occurred:'}
                </p>
                {submitErrors.length > 0 ? (
                  <ul className='list-disc space-y-1 pl-5'>
                    {submitErrors.map((e, idx) => (
                      <li key={idx} className='text-sm'>
                        {e}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-sm'>{error}</p>
                )}
              </div>
            )}
            <div key={currentStep}>{renderStepContent()}</div>
          </>
        )}
      </div>
      {flowStep === 'form' && (
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

export default FundProject;
