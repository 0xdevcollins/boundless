'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BoundlessButton } from '@/components/buttons';

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const res = await response.json();

      if (response.ok) {
        setSuccessMessage(
          'Password reset instructions have been sent to your email address.'
        );
        form.reset();
      } else {
        setErrorMessage(res.message || 'Failed to send reset email');
      }
    } catch {
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-16'>
      <div className='absolute top-16 left-16'>
        <Image
          src='/auth/logo.svg'
          alt='logo'
          width={123}
          height={22}
          className='object-cover'
        />
      </div>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-[40px] font-medium text-white'>
            Reset Password
          </h2>
          <p className='mt-2 text-[#D9D9D9]'>
            Enter the email address you used when you joined, and we'll send you
            instructions to reset your password.
          </p>
        </div>

        {successMessage && (
          <div className='text-sm text-green-500'>{successMessage}</div>
        )}

        {errorMessage && (
          <div className='text-sm text-red-500'>{errorMessage}</div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-medium text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute top-3 left-3 h-4 w-4 text-[#B5B5B5]' />
                      <Input
                        {...field}
                        type='email'
                        placeholder='Enter your email'
                        className='w-full border-[#2B2B2B] bg-[#1C1C1C] pl-10 text-white caret-white placeholder:text-[#B5B5B5] focus-visible:ring-0 focus-visible:ring-offset-0'
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
              disabled={isLoading}
              fullWidth
              loading={isLoading}
            >
              Send Reset Link
            </BoundlessButton>
          </form>
        </Form>

        <div className='text-center'>
          <Link
            href='/auth/signin'
            className='text-primary hover:text-primary/80 inline-flex items-center text-sm'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
