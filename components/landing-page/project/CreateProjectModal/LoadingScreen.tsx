'use client';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[#030303]'>
      <div className='flex items-center gap-2'>
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className='h-[9.85px] w-[9.85px] rounded-full bg-[#A7F95014]' // 🔥 use background color
            animate={{
              backgroundColor: ['#A7F95014', '#A7F950', '#A7F95014'],
              height: ['9.85px', '39.38px', '9.85px'],
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: index * 0.2, // ✅ use delay instead of repeatDelay
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
