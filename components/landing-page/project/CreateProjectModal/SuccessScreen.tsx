import { BoundlessButton } from '@/components/buttons';
import Image from 'next/image';

const SuccessScreen = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[#030303] px-10'>
      <div className='mx-auto flex max-w-[400px] flex-col items-center gap-10'>
        <Image
          src='/Success@4x.png'
          alt='Green good mark'
          width={120}
          height={120}
          className='max-h-[150px] max-w-[150px]'
        />
        <div className='flex flex-col gap-3 text-center text-white'>
          <h2 className='text-[20px] font-medium'>Submission Successful!</h2>
          <p>
            Your project has been sent for admin review and will be processed
            within 72 hours. You can track its status anytime on the{' '}
            <span className='font-medium text-[#A7F950] underline'>
              Projects Page
            </span>
          </p>
        </div>

        <BoundlessButton onClick={onContinue}>Continue</BoundlessButton>
      </div>
    </div>
  );
};

export default SuccessScreen;
