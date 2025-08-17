'use client';
import React, { useState } from 'react';
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
import { Eye, EyeOff, LockIcon, MailIcon } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/user';
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'UNVERIFIED_EMAIL') {
          toast.error(
            'Please verify your email before signing in. Check your inbox for a verification link.'
          );
          setTimeout(() => {
            router.push(
              `/auth/verify-email?email=${encodeURIComponent(values.email)}`
            );
          }, 3000);
        } else {
          form.setError('email', {
            type: 'manual',
            message: 'Invalid email or password',
          });
          form.setError('password', {
            type: 'manual',
            message: 'Invalid email or password',
          });
        }
      } else if (result?.ok) {
        const session = await getSession();

        if (session) {
          if (session.user.accessToken) {
            Cookies.set('accessToken', session.user.accessToken);
          }
          if (session.user.refreshToken) {
            Cookies.set('refreshToken', session.user.refreshToken);
          }
          router.push(callbackUrl);
        } else {
          form.setError('root', {
            type: 'manual',
            message:
              'Login successful but session not found. Please try again.',
          });
        }
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch {
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <>
      <div>
        <h2 className='text-2xl lg:text-[40px] font-medium text-white mb-3'>
          Sign in
        </h2>
        <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
          Sign in to manage campaigns, apply for grants, and track your funding
          progress — all in one dashboard.
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
                <FormItem>
                  <FormLabel className='text-white text-xs font-medium'>
                    Password
                  </FormLabel>
                  <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                    <div className='relative flex items-center gap-2.5 w-full'>
                      <LockIcon className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full pl-2 pr-10'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='remember'
                  className='border-[#6D6D6D] w-6.5 h-6.5'
                />
                <Label htmlFor='remember' className='text-white text-sm'>
                  Remember me for 30 days
                </Label>
              </div>
              <Link
                href='/auth/forgot-password'
                className='text-[#D9D9D9] underline text-sm'
              >
                Forgot password?
              </Link>
            </div>

            <BoundlessButton
              type='submit'
              className='w-full'
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              fullWidth
              loading={form.formState.isSubmitting}
            >
              Sign in
            </BoundlessButton>
          </form>
        </Form>

        <p className='text-[#D9D9D9] text-xs lg:text-sm text-center'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/signup' className='text-primary underline'>
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
