'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, Calendar, Tag } from 'lucide-react';

interface BasicProps {
  form: ReturnType<typeof useFormContext<CreateProjectFormData>>;
  registerStepRef: (step: number, ref: { validate: () => boolean }) => void;
}

const Basic = ({ form, registerStepRef }: BasicProps) => {
  React.useEffect(() => {
    registerStepRef(1, {
      validate: () => {
        const basicData = form.getValues('basic');
        const initialDefaults = initialStepDefaults.basic;

        // Check if data is identical to initial defaults
        const isUnchanged =
          JSON.stringify(basicData) === JSON.stringify(initialDefaults);
        if (isUnchanged) return true; // Allow navigation if unchanged from initial state

        return !!(
          basicData.name &&
          basicData.category &&
          basicData.type &&
          basicData.shortDescription &&
          basicData.fundingGoal > 0 &&
          basicData.duration > 0
        );
      },
    });
  }, [form, registerStepRef]);

  return (
    <div className='min-h-full space-y-8 text-white'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold text-white'>Basic Information</h2>
        <p className='text-[#B5B5B5]'>
          Tell us about your project. This information will be displayed
          publicly.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Project Name */}
        <FormField
          control={form.control}
          name='basic.name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-white'>
                Project Name *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your project name'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category and Type Row */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='basic.category'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <Tag className='h-4 w-4' />
                  Category *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-background border-[#484848]'>
                    <SelectItem
                      value='web3'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Web3
                    </SelectItem>
                    <SelectItem
                      value='defi'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      DeFi
                    </SelectItem>
                    <SelectItem
                      value='nft'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      NFT
                    </SelectItem>
                    <SelectItem
                      value='dao'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      DAO
                    </SelectItem>
                    <SelectItem
                      value='infrastructure'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Infrastructure
                    </SelectItem>
                    <SelectItem
                      value='social_impact'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Social Impact
                    </SelectItem>
                    <SelectItem
                      value='education'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Education
                    </SelectItem>
                    <SelectItem
                      value='healthcare'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Healthcare
                    </SelectItem>
                    <SelectItem
                      value='environment'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Environment
                    </SelectItem>
                    <SelectItem
                      value='technology'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='basic.type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium text-white'>
                  Project Type *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white'>
                      <SelectValue placeholder='Select project type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-background border-[#484848]'>
                    <SelectItem
                      value='crowdfunding'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Crowdfunding
                    </SelectItem>
                    <SelectItem
                      value='grant'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Grant
                    </SelectItem>
                    <SelectItem
                      value='hackathon'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Hackathon
                    </SelectItem>
                    <SelectItem
                      value='research'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Research
                    </SelectItem>
                    <SelectItem
                      value='creative'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Creative
                    </SelectItem>
                    <SelectItem
                      value='open_source'
                      className='text-white hover:bg-[#2B2B2B]'
                    >
                      Open Source
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Short Description */}
        <FormField
          control={form.control}
          name='basic.shortDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-white'>
                Short Description *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe your project in 1-2 sentences. This will be shown on project cards.'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[100px] border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <div className='text-xs text-[#919191]'>
                {field.value?.length || 0}/200 characters
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Funding Goal and Duration Row */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='basic.fundingGoal'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <DollarSign className='h-4 w-4' />
                  Funding Goal (USD) *
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='1000'
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

          <FormField
            control={form.control}
            name='basic.duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <Calendar className='h-4 w-4' />
                  Duration (months) *
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='3'
                    className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                    {...field}
                    onChange={e =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Basic;
