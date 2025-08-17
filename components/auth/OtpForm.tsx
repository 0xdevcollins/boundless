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
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputOTP, InputOTPSlot } from '../ui/input-otp';
import { toast } from 'sonner';
import { maskEmail } from '@/lib/utils';
import Cookies from 'js-cookie';

const formSchema = z.object({
  otp: z.string().length(6, {
    message: 'OTP must be 6 digits',
  }),
});

interface OtpFormProps {
  email: string;
  onOtpSuccess: () => void;
  onResendOtp: () => void;
}

const OtpForm = ({ email, onOtpSuccess, onResendOtp }: OtpFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: values.otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.accessToken) {
          Cookies.set('accessToken', data.accessToken);
        }
        if (data.refreshToken) {
          Cookies.set('refreshToken', data.refreshToken);
        }

        toast.success('Account created successfully!');
        onOtpSuccess();
      } else {
        const error = await response.json();

        form.setError('otp', {
          type: 'manual',
          message: error.message || 'Invalid OTP',
        });
      }
    } catch {
      form.setError('otp', {
        type: 'manual',
        message: 'Failed to verify OTP. Please try again.',
      });
    }
  };

  const handleResendOtp = async () => {
    try {
      onResendOtp();
      toast.success('OTP resent successfully!');
    } catch {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <>
      <div className='space-y-6'>
        <div>
          <h2 className='text-2xl lg:text-[40px] font-medium text-white mb-3'>
            Enter OTP
          </h2>
          <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
            Enter the OTP that was sent to {maskEmail(email)}
          </p>
          <p className='text-sm lg:text-base text-[#D9D9D9] leading-relaxed'>
            Please keep this code private.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 w-full '
          >
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      className='flex items-center justify-between'
                      containerClassName='justify-between'
                    >
                      <InputOTPSlot
                        index={0}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] !rounded-r-[2px] !rounded-[2px]'
                      />
                      <InputOTPSlot
                        index={1}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] rounded-[2px]'
                      />
                      <InputOTPSlot
                        index={2}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] rounded-[2px]'
                      />
                      <InputOTPSlot
                        index={3}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] rounded-[2px]'
                      />
                      <InputOTPSlot
                        index={4}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] rounded-[2px]'
                      />
                      <InputOTPSlot
                        index={5}
                        className='w-[73px] h-[73px] text-center text-white bg-[#1C1C1C] border border-[#2B2B2B] rounded-[2px]'
                      />
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BoundlessButton
              type='submit'
              className='w-full'
              disabled={
                form.formState.isSubmitting || form.watch('otp').length !== 6
              }
              fullWidth
              loading={form.formState.isSubmitting}
            >
              Continue
            </BoundlessButton>
          </form>
        </Form>

        <div className='text-center'>
          <button
            type='button'
            onClick={handleResendOtp}
            className='text-white underline text-sm hover:text-primary transition-colors'
          >
            Send code again
          </button>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
