'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BackingHistory from '@/components/flows/backing-history/backing-history';

// Sample data matching the images
const sampleBackers = [
  {
    id: '1',
    name: 'Collins Odumeje',
    avatar: '/placeholder.svg?height=32&width=32',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: false,
  },
  {
    id: '2',
    name: 'Collins Odumeje',
    avatar: '/placeholder.svg?height=32&width=32',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: false,
  },
  {
    id: '3',
    name: 'Collins Odumeje',
    avatar: '/placeholder.svg?height=32&width=32',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: false,
  },
  {
    id: '4',
    name: 'Anonymous',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: true,
  },
  {
    id: '5',
    name: 'Collins Odumeje',
    avatar: '/placeholder.svg?height=32&width=32',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: false,
  },
  {
    id: '6',
    name: 'Anonymous',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: true,
  },
  {
    id: '7',
    name: 'Anonymous',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: true,
  },
  {
    id: '8',
    name: 'Collins Odumeje',
    avatar: '/placeholder.svg?height=32&width=32',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: false,
  },
  {
    id: '9',
    name: 'Anonymous',
    amount: 2300,
    date: new Date('2025-08-05'),
    walletId: 'GDS3...GB7',
    isAnonymous: true,
  },
];

export default function Home() {
  const [showBackingHistory, setShowBackingHistory] = useState(false);

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Crowdfunding Dashboard</h1>

        <Button
          onClick={() => setShowBackingHistory(true)}
          className='bg-blue-600 hover:bg-blue-700'
        >
          View Backing History
        </Button>

        <BackingHistory
          open={showBackingHistory}
          setOpen={setShowBackingHistory}
          backers={sampleBackers}
        />
      </div>
    </div>
  );
}
