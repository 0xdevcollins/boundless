'use client';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import SignupForm from '@/components/auth/SignupForm';
import { useState } from 'react';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <AuthLoadingState message='Creating account...' />}
      <AuthLayout>
        <SignupForm onLoadingChange={setIsLoading} />
      </AuthLayout>
    </>
  );
};

export default SignupPage;
