'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { type CreateProjectFormData, initialStepDefaults } from './schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Plus,
  X,
  Calendar as CalendarIcon,
  DollarSign,
  Flag,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MilestonesProps {
  form: ReturnType<typeof useFormContext<CreateProjectFormData>>;
  registerStepRef: (step: number, ref: { validate: () => boolean }) => void;
}

const Milestones = ({ form, registerStepRef }: MilestonesProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'milestones.milestones',
  });

  React.useEffect(() => {
    registerStepRef(3, {
      validate: () => {
        const milestonesData = form.getValues('milestones');
        const initialDefaults = initialStepDefaults.milestones;

        // Check if data is identical to initial defaults
        const isUnchanged =
          JSON.stringify(milestonesData) === JSON.stringify(initialDefaults);
        if (isUnchanged) return true; // Allow navigation if unchanged from initial state

        return !!(
          milestonesData.milestones.length > 0 &&
          milestonesData.milestones.every(
            milestone =>
              milestone.title &&
              milestone.description &&
              milestone.dueDate &&
              milestone.fundingAmount >= 0
          )
        );
      },
    });
  }, [form, registerStepRef]);

  const addMilestone = () => {
    append({
      title: '',
      description: '',
      dueDate: new Date(),
      fundingAmount: 0,
    });
  };

  return (
    <div className='min-h-full space-y-8 text-white'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold text-white'>
          Project Milestones
        </h2>
        <p className='text-[#B5B5B5]'>
          Define key milestones for your project. These will help backers
          understand your progress and timeline.
        </p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-6'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='bg-background/20 space-y-4 rounded-lg border border-[#484848] p-6'
            >
              <div className='flex items-center justify-between'>
                <h3 className='flex items-center gap-2 text-lg font-medium text-white'>
                  <Flag className='h-5 w-5' />
                  Milestone {index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => remove(index)}
                    className='h-8 w-8 border-[#484848] text-white hover:bg-[#2B2B2B]'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Milestone Title */}
                <FormField
                  control={form.control}
                  name={`milestones.milestones.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium text-white'>
                        Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter milestone title'
                          className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date */}
                <FormField
                  control={form.control}
                  name={`milestones.milestones.${index}.dueDate`}
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                        <CalendarIcon className='h-4 w-4' />
                        Due Date *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              className={cn(
                                'bg-background/30 w-full justify-start border-[#484848] text-left font-normal text-white hover:bg-[#2B2B2B]',
                                !field.value && 'text-[#919191]'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className='bg-background w-auto border-[#484848] p-0'
                          align='start'
                        >
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name={`milestones.milestones.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-white'>
                      Description *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe what will be accomplished in this milestone'
                        className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[100px] border-[#484848] text-white placeholder:text-[#919191]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Funding Amount */}
              <FormField
                control={form.control}
                name={`milestones.milestones.${index}.fundingAmount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                      <DollarSign className='h-4 w-4' />
                      Funding Amount (USD) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0'
                        className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                        {...field}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button
          type='button'
          variant='outline'
          onClick={addMilestone}
          className='w-full border-[#484848] text-white hover:bg-[#2B2B2B]'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Milestone
        </Button>
      </div>
    </div>
  );
};

export default Milestones;
