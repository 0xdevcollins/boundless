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
    } catch (error) {
      console.error('Account creation error:', error);
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <>
      <div className='space-y-6'>
        <div>
          <h2 className='text-2xl lg:text-[40px] font-medium text-white mb-3'>
            Create password
          </h2>
          <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
            Enter the OTP that was sent to {email}
          </p>
          <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
            Please keep this code private.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 w-full'
          >
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-xs font-medium'>
                    Password
                  </FormLabel>
                  <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                    <div className='flex items-center gap-2.5 w-full'>
                      <LockIcon className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='flex-shrink-0'
                      >
                        {showPassword ? (
                          <EyeOffIcon className='w-5 h-5 text-[#B5B5B5]' />
                        ) : (
                          <EyeIcon className='w-5 h-5 text-[#B5B5B5]' />
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
                  <FormLabel className='text-white text-xs font-medium'>
                    Confirm password
                  </FormLabel>
                  <FormControl className='rounded-[12px] border border-[#2B2B2B] bg-[#1C1C1C] p-2.5 h-11 w-full'>
                    <div className='flex items-center gap-2.5 w-full'>
                      <LockIcon className='w-5 h-5 text-[#B5B5B5] flex-shrink-0' />
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm your password'
                        className='bg-transparent text-white placeholder:text-[#B5B5B5] border-none focus-visible:ring-0 focus-visible:ring-offset-0 caret-white w-full'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='flex-shrink-0'
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className='w-5 h-5 text-[#B5B5B5]' />
                        ) : (
                          <EyeIcon className='w-5 h-5 text-[#B5B5B5]' />
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
              className='w-full mt-6'
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
