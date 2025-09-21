import Image from 'next/image';
import React from 'react';

interface WalletCardProps {
  disabled: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const WalletCard = ({ disabled, onClick, icon, label }: WalletCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-auto w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#2B2B2B] bg-[#101010] p-4 text-white transition-all duration-200 hover:border-[#404040] hover:bg-[#151515] focus:ring-2 focus:ring-[#00FF88] focus:ring-offset-2 focus:ring-offset-[#030303] focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#2B2B2B] disabled:hover:bg-[#101010]`}
    >
      <div className='relative flex h-8 w-8 items-center justify-center'>
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className='pointer-events-none h-8 w-8 object-contain'
        />
      </div>
      <p className='text-center text-sm leading-tight font-medium text-white'>
        {label}
      </p>
    </button>
  );
};

export default WalletCard;
