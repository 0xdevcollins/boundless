import BoundlessSheet from '@/components/sheet/boundless-sheet';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Basic, { BasicFormData } from './Basic';
import Details, { DetailsFormData } from './Details';
import Milestones, { MilestonesFormData } from './Milestones';
import Team, { TeamFormData } from './Team';
import Contact, { ContactFormData } from './Contact';
import LoadingScreen from './LoadingScreen';
import SuccessScreen from './SuccessScreen';
import TransactionSigningScreen from './TransactionSigningScreen';
import { z } from 'zod';
import {
  prepareCrowdfundingProject,
  confirmCrowdfundingProject,
} from '@/lib/api/project';
import {
  CreateCrowdfundingProjectRequest,
  PrepareCrowdfundingProjectResponse,
} from '@/lib/api/types';
import { useWalletInfo, useWalletSigning } from '@/hooks/use-wallet';
import { useWalletProtection } from '@/hooks/use-wallet-protection';

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
  const [isLoading, setIsLoading] = useState(false);
  const [unsignedTransaction, setUnsignedTransaction] = useState<string | null>(
    null
  );
  const [isSigningTransaction, setIsSigningTransaction] = useState(false);

  // New state for two-step flow
  const [preparedData, setPreparedData] = useState<
    PrepareCrowdfundingProjectResponse['data'] | null
  >(null);
  const [flowStep, setFlowStep] = useState<
    'form' | 'preparing' | 'signing' | 'confirming' | 'success'
  >('form');

  const { address } = useWalletInfo() || { address: '' };

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

  // Wallet signing hooks
  const { signTransaction } = useWalletSigning();
  const { requireWallet } = useWalletProtection({
    actionName: 'sign project creation transaction',
  });

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

  // Function to map form data to API request format
  const mapFormDataToApiRequest = (
    data: ProjectFormData
  ): CreateCrowdfundingProjectRequest => {
    const basic = data.basic || {};
    const details = data.details || {};
    const milestones = data.milestones || {
      fundingAmount: '0',
      milestones: [],
    };
    const team = data.team || { members: [] };
    const contact = data.contact || {
      telegram: '',
      backupType: 'whatsapp',
      backupContact: '',
    };

    // Convert milestones to API format
    const apiMilestones = (milestones.milestones || []).map(milestone => ({
      name: milestone.title,
      description: milestone.description,
      startDate: milestone.startDate,
      endDate: milestone.endDate,
      amount:
        parseFloat(milestones.fundingAmount || '0') /
        (milestones.milestones?.length || 1), // Distribute funding equally
    }));

    // Convert team members to API format
    const apiTeam = (team.members || []).map(member => ({
      name: member.email.split('@')[0], // Extract name from email
      role: 'MEMBER', // Default role for all members
      email: member.email,
    }));

    // Convert social links to API format
    const socialLinks = basic.socialLinks?.filter(link => link.trim()) || [];
    const apiSocialLinks = socialLinks.map(link => ({
      platform: link.startsWith('https://twitter.com/')
        ? 'twitter'
        : link.startsWith('https://discord.gg/')
          ? 'discord'
          : link.startsWith('https://t.me/')
            ? 'telegram'
            : 'other', // Default platform
      url: link,
    }));

    return {
      title: basic.projectName || '',
      logo: basic.logoUrl || undefined, // Use uploaded logo URL
      vision: basic.vision || '',
      category: basic.category || '',
      details: details.vision || '',
      fundingAmount: parseFloat(milestones.fundingAmount || '0') || 0,
      githubUrl: basic.githubUrl || undefined,
      gitlabUrl: undefined,
      bitbucketUrl: undefined,
      projectWebsite: basic.websiteUrl || undefined,
      demoVideo: basic.demoVideoUrl || undefined,
      milestones: apiMilestones,
      team: apiTeam,
      contact: {
        primary: `@${contact.telegram || ''}`,
        backup: contact.backupContact || '',
      },
      socialLinks: apiSocialLinks,
      signer: address,
    };
  };

  const handleRetry = () => {
    setSubmitErrors([]);
    setFlowStep('signing');
  };

  const handleSignTransaction = async () => {
    if (!unsignedTransaction || !preparedData) {
      setSubmitErrors(['No transaction to sign or prepared data missing']);
      return;
    }

    requireWallet(async () => {
      setIsSigningTransaction(true);
      setFlowStep('confirming');

      try {
        // Sign the transaction using the wallet
        const signedXdr = await signTransaction(unsignedTransaction);

        // Submit the signed transaction to the backend (Step 2)
        const confirmResponse = await confirmCrowdfundingProject({
          signedXdr,
          escrowAddress: preparedData.escrowAddress,
          projectData: preparedData.projectData,
          mappedMilestones: preparedData.mappedMilestones,
          teamInvitations: preparedData.teamInvitations,
        });

        if (confirmResponse.success) {
          // Project created successfully
          setFlowStep('success');
          setShowSuccess(true);
          setIsSigningTransaction(false);
          setIsSubmitting(false);
        } else {
          throw new Error(
            confirmResponse.message || 'Failed to create project'
          );
        }
      } catch (error) {
        let errorMessage = 'Failed to sign transaction. Please try again.';

        if (error instanceof Error) {
          if (error.message.includes('User rejected')) {
            errorMessage =
              'Transaction signing was cancelled. Please try again.';
          } else if (error.message.includes('Invalid transaction')) {
            errorMessage =
              'Invalid transaction format. Please contact support.';
          } else if (error.message.includes('Network')) {
            errorMessage =
              'Network error. Please check your connection and try again.';
          } else if (error.message.includes('Wallet not connected')) {
            errorMessage =
              'Wallet is not connected. Please reconnect your wallet.';
          } else {
            errorMessage = error.message;
          }
        }

        setSubmitErrors([errorMessage]);
        setIsSigningTransaction(false);
        setFlowStep('signing');
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsLoading(true);
    setFlowStep('preparing');

    try {
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
                  email: z.string().email(),
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
        setFlowStep('form');
        return;
      }

      setSubmitErrors([]);

      // Map form data to API request format
      const apiRequest = mapFormDataToApiRequest(payload);

      // Step 1: Prepare project and get unsigned transaction
      const prepareResponse = await prepareCrowdfundingProject(apiRequest);

      if (prepareResponse.success) {
        // Store prepared data for step 2
        setPreparedData(prepareResponse.data);
        setUnsignedTransaction(prepareResponse.data.unsignedXdr);
        setFlowStep('signing');
        setIsLoading(false);
      } else {
        throw new Error(prepareResponse.message || 'Failed to prepare project');
      }
    } catch (error) {
      let errorMessage = 'Error preparing project. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Network')) {
          errorMessage =
            'Network error. Please check your connection and try again.';
        } else if (error.message.includes('Validation')) {
          errorMessage =
            'Project validation failed. Please check your project details.';
        } else if (error.message.includes('Unauthorized')) {
          errorMessage =
            'Authentication required. Please log in and try again.';
        } else if (error.message.includes('Server')) {
          errorMessage = 'Server error. Please try again in a few moments.';
        } else {
          errorMessage = error.message;
        }
      }

      setSubmitErrors([errorMessage]);
      setIsLoading(false);
      setIsSubmitting(false);
      setFlowStep('form');
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

  const handleReset = () => {
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
    setIsLoading(false);
    setUnsignedTransaction(null);
    setIsSigningTransaction(false);
    setSubmitErrors([]);
    setPreparedData(null);
    setFlowStep('form');
    setOpen(false);
  };

  // Function to populate test data for easy testing
  const handleTestData = () => {
    const testData: ProjectFormData = {
      basic: {
        projectName: 'DeFi Protocol',
        logo: 'https://res.cloudinary.com/danuy5rqb/image/upload/v1759431246/boundless/projects/logos/jfc5v0l6xec0bdhmliet.png', // Will be handled by file upload
        logoUrl:
          'https://res.cloudinary.com/danuy5rqb/image/upload/v1759431246/boundless/projects/logos/jfc5v0l6xec0bdhmliet.png', // Sample uploaded logo URL
        vision:
          'Building the future of decentralized finance with innovative yield farming strategies and automated market making.',
        category: 'DeFi & Finance',
        githubUrl: 'https://github.com/example/defi-protocol',
        websiteUrl: 'https://defi-protocol.example.com',
        demoVideoUrl: 'https://youtube.com/watch?v=example',
        socialLinks: [
          'https://twitter.com/defi_protocol',
          'https://discord.gg/defi-protocol',
          'https://t.me/defi_protocol',
        ],
      },
      details: {
        vision: `# DeFi Protocol Vision

## Overview
We are building a revolutionary DeFi protocol that combines yield farming, automated market making, and cross-chain interoperability to create the most efficient and user-friendly decentralized finance platform.

## Key Features
- **Automated Yield Farming**: AI-powered strategies that automatically optimize yield across multiple protocols
- **Cross-Chain Support**: Seamless asset transfers between Ethereum, Polygon, and BSC
- **Liquidity Mining**: Innovative token distribution mechanism that rewards long-term holders
- **Risk Management**: Advanced risk assessment tools and insurance integration

## Technology Stack
- Solidity smart contracts
- React frontend with Web3 integration
- Node.js backend services
- IPFS for decentralized storage

## Roadmap
Our development is structured in clear phases with measurable milestones and community-driven governance.`,
      },
      milestones: {
        fundingAmount: '50000',
        milestones: [
          {
            id: 'milestone-1',
            title: 'Smart Contract Development',
            description:
              'Develop and audit core smart contracts for yield farming and automated market making. This includes the main protocol contracts, token contracts, and governance mechanisms.',
            startDate: '2026-02-01',
            endDate: '2026-04-30',
          },
          {
            id: 'milestone-2',
            title: 'Frontend Development',
            description:
              'Build a user-friendly web interface for interacting with the protocol. This includes dashboard, yield farming interface, and portfolio management tools.',
            startDate: '2026-05-01',
            endDate: '2026-06-30',
          },
          {
            id: 'milestone-3',
            title: 'Security Audit & Testing',
            description:
              'Conduct comprehensive security audits, penetration testing, and bug bounty programs to ensure the protocol is secure and ready for mainnet launch.',
            startDate: '2026-07-01',
            endDate: '2026-08-31',
          },
        ],
      },
      team: {
        members: [
          {
            id: 'member-1',
            email: 'john@example.com',
          },
          {
            id: 'member-2',
            email: 'jane@example.com',
          },
        ],
      },
      contact: {
        telegram: 'alice_dev',
        backupType: 'discord',
        backupContact: 'alice_dev#1234',
        agreeToTerms: true,
        agreeToPrivacy: true,
      },
    };

    setFormData(testData);
  };

  const renderStepContent = () => {
    // Handle the new two-step flow states
    if (flowStep === 'preparing' || isLoading) {
      return <LoadingScreen />;
    }
    if (flowStep === 'success' || showSuccess) {
      return <SuccessScreen onContinue={handleReset} />;
    }
    if (
      flowStep === 'signing' &&
      unsignedTransaction &&
      !isSigningTransaction
    ) {
      return (
        <TransactionSigningScreen
          onSign={handleSignTransaction}
          flowStep='signing'
          onRetry={handleRetry}
          hasError={submitErrors.length > 0}
          errorMessage={submitErrors[0]}
        />
      );
    }
    if (flowStep === 'confirming' || isSigningTransaction) {
      return (
        <TransactionSigningScreen
          onSign={handleSignTransaction}
          isSigning={true}
          flowStep='confirming'
        />
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
      contentClassName='h-[90vh] overflow-y-auto !overflow-x-hidden'
      open={open}
      setOpen={setOpen}
    >
      {flowStep === 'form' && (
        <Header
          currentStep={currentStep}
          onBack={handleBack}
          onTestData={handleTestData}
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

export default CreateProjectModal;
