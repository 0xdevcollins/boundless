'use client';

import { useState } from 'react';
import SignupForm from './SignupForm';

const SignupWrapper = ({
  setLoadingState,
  invitation,
}: {
  setLoadingState: (isLoading: boolean) => void;
  invitation?: string | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  setLoadingState(isLoading);

  return <SignupForm onLoadingChange={setIsLoading} invitation={invitation} />;
};

export default SignupWrapper;
