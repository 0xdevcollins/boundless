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
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

interface CreatePasswordFormProps {
  email: string;
  name: string;
}

const CreatePasswordForm = ({ email, name }: CreatePasswordFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Here you would typically create the user account with password
      const response = await fetch('/api/auth/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Set cookies if tokens are returned
        if (data.accessToken) {
          Cookies.set('accessToken', data.accessToken);
        }
        if (data.refreshToken) {
          Cookies.set('refreshToken', data.refreshToken);
        }

        toast.success('Account created successfully!');
        router.push('/user');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create account');
      }
    } catch {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <>
      <div className='space-y-6'>
        <div>
          <h2 className='mb-3 text-2xl font-medium text-white lg:text-[40px]'>
            Create password
          </h2>
          <p className='text-sm leading-relaxed text-[#D9D9D9] lg:text-base'>
            Enter the OTP that was sent to {email}
          </p>
          <p className='text-sm leading-relaxed text-[#D9D9D9] lg:text-base'>
            Please keep this code private.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-4'
          >
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-medium text-white'>
                    Password
                  </FormLabel>
                  <FormControl className='h-11 w-full rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5'>
                    <div className='flex w-full items-center gap-2.5'>
                      <LockIcon className='h-5 w-5 flex-shrink-0 text-[#B5B5B5]' />
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        className='w-full border-none bg-transparent text-white caret-white placeholder:text-[#B5B5B5] focus-visible:ring-0 focus-visible:ring-offset-0'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='flex-shrink-0'
                      >
                        {showPassword ? (
                          <EyeOffIcon className='h-5 w-5 text-[#B5B5B5]' />
                        ) : (
                          <EyeIcon className='h-5 w-5 text-[#B5B5B5]' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-medium text-white'>
                    Confirm password
                  </FormLabel>
                  <FormControl className='h-11 w-full rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5'>
                    <div className='flex w-full items-center gap-2.5'>
                      <LockIcon className='h-5 w-5 flex-shrink-0 text-[#B5B5B5]' />
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm your password'
                        className='w-full border-none bg-transparent text-white caret-white placeholder:text-[#B5B5B5] focus-visible:ring-0 focus-visible:ring-offset-0'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='flex-shrink-0'
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className='h-5 w-5 text-[#B5B5B5]' />
                        ) : (
                          <EyeIcon className='h-5 w-5 text-[#B5B5B5]' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BoundlessButton
              type='submit'
              className='mt-6 w-full'
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              fullWidth
            >
              Proceed to Dashboard
            </BoundlessButton>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreatePasswordForm;
