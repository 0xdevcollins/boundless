'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error === 'UNVERIFIED_EMAIL') {
        toast.info('Your email needs verification. Sending verification code...');

        try {
          const otpResponse = await fetch('/api/auth/resend-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          if (!otpResponse.ok) {
            toast.error('Unable to send verification code. Please try again later.');
            console.error('Failed to send OTP:', await otpResponse.json());
            setIsLoading(false);
            return;
          }
          router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
        } catch (err) {
          toast.error('Connection error. Please check your network and try again.');
          console.error('OTP resend error:', err);
          setIsLoading(false);
        }
      } else if (result?.error) {
        // Handle different error types with appropriate generic messages
        if (result.error.includes('credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else if (result.error.includes('rate')) {
          toast.error('Too many attempts. Please try again later.');
        } else {
          toast.error('Sign-in failed. Please try again later.');
        }
        console.error('Sign-in error:', result.error);
        setIsLoading(false);
      } else {
        toast.success('Signed in successfully!');
        setIsLoading(false);
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error('Unable to connect to authentication service. Please try again later.');
      console.error('Authentication error:', err);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button
          disabled={isLoading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/85 focus:outline-none"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
}
