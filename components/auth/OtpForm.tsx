'use client';
import { maskEmail } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { BoundlessButton } from '../buttons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { InputOTP, InputOTPSlot } from '../ui/input-otp';

const formSchema = z.object({
  otp: z.string().length(6, {
    message: 'OTP must be 6 digits',
  }),
});

interface OtpFormProps {
  email: string;
  onOtpSuccess: () => void;
  onResendOtp: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

const OtpForm = ({
  email,
  onOtpSuccess,
  onResendOtp,
  onLoadingChange,
}: OtpFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Notify parent component of loading state changes
  useEffect(() => {
    onLoadingChange?.(form.formState.isSubmitting);
  }, [form.formState.isSubmitting, onLoadingChange]);

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
          <h2 className='mb-3 text-2xl font-medium text-white lg:text-[40px]'>
            Enter OTP
          </h2>
          <p className='text-sm leading-relaxed text-[#D9D9D9] lg:text-base'>
            Enter the OTP that was sent to {maskEmail(email)}
          </p>
          <p className='text-sm leading-relaxed text-[#D9D9D9] lg:text-base'>
            Please keep this code private.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
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
                        className='h-[73px] w-[73px] !rounded-[2px] !rounded-r-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
                      />
                      <InputOTPSlot
                        index={1}
                        className='h-[73px] w-[73px] rounded-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
                      />
                      <InputOTPSlot
                        index={2}
                        className='h-[73px] w-[73px] rounded-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
                      />
                      <InputOTPSlot
                        index={3}
                        className='h-[73px] w-[73px] rounded-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
                      />
                      <InputOTPSlot
                        index={4}
                        className='h-[73px] w-[73px] rounded-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
                      />
                      <InputOTPSlot
                        index={5}
                        className='h-[73px] w-[73px] rounded-[2px] border border-[#2B2B2B] bg-[#1C1C1C] text-center text-white'
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
            className='hover:text-primary text-sm text-white underline transition-colors'
          >
            Send code again
          </button>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
