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
    <div className='overflow-x-auto'>
      <div className='min-w-[600px]'>
        {/* Results Header */}
        <div className='text-muted-foreground border-muted-foreground/20 mt-10 mb-0 grid grid-cols-3 gap-5 border-b pb-2 text-sm font-medium'>
          <div>Backer</div>
          <div className='pl-20'>Amount</div>
          <div className='pl-20'>Date</div>
        </div>

        {/* Backing List */}
        <div className=''>
          {backers.map(backer => (
            <div
              key={backer.id}
              className='border-muted-foreground/20 hover:bg-muted/10 grid grid-cols-3 items-center gap-4 border-b px-2 py-5 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <div className='relative h-10 w-10'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={backer.avatar || '/placeholder.svg'} />
                    <AvatarFallback
                      className={
                        backer.isAnonymous ? 'bg-green-600' : 'bg-blue-600'
                      }
                    >
                      {backer.isAnonymous ? (
                        <User className='h-4 w-4' />
                      ) : (
                        backer.name.charAt(0)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#2B2B2B] bg-[#2B2B2B]'>
                    <CheckIcon className='h-2.5 w-2.5 text-[#787878]' />
                  </div>
                </div>
                <div>
                  <div className='font-medium whitespace-nowrap text-white'>
                    {backer.name}
                  </div>
                  <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                    <Wallet className='h-4 w-4 text-lg' />
                    {backer.walletId}
                  </div>
                </div>
              </div>
              <div className='text-muted-foreground ml-20 font-medium'>
                ${backer.amount.toLocaleString()}
              </div>
              <div className='text-muted-foreground ml-20'>
                {formatDate(backer.date)}
              </div>
            </div>
          ))}
        </div>

        {backers.length === 0 && (
          <div className='text-muted-foreground py-8 text-center'>
            No backers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default BackingHistoryTable;
