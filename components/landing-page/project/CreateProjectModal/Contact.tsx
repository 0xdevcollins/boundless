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
import {
  Globe,
  Github,
  Twitter,
  MessageCircle,
  Send,
  Mail,
  FileText,
  Play,
} from 'lucide-react';

interface ContactProps {
  form: ReturnType<typeof useFormContext<CreateProjectFormData>>;
  registerStepRef: (step: number, ref: { validate: () => boolean }) => void;
}

const Contact = ({ form, registerStepRef }: ContactProps) => {
  React.useEffect(() => {
    registerStepRef(5, {
      validate: () => {
        const contactData = form.getValues('contact');
        const initialDefaults = initialStepDefaults.contact;

        // Check if data is identical to initial defaults
        const isUnchanged =
          JSON.stringify(contactData) === JSON.stringify(initialDefaults);
        if (isUnchanged) return true; // Allow navigation if unchanged from initial state

        // Contact step is optional, so it's always valid when data has been entered
        return true;
      },
    });
  }, [form, registerStepRef]);

  return (
    <div className='min-h-full space-y-8 text-white'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-semibold text-white'>Contact & Links</h2>
        <p className='text-[#B5B5B5]'>
          Provide links to your project's online presence and contact
          information.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Website */}
        <FormField
          control={form.control}
          name='contact.website'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <Globe className='h-4 w-4' />
                Website
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='https://yourproject.com'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GitHub */}
        <FormField
          control={form.control}
          name='contact.github'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <Github className='h-4 w-4' />
                GitHub Repository
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='https://github.com/username/project'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter */}
        <FormField
          control={form.control}
          name='contact.twitter'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <Twitter className='h-4 w-4' />
                Twitter/X
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='https://twitter.com/yourproject'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discord and Telegram Row */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='contact.discord'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <MessageCircle className='h-4 w-4' />
                  Discord
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://discord.gg/yourproject'
                    className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact.telegram'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <Send className='h-4 w-4' />
                  Telegram
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://t.me/yourproject'
                    className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name='contact.email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                <Mail className='h-4 w-4' />
                Contact Email
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='contact@yourproject.com'
                  className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Whitepaper and Demo Row */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='contact.whitepaper'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <FileText className='h-4 w-4' />
                  Whitepaper
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://yourproject.com/whitepaper.pdf'
                    className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact.demo'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-medium text-white'>
                  <Play className='h-4 w-4' />
                  Demo/Video
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://youtube.com/watch?v=...'
                    className='bg-background/30 focus:border-primary focus:ring-primary/50 border-[#484848] text-white placeholder:text-[#919191]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Information Note */}
        <div className='bg-background/20 rounded-lg border border-[#484848] p-4'>
          <p className='text-sm text-[#B5B5B5]'>
            <strong className='text-white'>Note:</strong> All links are optional
            but recommended. Providing multiple ways for backers to learn about
            and contact your project increases credibility and engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
