'use client';

import React, { useState } from 'react';
import AuthLoadingState from '@/components/auth/AuthLoadingState';
import ResetPasswordWrapper from '@/components/auth/ResetPasswordWrapper';

const ResetPassword = () => {
  const [loadingState, setLoadingState] = useState(false);

  return (
    <>
      {loadingState && <AuthLoadingState message='Resetting password...' />}
      <div className='relative z-10 flex min-h-screen items-center justify-center p-4'>
        <div className='w-full max-w-[500px]'>
          <div className='group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 shadow-2xl backdrop-blur-xl transition-all duration-200 hover:border-2 hover:border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]'>
            <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-50'></div>
            <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30'></div>

            <div className='relative z-10'>
              <ResetPasswordWrapper setLoadingState={setLoadingState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
