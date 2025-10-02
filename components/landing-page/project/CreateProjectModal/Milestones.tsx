'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, X, Calendar } from 'lucide-react';
import { z } from 'zod';
import FormHint from '@/components/form/FormHint';

interface MilestonesProps {
  onDataChange?: (data: MilestonesFormData) => void;
  initialData?: Partial<MilestonesFormData>;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface MilestonesFormData {
  fundingAmount: string;
  milestones: Milestone[];
}

const milestoneSchema = z
  .object({
    id: z.string(),
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim().min(1, 'Description is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
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

const milestonesSchema = z.object({
  fundingAmount: z
    .string()
    .refine(
      v => !isNaN(parseFloat(v)) && parseFloat(v) > 0,
      'Please enter a valid funding amount'
    ),
  milestones: z
    .array(milestoneSchema)
    .min(1, 'At least one complete milestone is required'),
});

const Milestones = React.forwardRef<
  { validate: () => boolean },
  MilestonesProps
>(({ onDataChange, initialData }, ref) => {
  const [formData, setFormData] = useState<MilestonesFormData>({
    fundingAmount: initialData?.fundingAmount || '0',
    milestones: initialData?.milestones || [
      {
        id: '1',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      },
    ],
  });

  const [errors, setErrors] = useState<{
    fundingAmount?: string;
    milestones?: string;
  }>({});

  const handleInputChange = (
    field: keyof MilestonesFormData,
    value: string | Milestone[]
  ) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    onDataChange?.(newData);
  };

  const handleMilestoneChange = (
    id: string,
    field: keyof Milestone,
    value: string
  ) => {
    const updatedMilestones = formData.milestones.map(milestone =>
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    handleInputChange('milestones', updatedMilestones);
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    };
    handleInputChange('milestones', [...formData.milestones, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    if (formData.milestones.length > 1) {
      const updatedMilestones = formData.milestones.filter(
        milestone => milestone.id !== id
      );
      handleInputChange('milestones', updatedMilestones);
    }
  };

  const validateForm = (): boolean => {
    const parsed = milestonesSchema.safeParse(formData);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const newErrors: { fundingAmount?: string; milestones?: string } = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === 'fundingAmount') newErrors.fundingAmount = issue.message;
      if (key === 'milestones') newErrors.milestones = issue.message;
    }
    setErrors(newErrors);
    return false;
  };

  // Expose validation function to parent
  React.useImperativeHandle(ref, () => ({
    validate: validateForm,
  }));

  return (
    <div className='min-h-full space-y-8 text-white'>
      {/* Funding Amount */}
      <div className='space-y-2'>
        <Label className='text-white'>
          How much funding does your project need?{' '}
          <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='number'
          placeholder='0 USDC'
          value={formData.fundingAmount}
          onChange={e => handleInputChange('fundingAmount', e.target.value)}
          className={cn(
            'focus-visible:border-primary border-[#2B2B2B] bg-[#101010] p-4 text-lg text-white placeholder:text-[#FFFFFF99]',
            errors.fundingAmount && 'border-red-500'
          )}
        />
        <div className='flex items-start space-x-2'>
          <FormHint
            hint="This amount will serve as your project's total funding goal. It will be allocated across milestones during admin review."
            side='top'
          />
          <p className='text-sm text-[#B5B5B5]'>
            This amount will serve as your project's total funding goal. It will
            be allocated across milestones during admin review.
          </p>
        </div>
        {errors.fundingAmount && (
          <p className='text-sm text-red-500'>{errors.fundingAmount}</p>
        )}
      </div>

      {/* Milestones */}
      <div className='space-y-4'>
        <div className='space-y-3'>
          <Label className='text-white'>
            Define milestones for your project{' '}
            <span className='text-red-500'>*</span>
          </Label>
          <p className='text-sm text-[#B5B5B5]'>
            Add at least one milestone to outline your project's progress. Fund
            allocation for each milestone will be finalized during admin review.
          </p>
        </div>

        <div className='space-y-5'>
          {formData.milestones.map((milestone, index) => (
            <React.Fragment key={milestone.id}>
              {index > 0 && (
                <div className='absolute left-0 h-px w-[100%] bg-[#2B2B2B]' />
              )}
              <div className='p-4'>
                <div className='flex items-start space-x-3'>
                  {/* Drag Handle */}
                  <div className='flex h-8 w-8 cursor-move items-center justify-center text-[#B5B5B5] hover:text-white'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.5 7.08325H17.5M2.5 12.9166H17.5'
                        stroke='#99FF2D'
                        strokeWidth='1.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>

                  {/* Milestone Content */}
                  <div className='flex-1 space-y-4'>
                    {/* Title */}
                    <div className='space-y-2'>
                      <Input
                        placeholder='Enter milestone name/title'
                        value={milestone.title}
                        onChange={e =>
                          handleMilestoneChange(
                            milestone.id,
                            'title',
                            e.target.value
                          )
                        }
                        className='focus-visible:border-primary border-[#2B2B2B] bg-[#101010] p-4 text-white placeholder:text-[#919191]'
                      />
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                      <Textarea
                        placeholder='Describe what will be achieved in this milestone, the key activities involved, and the expected outcome or deliverable.'
                        value={milestone.description}
                        onChange={e =>
                          handleMilestoneChange(
                            milestone.id,
                            'description',
                            e.target.value
                          )
                        }
                        className='focus-visible:border-primary min-h-20 resize-none border-[#2B2B2B] bg-[#101010] p-4 text-white placeholder:text-[#919191]'
                      />
                    </div>

                    {/* Date Inputs */}
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <Label className='text-sm text-[#B5B5B5]'>
                          Start Date
                        </Label>
                        <div className='relative'>
                          <Input
                            type='date'
                            value={milestone.startDate}
                            onChange={e =>
                              handleMilestoneChange(
                                milestone.id,
                                'startDate',
                                e.target.value
                              )
                            }
                            className='focus-visible:border-primary border-[#2B2B2B] bg-[#101010] p-4 pr-10 text-white'
                          />
                          <Calendar className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label className='text-sm text-[#B5B5B5]'>
                          End Date
                        </Label>
                        <div className='relative'>
                          <Input
                            type='date'
                            value={milestone.endDate}
                            onChange={e =>
                              handleMilestoneChange(
                                milestone.id,
                                'endDate',
                                e.target.value
                              )
                            }
                            className='focus-visible:border-primary border-[#2B2B2B] bg-[#101010] p-4 pr-10 text-white'
                          />
                          <Calendar className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  {formData.milestones.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeMilestone(milestone.id)}
                      className='text-primary/32 bg-primary/8 hover:bg-primary/8 hover:text-primary h-6 w-6 rounded-full p-0'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Add Milestone Button */}
        <div className='flex justify-end'>
          <Button
            type='button'
            variant='outline'
            onClick={addMilestone}
            className='border-primary hover:text-primary hover:bg-primary/5 bg-transparent font-normal text-[#99FF2D] hover:bg-[#101010]'
          >
            Add Milestone
            <Plus className='h-4 w-4 text-[#99FF2D]' />
          </Button>
        </div>

        {errors.milestones && (
          <p className='text-sm text-red-500'>{errors.milestones}</p>
        )}
      </div>
    </div>
  );
});

Milestones.displayName = 'Milestones';

export default Milestones;
