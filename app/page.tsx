'use client';
import { PriceDisplay } from '@/components/PriceDisplay';
import EmptyState from '@/components/EmptyState';
import { BoundlessButton } from '@/components/buttons';
import { Coins, History, Plus, Rocket } from 'lucide-react';
import Card from '@/components/card';
import RecentProjects from '@/components/overview/RecentProjects';
import RecentContributions from '@/components/overview/ReecntContributions';
import GrantHistory from '@/components/overview/GrantHistory';
// import { AuthNav } from '@/components/auth/AuthNav';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  slideInFromLeft,
  slideInFromRight,
} from '@/lib/motion';
import PageTransition from '@/components/PageTransition';
import { useState } from 'react';
import LaunchCampaignFlow from '@/components/project/LaunchCampaignFlow';
import BoundlessSheet from '@/components/sheet/boundless-sheet';

export default function Home() {
  const [showLaunchFlow, setShowLaunchFlow] = useState(false);

  return (
    <PageTransition>
      <motion.div
        className='font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'
        initial='hidden'
        animate='visible'
        variants={staggerContainer}
      >
        <motion.header
          className='w-full max-w-6xl flex justify-between items-center'
          variants={slideInFromLeft}
        >
          <h1 className='text-2xl font-bold text-white'>Boundless Project</h1>
          {/* Temporarily removed AuthNav */}
          <div className='flex space-x-4'>
            <BoundlessButton
              onClick={() => setShowLaunchFlow(true)}
              className='bg-green-600 hover:bg-green-700'
            >
              <Rocket className='mr-2 h-4 w-4' />
              Test Launch Campaign
            </BoundlessButton>
          </div>
        </motion.header>
        <motion.main
          className='flex flex-col gap-[32px] items-center sm:items-start'
          variants={staggerContainer}
        >
          <motion.div
            className='bg-[#1C1C1C] rounded-lg p-4 w-full max-w-[550px]'
            variants={fadeInUp}
          >
            <PriceDisplay price={100} className='text-2xl font-bold' />
            <EmptyState
              title='No comments yet'
              description='Start by sharing your first project idea with the Boundless community. Once submitted, your projects will appear here for easy tracking.'
              type='default'
              action={
                <BoundlessButton
                  variant='default'
                  size='lg'
                  icon={<Plus className='w-5 h-5' />}
                  iconPosition='right'
                >
                  Add comment
                </BoundlessButton>
              }
            />
          </motion.div>
          <motion.div className='flex gap-4' variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Card
                title='Active Campaigns'
                value='10'
                bottomText={
                  <div className='flex items-center gap-2'>
                    <Coins className='w-4 h-4 text-white/60' />
                    <PriceDisplay
                      price={0}
                      className='!text-xs !tracking-[-0.06px]'
                    />
                  </div>
                }
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card
                title='Pending Submissions'
                value='0'
                bottomText={
                  <div className='flex items-center gap-2'>
                    <History className='w-4 h-4 text-white/60' />
                    <span className='text-white/60'>No recent submissions</span>
                  </div>
                }
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card
                title='Active Projects'
                value='0'
                bottomText={
                  <div className='flex items-center gap-2'>
                    <span className='text-white/90'>0</span>
                    Approved Submissions
                  </div>
                }
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card
                title='Available Grants'
                value={
                  <PriceDisplay price={0} className='!tracking-[-0.06px]' />
                }
                bottomText={
                  <div className='flex items-center gap-2 text-white/90'>
                    6 grants available
                  </div>
                }
              />
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <RecentProjects projects={[]} />
          </motion.div>
          <motion.div className='flex gap-4' variants={staggerContainer}>
            <motion.div variants={slideInFromLeft}>
              <RecentContributions projects={[]} />
            </motion.div>
            <motion.div variants={slideInFromRight}>
              <GrantHistory projects={[]} />
            </motion.div>
          </motion.div>
        </motion.main>

        {/* Launch Campaign Flow Modal */}
        <BoundlessSheet
          open={showLaunchFlow}
          setOpen={setShowLaunchFlow}
          contentClassName='h-full'
        >
          <LaunchCampaignFlow
            projectId='test-project-123'
            onBack={() => setShowLaunchFlow(false)}
            onComplete={() => setShowLaunchFlow(false)}
          />
        </BoundlessSheet>
      </motion.div>
    </PageTransition>
  );
}
