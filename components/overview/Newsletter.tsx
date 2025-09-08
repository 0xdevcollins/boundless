'use client';
import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail } from 'lucide-react';
import { BoundlessButton } from '../buttons';
import { Input } from '../ui/input';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { addToWaitlist } from '@/lib/api/waitlist';
import { Button } from '../ui/button';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
});

const Newsletter = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  gsap.registerPlugin(useGSAP);
  const nameFieldRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLDivElement>(null);

  const animateFieldFocus = (
    fieldRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (fieldRef.current) {
      gsap.to(fieldRef.current, {
        duration: 0.3,
        scale: 1.02,
        boxShadow: '0 0 0 1px rgb(167,249,80)',
        ease: 'power2.out',
      });
    }
  };

  const animateFieldBlur = (
    fieldRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (fieldRef.current) {
      gsap.to(fieldRef.current, {
        duration: 0.3,
        scale: 1,
        boxShadow: 'none',
        ease: 'power2.out',
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Split name into firstName and lastName, handling edge cases
      const nameParts = values.name
        .trim()
        .split(' ')
        .filter(part => part.length > 0);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await addToWaitlist({
        email: values.email,
        firstName,
        lastName,
      });
    } catch {
      setError('Failed to submit form. Please try again.');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='p-0 bg-transparent border-none shadow-none'
      >
        <div
          className='p-[1px] rounded-[12px]'
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 255, 255, 0.0) 34%, rgba(255, 255, 255, 0.2) 90%)',
          }}
        >
          <div className='rounded-[12px] bg-background p-10'>
            <DialogHeader>
              <DialogTitle className='flex gap-6'>
                <div className='md:w-[90px] md:h-[90px] w-[80px] h-[80px]'>
                  <Image
                    src={'/mail.png'}
                    alt='newsletter'
                    width={89}
                    unoptimized={true}
                    quality={100}
                    loading='eager'
                    height={89}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex-1 text-left'>
                  <h2 className='md:text-2xl text-white font-medium leading-[120%] tracking-[-0.48px]'>
                    Join Our Newsletter
                  </h2>
                  <p className='text-[#D9D9D9] md:text-base text-sm leading-[160%] font-normal'>
                    Stay Boundless! Never miss updates on grants, hackathons,
                    and projects.
                  </p>
                </div>
              </DialogTitle>
              <div className='mt-10'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='sr-only'>Name</FormLabel>
                          <FormControl>
                            <div
                              ref={nameFieldRef}
                              className='relative h-12 flex items-center p-4 rounded-lg border border-[#2B2B2B] bg-[#101010] backdrop-blur-sm transition-all duration-300'
                              onFocus={() => animateFieldFocus(nameFieldRef)}
                              onBlur={() => animateFieldBlur(nameFieldRef)}
                            >
                              <User className='w-5 h-5 text-[#B5B5B5]' />
                              <Input
                                {...field}
                                placeholder='Enter your name'
                                className='pl-10 placeholder:text-[#B5B5B5] text-white caret-[rgb(167,249,80)] absolute left-0 top-0 h-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-[0px]'
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='mt-3'>
                          <FormLabel className='sr-only'>Email</FormLabel>
                          <FormControl>
                            <div
                              ref={emailFieldRef}
                              className='relative h-12 flex items-center p-4 rounded-lg border border-[#2B2B2B] bg-[#101010] backdrop-blur-sm transition-all duration-300'
                              onFocus={() => animateFieldFocus(emailFieldRef)}
                              onBlur={() => animateFieldBlur(emailFieldRef)}
                            >
                              <Mail className='w-5 h-5 text-[#B5B5B5]' />
                              <Input
                                {...field}
                                placeholder='Enter your email'
                                className='pl-10 placeholder:text-[#B5B5B5] text-white caret-[#A7F950] absolute left-0 top-0 h-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-[0px]'
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <BoundlessButton
                      variant={form.formState.isValid ? 'default' : 'outline'}
                      type='submit'
                      fullWidth
                      size='xl'
                      disabled={!form.formState.isValid}
                      loading={isSubmitting}
                      className='w-full mt-11 disabled:bg-[#212121]  disabled:border-[#2B2B2B] disabled:text-[#787878]'
                    >
                      Subscribe
                    </BoundlessButton>
                  </form>
                </Form>
              </div>
              {error && (
                <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
              )}
              <DialogClose asChild>
                <Button variant='link' className='underline text-white'>
                  Maybe Later
                </Button>
              </DialogClose>
            </DialogHeader>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Newsletter;
