'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ActivityItem {
  id: string;
  type: 'comment' | 'back' | 'add' | 'submit' | 'apply' | 'reply';
  description: string;
  projectName?: string;
  amount?: string;
  hackathonName?: string;
  grantName?: string;
  timestamp: string;
  emoji?: string;
  image?: string;
}

const mockActivities: ActivityItem[] = [
  // TODAY
  {
    id: '1',
    type: 'comment',
    description: 'Commented on project:',
    projectName: 'Bitmed',
    emoji: '💡🌍',
    timestamp: '2 mins ago',
  },
  {
    id: '2',
    type: 'back',
    description: 'Backed project:',
    projectName: 'SolarPay',
    amount: '$250 USDC',
    timestamp: '10 mins ago',
  },
  {
    id: '3',
    type: 'add',
    description: 'Added new project:',
    projectName: 'EduChain',
    timestamp: '30 mins ago',
  },
  {
    id: '4',
    type: 'submit',
    description: 'Submitted project:',
    projectName: 'EduChain',
    hackathonName: 'DeFi Innovators Hackathon',
    timestamp: '11 h',
  },
  // YESTERDAY
  {
    id: '5',
    type: 'comment',
    description: 'Commented on project:',
    projectName: 'EduChain',
    emoji: '📱',
    timestamp: 'Yesterday',
  },
  {
    id: '6',
    type: 'back',
    description: 'Backed project:',
    projectName: 'AgriChain',
    amount: '$75 USDC',
    timestamp: 'Yesterday',
  },
  // THIS WEEK
  {
    id: '7',
    type: 'apply',
    description: 'Applied for grant:',
    grantName: 'Open Finance Fund',
    timestamp: '2d',
  },
  {
    id: '8',
    type: 'submit',
    description: 'Submitted project to hackathon:',
    hackathonName: 'Global Impact Hack 2025',
    timestamp: '2d',
  },
  {
    id: '9',
    type: 'reply',
    description: 'Replied to comment on',
    projectName: 'SolarPay',
    emoji: '🔜',
    timestamp: '3d',
  },
  {
    id: '10',
    type: 'back',
    description: 'Backed project:',
    projectName: 'GreenGrid',
    amount: '$500 USDC',
    timestamp: '3d',
  },
];

const getActivityDescription = (activity: ActivityItem) => {
  let description = activity.description;

  if (activity.projectName) {
    description += ` ${activity.projectName}`;
  }

  if (
    activity.description.includes('to hackathon:') &&
    activity.hackathonName
  ) {
    description += ` ${activity.hackathonName}`;
  }

  if (activity.amount) {
    description += ` — Funded ${activity.amount}`;
  }

  if (activity.emoji) {
    description += ` ${activity.emoji}`;
  }

  return description;
};

interface ActivityFeedProps {
  filter: string;
}

export default function ActivityFeed({ filter }: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(false);

  const todayActivities = mockActivities.slice(0, 4);
  const yesterdayActivities = mockActivities.slice(4, 6);
  const weekActivities = mockActivities.slice(6, 10);

  // Filter activities based on selected filter
  const getFilteredActivities = () => {
    switch (filter) {
      case 'Today':
        return [{ title: 'TODAY', activities: todayActivities }];
      case 'Yesterday':
        return [{ title: 'YESTERDAY', activities: yesterdayActivities }];
      case 'This Week':
        return [
          { title: 'TODAY', activities: todayActivities },
          { title: 'YESTERDAY', activities: yesterdayActivities },
          { title: 'THIS WEEK', activities: weekActivities },
        ];
      case 'This Month':
        return [
          { title: 'TODAY', activities: todayActivities },
          { title: 'YESTERDAY', activities: yesterdayActivities },
          { title: 'THIS WEEK', activities: weekActivities },
        ];
      case 'This Year':
        return [
          { title: 'TODAY', activities: todayActivities },
          { title: 'YESTERDAY', activities: yesterdayActivities },
          { title: 'THIS WEEK', activities: weekActivities },
        ];
      case 'All Time':
        return [
          { title: 'TODAY', activities: todayActivities },
          { title: 'YESTERDAY', activities: yesterdayActivities },
          { title: 'THIS WEEK', activities: weekActivities },
        ];
      default: // 'All'
        return [
          { title: 'TODAY', activities: todayActivities },
          { title: 'YESTERDAY', activities: yesterdayActivities },
          { title: 'THIS WEEK', activities: weekActivities },
        ];
    }
  };

  const groupedActivities = getFilteredActivities();

  return (
    <div className='space-y-6'>
      {groupedActivities.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3 className='mb-4 text-sm text-white'>{group.title}</h3>
          <div className='ml-5 space-y-4'>
            {group.activities.map(activity => (
              <div key={activity.id} className='flex items-start gap-3'>
                <Image
                  src={activity.image || '/avatar.png'}
                  alt={activity.projectName || 'Project Image'}
                  width={20}
                  height={20}
                  className='h-8 w-8 rounded-full'
                />
                <div className='flex-1'>
                  <p className='text-sm text-white'>
                    {getActivityDescription(activity)}
                  </p>
                  <p className='mt-1 text-xs text-gray-400'>
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showAll && filter === 'All' && (
        <div>
          <h3 className='mb-4 text-sm text-white'>EARLIER</h3>
          <div className='ml-5 space-y-4'>
            {mockActivities.slice(10).map(activity => (
              <div key={activity.id} className='flex items-start gap-3'>
                <Image
                  src={activity.image || '/admin.png'}
                  alt={activity.projectName || 'Project Image'}
                  width={20}
                  height={20}
                  className='h-8 w-8 rounded-full'
                />
                <div className='flex-1'>
                  <p className='text-sm text-white'>
                    {getActivityDescription(activity)}
                  </p>
                  <p className='mt-1 text-xs text-gray-400'>
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filter === 'All' && (
        <div className='flex justify-center pt-4'>
          <button
            onClick={() => setShowAll(!showAll)}
            className='flex items-center gap-2 text-gray-400 transition-colors hover:text-white'
          >
            {showAll ? 'Show Less' : 'Show More'}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
