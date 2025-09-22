'use client';

import AuthLoadingState from '@/components/auth/AuthLoadingState';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully! Redirecting...');
        setTimeout(() => {
          router.push('/auth/email-verified');
        }, 1500);
      } else {
        setError(data.message || 'Failed to verify email');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP has been resent to your email address.');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {isLoading && <AuthLoadingState />}
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Verify your email
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Enter the verification code sent to your email
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>
                Check your email for the verification code
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>
                    {typeof error === 'string' ? error : 'An error occurred'}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <div className='relative'>
                    <Mail className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='email'
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      className='pl-10'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='otp'>Verification Code</Label>
                  <Input
                    id='otp'
                    type='text'
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder='Enter 6-digit code'
                    maxLength={6}
                    className='text-center text-lg tracking-widest'
                    required
                  />
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Verify Email
                </Button>
              </form>

              <div className='space-y-2 text-center'>
                <Button
                  variant='outline'
                  onClick={handleResendOtp}
                  disabled={isResending || !email}
                  className='w-full'
                >
                  {isResending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className='mr-2 h-4 w-4' />
                      Resend Code
                    </>
                  )}
                </Button>

                <div>
                  <Link
                    href='/auth/signin'
                    className='inline-flex items-center text-sm text-blue-600 hover:text-blue-500'
                  >
                    <ArrowLeft className='mr-1 h-4 w-4' />
                    Back to sign in
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
