'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GripVertical, Plus, X, Info, Calendar } from 'lucide-react';

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
    const newErrors: { fundingAmount?: string; milestones?: string } = {};

    // Validate funding amount
    const fundingValue = parseFloat(formData.fundingAmount);
    if (!formData.fundingAmount || isNaN(fundingValue) || fundingValue <= 0) {
      newErrors.fundingAmount = 'Please enter a valid funding amount';
    }

    // Validate milestones
    const validMilestones = formData.milestones.filter(
      milestone =>
        milestone.title.trim() &&
        milestone.description.trim() &&
        milestone.startDate &&
        milestone.endDate
    );

    if (validMilestones.length === 0) {
      newErrors.milestones = 'At least one complete milestone is required';
    }

    // Validate individual milestones
    for (const milestone of formData.milestones) {
      if (
        milestone.title.trim() ||
        milestone.description.trim() ||
        milestone.startDate ||
        milestone.endDate
      ) {
        if (!milestone.title.trim()) {
          newErrors.milestones = 'All milestone titles are required';
          break;
        }
        if (!milestone.description.trim()) {
          newErrors.milestones = 'All milestone descriptions are required';
          break;
        }
        if (!milestone.startDate) {
          newErrors.milestones = 'All milestone start dates are required';
          break;
        }
        if (!milestone.endDate) {
          newErrors.milestones = 'All milestone end dates are required';
          break;
        }
        if (
          milestone.startDate &&
          milestone.endDate &&
          new Date(milestone.startDate) >= new Date(milestone.endDate)
        ) {
          newErrors.milestones = 'End date must be after start date';
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          placeholder='0'
          value={formData.fundingAmount}
          onChange={e => handleInputChange('fundingAmount', e.target.value)}
          className={cn(
            'focus:border-primary border-[#484848] bg-[#1A1A1A] text-lg text-white placeholder:text-[#919191]',
            errors.fundingAmount && 'border-red-500'
          )}
        />
        <div className='flex items-start space-x-2'>
          <Info className='mt-0.5 h-4 w-4 flex-shrink-0 text-[#B5B5B5]' />
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
        <div className='space-y-2'>
          <Label className='text-white'>
            Define milestones for your project{' '}
            <span className='text-red-500'>*</span>
          </Label>
          <p className='text-sm text-[#B5B5B5]'>
            Add at least one milestone to outline your project's progress. Fund
            allocation for each milestone will be finalized during admin review.
          </p>
        </div>

        <div className='space-y-4'>
          {formData.milestones.map(milestone => (
            <div
              key={milestone.id}
              className='rounded-lg border border-[#484848] bg-[#1A1A1A] p-4'
            >
              <div className='flex items-start space-x-3'>
                {/* Drag Handle */}
                <div className='flex h-8 w-8 cursor-move items-center justify-center text-[#B5B5B5] hover:text-white'>
                  <GripVertical className='h-4 w-4' />
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
                      className='focus:border-primary border-[#484848] bg-[#2A2A2A] text-white placeholder:text-[#919191]'
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
                      className='focus:border-primary min-h-20 resize-none border-[#484848] bg-[#2A2A2A] text-white placeholder:text-[#919191]'
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
                          className='focus:border-primary border-[#484848] bg-[#2A2A2A] pr-10 text-white'
                        />
                        <Calendar className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#919191]' />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-sm text-[#B5B5B5]'>End Date</Label>
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
                          className='focus:border-primary border-[#484848] bg-[#2A2A2A] pr-10 text-white'
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
                    className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Milestone Button */}
        <div className='flex justify-end'>
          <Button
            type='button'
            variant='outline'
            onClick={addMilestone}
            className='hover:border-primary border-[#484848] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]'
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Milestone
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
