'use client';

import type React from 'react';
import { User, Wallet, CheckIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface Backer {
  id: string;
  name: string;
  avatar?: string;
  amount: number;
  date: Date;
  walletId: string;
  isAnonymous: boolean;
}

interface BackingHistoryTableProps {
  backers: Backer[];
}

const BackingHistoryTable: React.FC<BackingHistoryTableProps> = ({
  backers,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1d';
    if (diffInDays < 7) return `${diffInDays}d`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w`;
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <>
      {/* Results Header */}
      <div className='grid grid-cols-3 gap-5 text-sm font-medium text-muted-foreground border-b border-muted-foreground/20 pb-2 mt-10 mb-0'>
        <div>Backer</div>
        <div className='pl-20'>Amount</div>
        <div className='pl-20'>Date</div>
      </div>

      {/* Backing List */}
      <div className=''>
        {backers.map(backer => (
          <div
            key={backer.id}
            className='grid grid-cols-3 gap-4 items-center border-b border-muted-foreground/20 py-5 hover:bg-muted/10 px-2 transition-colors'
          >
            <div className='flex items-center gap-3'>
              <div className='relative w-10 h-10'>
                <Avatar className='w-10 h-10'>
                  <AvatarImage src={backer.avatar || '/placeholder.svg'} />
                  <AvatarFallback
                    className={
                      backer.isAnonymous ? 'bg-green-600' : 'bg-blue-600'
                    }
                  >
                    {backer.isAnonymous ? (
                      <User className='w-4 h-4' />
                    ) : (
                      backer.name.charAt(0)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className='absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2B2B2B] border border-[#2B2B2B] rounded-full flex items-center justify-center'>
                  <CheckIcon className='w-2.5 h-2.5 text-[#787878]' />
                </div>
              </div>
              <div>
                <div className='text-white font-medium whitespace-nowrap'>
                  {backer.name}
                </div>
                <div className='text-xs text-muted-foreground flex items-center gap-1'>
                  <Wallet className='w-4 h-4 text-lg' />
                  {backer.walletId}
                </div>
              </div>
            </div>
            <div className=' font-medium ml-20 text-muted-foreground'>
              ${backer.amount.toLocaleString()}
            </div>
            <div className='text-muted-foreground ml-20'>
              {formatDate(backer.date)}
            </div>
          </div>
        ))}
      </div>

      {backers.length === 0 && (
        <div className='text-center py-8 text-muted-foreground'>
          No backers found matching your criteria
        </div>
      )}
    </>
  );
};

export default BackingHistoryTable;
