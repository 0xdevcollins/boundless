import {
  BadgeCheck,
  Wallet,
  Gift,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

const BADGES = [
  {
    key: 'creator',
    icon: Wallet,
    name: 'Creator',
    description: "You've launched a campaign",
    iconClass: 'text-blue-500',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    key: 'backer',
    icon: BadgeCheck,
    name: 'Backer',
    description: "You've funded a campaign",
    iconClass: 'text-green-500',
    color: 'bg-green-50 border-green-200',
  },
  {
    key: 'grant_applicant',
    icon: Gift,
    name: 'Grant Applicant',
    description: "You've applied for a grant",
    iconClass: 'text-purple-500',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    key: 'grant_creator',
    icon: Building2,
    name: 'Grant Creator',
    description: "You've launched a grant program",
    iconClass: 'text-yellow-500',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    key: 'verified',
    icon: ShieldCheck,
    name: 'Verified',
    description: 'Your KYC is complete',
    iconClass: 'text-indigo-500',
    color: 'bg-indigo-50 border-indigo-200',
  },
];

interface ActiveBadgesProps {
  badges: string[];
}

export default function ActiveBadges({ badges }: ActiveBadgesProps) {
  const normalized = badges.map((b) => b.toLowerCase());
  const earned = BADGES.filter(b => normalized.includes(b.key));
  if (earned.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        🎖️ Your Badges
      </h2>
      <div className="flex flex-wrap gap-3">
        {earned.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.key}
              className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all hover:shadow-md hover:scale-[1.02] cursor-default',
                badge.color
              )}
              title={badge.description}
              aria-label={badge.name}
            >
              <Icon className={clsx('h-5 w-5', badge.iconClass)} />
              <span className="text-sm font-medium text-gray-800">{badge.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
