import React, { useEffect, useState } from 'react';
import { BadgeCheck, Wallet, Gift, ShieldCheck } from 'lucide-react';

// Mock: badges the user has earned
const userBadges = ['creator', 'backer', 'grant_applicant', 'verified', 'grant_creator'];

type Suggestion = { icon: React.FC<{ className?: string }>; text: string };

const rawSuggestions: (Suggestion | false)[] = [
  userBadges.includes('creator') && {
    icon: Wallet,
    text: 'Add a milestone to your project',
  },
  userBadges.includes('backer') && {
    icon: BadgeCheck,
    text: 'Check updates from backed projects',
  },
  userBadges.includes('grant_applicant') && {
    icon: Gift,
    text: 'Edit your grant proposal',
  },
  !userBadges.includes('verified') && {
    icon: ShieldCheck,
    text: 'Verify your identity to unlock more features',
  },
];

const suggestions: Suggestion[] = rawSuggestions.filter((s): s is Suggestion => Boolean(s));

export default function SuggestedNextSteps() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (suggestions.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [suggestions.length]);

  if (suggestions.length === 0) return null;
  const { icon: Icon, text } = suggestions[index];

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold mb-2">Next Step</h2>
      <div className="flex flex-col items-center justify-center min-h-[80px]">
        <div className="w-full max-w-xs bg-white border rounded shadow px-4 py-5 flex flex-col items-center gap-2 transition-all">
          <Icon className="h-6 w-6 text-blue-500 mb-1" />
          <span className="text-sm text-center text-gray-800 font-medium">{text}</span>
        </div>
      </div>
    </section>
  );
} 
