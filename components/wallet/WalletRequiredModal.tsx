import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { XIcon } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';
import Image from 'next/image';

interface WalletRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionName: string;
  onWalletConnected?: () => void;
}

const WalletRequiredModal: React.FC<WalletRequiredModalProps> = ({
  open,
  onOpenChange,
  actionName,
  onWalletConnected,
}) => {
  const handleWalletConnected = () => {
    onWalletConnected?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='!max-w-[552px] !w-[95vw] max-h-[90vh] rounded-[16px] bg-[#030303] gap-6 p-4 sm:p-6 border-none shadow-[0_1px_4px_0_rgba(72,72,72,0.14),0_0_4px_1px_#484848] overflow-hidden'
      >
        <DialogHeader>
          <DialogClose
            className='absolute top-2 right-2  rounded-full p-1'
            asChild
          >
            <XIcon className='w-8 h-8 text-white' />
          </DialogClose>
        </DialogHeader>

        <div className='space-y-4 flex flex-col items-center'>
          <Image
            src={'/warning.svg'}
            alt='wallet-required'
            width={100}
            height={100}
            unoptimized={true}
          />
          <DialogTitle className='flex justify-center items-center gap-2 text-center'>
            <DialogDescription className='text-center text-white/80'>
              You need to connect your wallet to{' '}
              <span className='font-bold text-white'>{actionName}</span>. This
              ensures secure and transparent transactions on the blockchain.
            </DialogDescription>
          </DialogTitle>
          <div className='flex flex-col gap-3'>
            <WalletConnectButton
              onConnect={handleWalletConnected}
              className='w-full'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletRequiredModal;
