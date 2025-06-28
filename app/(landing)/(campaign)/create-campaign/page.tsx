'use client';
import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import CampaignForm from '@/components/campaign/CampaignForm';

const CreateCampaign = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#dffce8]">
        <div className="text-center">
          <LoaderCircle className="animate-spin h-10 w-10 mx-auto mb-4" />
          <p className="text-[#194247]">Please wait...</p>
        </div>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#dffce8]">
        <div className="text-center">
          <LoaderCircle className="animate-spin w-10 h-10 mx-auto mb-4" />
          <p className="text-[#194247]">Redirecting to onboarding page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dffce8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-4 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <motion.div className="relative overflow-hidden mt-0" layout transition={{ duration: 0.4 }}>
            <AnimatePresence mode="wait">
              <motion.div initial="enter" animate="center" exit="exit" className="w-full">
                <CampaignForm />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
