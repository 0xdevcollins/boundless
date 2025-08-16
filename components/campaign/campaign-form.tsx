'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  X,
  Calendar,
  DollarSign,
  Hash,
  FileText,
  ImageIcon,
} from 'lucide-react';

const campaignFormSchema = z.object({
  campaignTitle: z
    .string()
    .min(1, 'Campaign title is required')
    .max(100, 'Campaign title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(400, 'Description must be less than 400 characters'),
  fundingGoal: z
    .string()
    .min(1, 'Funding goal is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid amount'),
  duration: z.string().min(1, 'Campaign duration is required'),
  categories: z.array(z.string()).optional(),
  images: z
    .array(z.any())
    .min(1, 'At least one image is required')
    .max(4, 'Maximum 4 images allowed'),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export function CampaignForm() {
  const [selectedTags, setSelectedTags] = useState(['Web3', 'Crowdfunding']);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      campaignTitle: 'Boundless',
      description:
        'Boundless is a trustless, decentralized application (dApp) that empowers changemakers and builders to raise funds transparently without intermediaries. Campaigns are structured around clearly defined milestones, with funds held in escrow and released only upon approval. Grant creators c...',
      fundingGoal: '123000.00',
      duration: '90',
      categories: ['Web3', 'Crowdfunding'],
      images: [],
    },
  });

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    form.setValue('categories', newTags);
  };

  const addTag = (newTag: string) => {
    if (!selectedTags.includes(newTag)) {
      const newTags = [...selectedTags, newTag];
      setSelectedTags(newTags);
      form.setValue('categories', newTags);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.slice(0, 4 - uploadedImages.length);
    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    form.setValue('images', updatedImages);
    form.trigger('images');
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    form.setValue('images', updatedImages);
    form.trigger('images');
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: CampaignFormValues) => {
    setIsSubmitting(true);

    try {
      const formData = {
        ...data,
        categories: selectedTags,
        uploadedImages: uploadedImages.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          index: index + 1,
        })),
        submittedAt: new Date().toISOString(),
      };

      console.log('Form submitted:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      form.reset();
      setSelectedTags([]);
      setUploadedImages([]);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-full flex flex-col min-h-0'>
      {/* Header with Two-Part Progress Bar */}
      <div className='flex-shrink-0 p-4 md:p-6 border-b border-gray-600'>
        <h2 className='text-white text-lg md:text-xl font-semibold mb-3 md:mb-4'>
          Set Campaign Details
        </h2>
        <div className='flex gap-1'>
          <div className='flex-1 bg-[#A7F950] rounded-full h-1'></div>
          <div className='flex-1 bg-[#1C1C1C] rounded-full h-1'></div>
        </div>
      </div>

      {/* Form Content */}
      <div
        className='flex-1 min-h-0 overflow-y-auto scroll-smooth'
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className='p-4 md:p-6'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6 max-w-2xl'
            >
              {/* Campaign Title */}
              <FormField
                control={form.control}
                name='campaignTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm font-medium flex items-center gap-2'>
                      <FileText className='w-4 h-4' />
                      Campaign Title *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#A7F950] focus:ring-[#A7F950] h-10 md:h-12'
                        aria-describedby='campaign-title-error'
                      />
                    </FormControl>
                    <FormMessage id='campaign-title-error' />
                  </FormItem>
                )}
              />

              {/* Project Description */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex justify-between items-center'>
                      <FormLabel className='text-white text-sm font-medium'>
                        <span className='hidden sm:inline'>
                          Project Description (Rich Text Editor or Markdown
                          supported) *
                        </span>
                        <span className='sm:hidden'>Project Description *</span>
                      </FormLabel>
                      <span
                        className={`text-sm ${field.value?.length >= 400 ? 'text-red-400' : 'text-gray-400'}`}
                      >
                        {field.value?.length || 0}/400
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#A7F950] focus:ring-[#A7F950] min-h-[100px] md:min-h-[120px] resize-none break-words overflow-wrap-anywhere'
                        placeholder='Describe your campaign in a few words'
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Funding Goal */}
              <FormField
                control={form.control}
                name='fundingGoal'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm font-medium flex items-center gap-2'>
                      <DollarSign className='w-4 h-4' />
                      Funding Goal *
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                          {...field}
                          className='bg-[#1C1C1C] border-gray-600 text-white placeholder-gray-500 focus:border-[#A7F950] focus:ring-[#A7F950] pl-10 h-10 md:h-12'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name='categories'
                render={() => (
                  <FormItem>
                    <div className='flex justify-between items-center'>
                      <FormLabel className='text-white text-sm font-medium flex items-center gap-2'>
                        <Hash className='w-4 h-4' />
                        Category
                      </FormLabel>
                      <span className='text-gray-400 text-sm'>Optional</span>
                    </div>
                    <div className='bg-[#1C1C1C] rounded-lg p-3 md:p-4 space-y-3 border border-gray-600'>
                      <Select onValueChange={addTag}>
                        <SelectTrigger className='bg-[#1C1C1C] border-gray-600 text-gray-200 hover:text-white focus:border-[#A7F950] focus:ring-[#A7F950] hover:border-gray-500 transition-colors h-10 md:h-12'>
                          <SelectValue
                            placeholder='Enter tag'
                            className='text-gray-200'
                          />
                        </SelectTrigger>
                        <SelectContent className='bg-[#1C1C1C] border-gray-600 border-2'>
                          <SelectItem
                            value='Web3'
                            className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                          >
                            Web3
                          </SelectItem>
                          <SelectItem
                            value='Crowdfunding'
                            className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                          >
                            Crowdfunding
                          </SelectItem>
                          <SelectItem
                            value='DeFi'
                            className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                          >
                            DeFi
                          </SelectItem>
                          <SelectItem
                            value='NFT'
                            className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                          >
                            NFT
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Selected Tags */}
                      {selectedTags.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {selectedTags.map(tag => (
                            <Badge
                              key={tag}
                              variant='secondary'
                              className='bg-black text-white border-gray-600 hover:bg-gray-900 px-2 md:px-3 py-1 text-xs md:text-sm'
                            >
                              <Hash className='w-3 h-3 mr-1' />
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className='ml-1 md:ml-2 hover:text-red-400'
                              >
                                <X className='w-3 h-3' />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />

              {/* Upload Campaign Images */}
              <FormField
                control={form.control}
                name='images'
                render={() => (
                  <FormItem>
                    <FormLabel className='text-white text-sm font-medium'>
                      Upload Campaign Images *
                    </FormLabel>
                    <div className='bg-[#1C1C1C] rounded-lg p-3 md:p-4 border border-gray-600'>
                      <input
                        ref={fileInputRef}
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                      <div className='grid grid-cols-4 gap-2 md:flex md:items-center md:gap-3'>
                        {/* Display uploaded images */}
                        {uploadedImages.map((file, index) => (
                          <div key={index} className='relative'>
                            <div className='w-12 h-12 md:w-16 md:h-16 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center'>
                              <Image
                                src={
                                  URL.createObjectURL(file) ||
                                  '/placeholder.svg'
                                }
                                alt={`Upload ${index + 1}`}
                                width={64}
                                height={64}
                                className='w-full h-full object-cover'
                                unoptimized={true}
                              />
                            </div>
                            <button
                              type='button'
                              onClick={() => removeImage(index)}
                              className='absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600'
                            >
                              <X className='w-2 h-2 md:w-3 md:h-3 text-white' />
                            </button>
                          </div>
                        ))}

                        {/* Empty slots */}
                        {Array.from({ length: 4 - uploadedImages.length }).map(
                          (_, index) => (
                            <button
                              key={`empty-${index}`}
                              type='button'
                              onClick={triggerFileUpload}
                              className='w-12 h-12 md:w-16 md:h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors border-2 border-dashed border-gray-500'
                            >
                              <ImageIcon className='w-4 h-4 md:w-6 md:h-6 text-gray-400' />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campaign Duration */}
              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm font-medium flex items-center gap-2'>
                      <Calendar className='w-4 h-4' />
                      Campaign Duration *
                    </FormLabel>
                    <div className='bg-[#1C1C1C] rounded-lg p-3 md:p-4 border border-gray-600'>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className='bg-[#1C1C1C] border-gray-600 text-white hover:border-gray-500 focus:border-[#A7F950] focus:ring-[#A7F950] transition-colors h-10 md:h-12'>
                            <SelectValue
                              placeholder='Select'
                              className='text-white'
                            />
                          </SelectTrigger>
                          <SelectContent className='bg-[#1C1C1C] border-gray-600 border-2'>
                            <SelectItem
                              value='30'
                              className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                            >
                              30 Days
                            </SelectItem>
                            <SelectItem
                              value='60'
                              className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                            >
                              60 Days
                            </SelectItem>
                            <SelectItem
                              value='90'
                              className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                            >
                              90 Days
                            </SelectItem>
                            <SelectItem
                              value='120'
                              className='text-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white cursor-pointer'
                            >
                              120 Days
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className='flex-shrink-0 p-4 md:p-6 border-t border-gray-600'>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || isSubmitting}
          className='w-full md:w-auto bg-[#A7F950] hover:bg-[#95E73E] text-black font-semibold px-6 md:px-8 py-2 md:py-3 h-10 md:h-12 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed'
          aria-describedby='submit-button-status'
        >
          {isSubmitting ? 'Submitting...' : 'Review & Submit'}
        </Button>
      </div>
    </div>
  );
}
