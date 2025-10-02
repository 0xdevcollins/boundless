'use client';

import React, { useState } from 'react';
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
import { Plus, X, FileText, Target, Users, Code, MapPin } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

interface DetailsProps {
  form: ReturnType<typeof useFormContext<CreateProjectFormData>>;
  registerStepRef: (step: number, ref: { validate: () => boolean }) => void;
}

const Details = ({ form, registerStepRef }: DetailsProps) => {
  const [keyFeature, setKeyFeature] = useState('');
  const [technology, setTechnology] = useState('');

  const {
    fields: keyFeatures,
    append: appendKeyFeature,
    remove: removeKeyFeature,
  } = useFieldArray({
    control: form.control,
    name: 'details.keyFeatures',
  });

  const {
    fields: technologies,
    append: appendTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control: form.control,
    name: 'details.technologyStack',
  });

  React.useEffect(() => {
    registerStepRef(2, {
      validate: () => {
        const detailsData = form.getValues('details');
        const initialDefaults = initialStepDefaults.details;

        // Check if data is identical to initial defaults
        const isUnchanged =
          JSON.stringify(detailsData) === JSON.stringify(initialDefaults);
        if (isUnchanged) return true; // Allow navigation if unchanged from initial state

        return !!(
          detailsData.description &&
          detailsData.problemStatement &&
          detailsData.solution &&
          detailsData.targetAudience &&
          detailsData.keyFeatures.length > 0 &&
          detailsData.technologyStack.length > 0 &&
          detailsData.roadmap
        );
      },
    });
  }, [form, registerStepRef]);

  const addKeyFeature = () => {
    if (keyFeature.trim()) {
      appendKeyFeature(keyFeature.trim());
      setKeyFeature('');
    }
  };

  const addTechnology = () => {
    if (technology.trim()) {
      appendTechnology(technology.trim());
      setTechnology('');
    }
  };

  return (
    <div className='min-h-full space-y-8 text-white'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold text-white'>Project Details</h2>
        <p className='text-[#B5B5B5]'>
          Provide detailed information about your project. This will help
          backers understand your vision.
        </p>
      </div>

      <div className='space-y-8'>
        {/* Project Description */}
        <FormField
          control={form.control}
          name='details.description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <FileText className='h-4 w-4' />
                Project Description *
              </FormLabel>
              <FormControl>
                <div className='bg-background/30 overflow-hidden rounded-md border border-[#484848]'>
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    data-color-mode='dark'
                    height={300}
                    preview='edit'
                    hideToolbar={false}
                    visibleDragBar={false}
                    textareaProps={{
                      placeholder:
                        'Describe your project in detail. What problem does it solve? How does it work? What makes it unique?',
                      style: {
                        background: 'transparent',
                        color: '#ffffff',
                        fontSize: '14px',
                        lineHeight: '1.6',
                      },
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Problem Statement */}
        <FormField
          control={form.control}
          name='details.problemStatement'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-white'>
                Problem Statement *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='What problem does your project solve? Be specific about the pain points you address.'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[120px] border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Solution */}
        <FormField
          control={form.control}
          name='details.solution'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium text-white'>
                Solution *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='How does your project solve the problem? Describe your approach and methodology.'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[120px] border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Audience */}
        <FormField
          control={form.control}
          name='details.targetAudience'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <Target className='h-4 w-4' />
                Target Audience *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Who will benefit from your project? Describe your target users and their needs.'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[100px] border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Key Features */}
        <div className='space-y-4'>
          <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
            <Users className='h-4 w-4' />
            Key Features *
          </FormLabel>
          <div className='space-y-3'>
            {keyFeatures.map((feature, index) => (
              <div key={feature.id} className='flex items-center gap-2'>
                <Input
                  value={feature}
                  onChange={e =>
                    form.setValue(
                      `details.keyFeatures.${index}`,
                      e.target.value
                    )
                  }
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  placeholder='Enter a key feature'
                />
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => removeKeyFeature(index)}
                  className='h-9 w-9 border-[#484848] text-white hover:bg-[#2B2B2B]'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ))}
            <div className='flex items-center gap-2'>
              <Input
                value={keyFeature}
                onChange={e => setKeyFeature(e.target.value)}
                placeholder='Add a key feature'
                className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                onKeyPress={e =>
                  e.key === 'Enter' && (e.preventDefault(), addKeyFeature())
                }
              />
              <Button
                type='button'
                variant='outline'
                size='icon'
                onClick={addKeyFeature}
                className='h-9 w-9 border-[#484848] text-white hover:bg-[#2B2B2B]'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>
          {form.formState.errors.keyFeatures && (
            <p className='text-destructive text-sm'>
              {form.formState.errors.keyFeatures.message}
            </p>
          )}
        </div>

        {/* Technology Stack */}
        <div className='space-y-4'>
          <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
            <Code className='h-4 w-4' />
            Technology Stack *
          </FormLabel>
          <div className='space-y-3'>
            {technologies.map((tech, index) => (
              <div key={tech.id} className='flex items-center gap-2'>
                <Input
                  value={tech}
                  onChange={e =>
                    form.setValue(
                      `details.technologyStack.${index}`,
                      e.target.value
                    )
                  }
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  placeholder='Enter a technology'
                />
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  onClick={() => removeTechnology(index)}
                  className='h-9 w-9 border-[#484848] text-white hover:bg-[#2B2B2B]'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ))}
            <div className='flex items-center gap-2'>
              <Input
                value={technology}
                onChange={e => setTechnology(e.target.value)}
                placeholder='Add a technology'
                className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                onKeyPress={e =>
                  e.key === 'Enter' && (e.preventDefault(), addTechnology())
                }
              />
              <Button
                type='button'
                variant='outline'
                size='icon'
                onClick={addTechnology}
                className='h-9 w-9 border-[#484848] text-white hover:bg-[#2B2B2B]'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>
          {form.formState.errors.technologyStack && (
            <p className='text-destructive text-sm'>
              {form.formState.errors.technologyStack.message}
            </p>
          )}
        </div>

        {/* Roadmap */}
        <FormField
          control={form.control}
          name='details.roadmap'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <MapPin className='h-4 w-4' />
                Project Roadmap *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe your project timeline and key milestones. What will you accomplish and when?'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 min-h-[120px] border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Details;
