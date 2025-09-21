'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AuthLoadingStateProps {
  message?: string;
  className?: string;
}

const AuthLoadingState = ({
  message = 'Signing in...',
  className,
}: AuthLoadingStateProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[999999] flex items-center justify-center',
        'bg-black/90 backdrop-blur-sm',
        className
      )}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl' />
        <div className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-green-600/5 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 flex flex-col items-center'>
        <div className='relative flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 h-10 sm:h-12'>
          <motion.div
            className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full'
            animate={{
              height: ['8px', '32px', '8px', '40px', '8px'],
              backgroundColor: [
                'rgba(167, 249, 80, 0.08)',
                '#a7f950',
                'rgba(167, 249, 80, 0.08)',
              ],
              alignSelf: ['center', 'end', 'center', 'end', 'center'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0,
            }}
          />

          <motion.div
            className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full'
            animate={{
              height: ['8px', '32px', '8px', '40px', '8px'],
              backgroundColor: [
                'rgba(167, 249, 80, 0.08)',
                '#a7f950',
                'rgba(167, 249, 80, 0.08)',
              ],
              alignSelf: ['center', 'end', 'center', 'end', 'center'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.0,
            }}
          />

          <motion.div
            className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full'
            animate={{
              height: ['8px', '32px', '8px', '40px', '8px'],
              backgroundColor: [
                'rgba(167, 249, 80, 0.08)',
                '#a7f950',
                'rgba(167, 249, 80, 0.08)',
              ],
              alignSelf: ['center', 'end', 'center', 'end', 'center'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.0,
            }}
          />
        </div>

        <motion.h2
          className='text-white text-base sm:text-lg font-normal tracking-wide px-4 text-center'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {message}
        </motion.h2>
      </div>
    </div>
  );
};

export default AuthLoadingState;
