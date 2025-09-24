'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
import z from 'zod';
import LoginForm from './LoginForm';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

type FormData = z.infer<typeof formSchema>;

interface LoginWrapperProps {
  setLoadingState: (isLoading: boolean) => void;
}

const LoginWrapper = ({ setLoadingState }: LoginWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthError = useCallback(
    (error: string, values: FormData) => {
      switch (error) {
        case 'UNVERIFIED_EMAIL':
          toast.error(
            'Please verify your email before signing in. Check your inbox for a verification link.'
          );
          setTimeout(() => {
            router.push(
              `/auth/verify-email?email=${encodeURIComponent(values.email)}`
            );
          }, 3000);
          break;
        case 'CredentialsSignin':
          form.setError('root', {
            type: 'manual',
            message: 'Invalid email or password',
          });
          break;
        default:
          form.setError('root', {
            type: 'manual',
            message: 'Authentication failed. Please try again.',
          });
      }
    },
    [form, router]
  );

  const handleSessionSetup = useCallback(
    async (session: {
      user?: { accessToken?: string; refreshToken?: string };
    }) => {
      if (session?.user?.accessToken) {
        Cookies.set('accessToken', session.user.accessToken);
      }
      if (session?.user?.refreshToken) {
        Cookies.set('refreshToken', session.user.refreshToken);
      }
      router.push(callbackUrl);
    },
    [router, callbackUrl]
  );

  const onSubmit = useCallback(
    async (values: FormData) => {
      setIsLoading(true);
      setLoadingState(true);

      try {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          handleAuthError(result.error, values);
          return;
        }

        if (result?.ok) {
          const session = await getSession();

          if (session) {
            await handleSessionSetup(session);
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
      } finally {
        setIsLoading(false);
        setLoadingState(false);
      }
    },
    [form, handleAuthError, handleSessionSetup, setLoadingState]
  );

  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isLoading={isLoading}
    />
  );
};

export default LoginWrapper;
