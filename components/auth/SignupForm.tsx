'use client';
import React from 'react';
import { BoundlessButton } from '../buttons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { FormLabel } from '../ui/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { LockIcon, MailIcon, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OtpForm from './OtpForm';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [userData, setUserData] = useState<{ email: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        }),
      });

      if (response.ok) {
        setUserData({ email: values.email });
        setStep('otp');
        toast.success('OTP sent to your email!');
      } else {
        const error = await response.json();

        if (error.field) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setError(error.field as any, {
            type: 'manual',
            message: error.message,
          });
        } else if (error.message) {
          form.setError('root', {
            type: 'manual',
            message: error.message,
          });
        } else {
          form.setError('root', {
            type: 'manual',
            message: 'Failed to create account',
          });
        }
      }
    } catch {
      form.setError('root', {
        type: 'manual',
        message: 'Failed to create account. Please try again.',
      });
    }
  };

  const handleOtpSuccess = () => {
    router.push('/user');
  };

  const handleResendOtp = async () => {
    if (!userData) return;

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      });

      if (response.ok) {
        toast.success('OTP resent successfully!');
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch {
      toast.error('Failed to resend OTP');
    }
  };

  if (step === 'otp' && userData) {
    return (
      <OtpForm
        email={userData.email}
        onOtpSuccess={handleOtpSuccess}
        onResendOtp={handleResendOtp}
      />
    );
  }

  return (
    <>
      <div>
        <h2 className='text-2xl lg:text-[40px] font-medium text-white mb-3'>
          Create account
        </h2>
        <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
          Create an account to manage campaigns, apply for grants, and track
          your funding progress — all in one dashboard.
        </p>
      </div>
      <div className='space-y-6'>
        <BoundlessButton
          fullWidth
          className='bg-background border !border-[#484848] !text-white'
        >
          <Image
            src='/auth/google.svg'
            alt='google'
            width={24}
            height={24}
            className='object-cover'
            unoptimized
          />
          Continue with Google
        </BoundlessButton>

        <div className='flex items-center gap-2.5 justify-center'>
          <div className='h-[1px] bg-[#2B2B2B] w-full'></div>
          <p className='text-[#B5B5B5] text-center text-sm'>Or</p>
          <div className='h-[1px] bg-[#2B2B2B] w-full'></div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 w-full'
          >
            {form.formState.errors.root && (
              <div className='text-red-500 text-sm text-center'>
                {form.formState.errors.root.message}
              </div>
            )}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-xs font-medium'>
                      First Name
                    </FormLabel>
                    <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                      <div className='flex items-center gap-2.5 w-full'>
                        <User className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                        <Input
                          {...field}
                          type='text'
                          placeholder='Enter your first name'
                          className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-xs font-medium'>
                      Last Name
                    </FormLabel>
                    <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                      <div className='flex items-center gap-2.5 w-full'>
                        <User className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                        <Input
                          {...field}
                          type='text'
                          placeholder='Enter your last name'
                          className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-xs font-medium'>
                    Email
                  </FormLabel>
                  <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                    <div className='flex items-center gap-2.5 w-full'>
                      <MailIcon className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                      <Input
                        {...field}
                        placeholder='Enter your email'
                        className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel className='text-white text-xs font-medium'>
                    Password
                  </FormLabel>
                  <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                    <div className='flex items-center gap-2.5 w-full'>
                      <LockIcon className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                      <Input
                        {...field}
                        type='text'
                        placeholder='Enter your password'
                        className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BoundlessButton
              type='submit'
              className='w-full'
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              fullWidth
              loading={form.formState.isSubmitting}
            >
              Continue
            </BoundlessButton>
          </form>
        </Form>

        <p className='text-[#D9D9D9] text-xs lg:text-sm text-center'>
          By continuing, you agree to our{' '}
          <span className='text-white'>Terms of Service</span> and{' '}
          <span className='text-white'>Privacy Policy</span>
        </p>

        <p className='text-[#D9D9D9] text-xs lg:text-sm text-center'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='text-primary underline'>
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
