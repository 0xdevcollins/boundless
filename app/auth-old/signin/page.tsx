'use client';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import LoginForm from '@/components/auth/LoginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { getSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/user';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
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
        router.push(callbackUrl);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <AuthLoadingState message='Signing in...' />}
      <AuthLayout>
        <LoginForm
          form={form}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isLoading={isLoading}
        />
      </AuthLayout>
    </>
  );
}
