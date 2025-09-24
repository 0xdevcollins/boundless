'use client';

import { useState } from 'react';
import SignupForm from './SignupForm';

const SignupWrapper = ({
  setLoadingState,
}: {
  setLoadingState: (isLoading: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  setLoadingState(isLoading);

  return <SignupForm onLoadingChange={setIsLoading} />;
};

export default SignupWrapper;
