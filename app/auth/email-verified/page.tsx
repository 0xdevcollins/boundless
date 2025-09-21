'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function EmailVerifiedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/signin');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-6 w-6 text-green-600' />
          </div>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            Email Verified!
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Your email has been successfully verified. You can now sign in to
            your account.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Boundless Project</CardTitle>
            <CardDescription>
              Your account is now active and ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-4 text-center'>
              <p className='text-sm text-gray-600'>
                You will be automatically redirected to the sign-in page in a
                few seconds.
              </p>

              <div className='flex flex-col space-y-2'>
                <Button asChild className='w-full'>
                  <Link href='/auth/signin'>
                    Sign In Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>

                <Button variant='outline' asChild className='w-full'>
                  <Link href='/'>Go to Homepage</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
