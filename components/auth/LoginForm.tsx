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
import { Input } from '../ui/input';
import { Eye, EyeOff, LockIcon, MailIcon } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

interface LoginFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
}

const LoginForm = ({
  form,
  onSubmit,
  showPassword,
  setShowPassword,
  isLoading,
}: LoginFormProps) => {
  return (
    <>
      <div className='space-y-2'>
        <h2 className='text-2xl text-center md:text-left lg:text-[40px] font-medium text-white mb-3'>
          Sign in
        </h2>
        <p className='text-sm text-center md:text-left lg:text-base text-[#D9D9D9] leading-relaxed'>
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
              disabled={isLoading || !form.formState.isValid}
              fullWidth
              loading={isLoading}
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
