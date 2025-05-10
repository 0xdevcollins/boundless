/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CreditCard, DollarSign, Users } from 'lucide-react';
import { useState } from 'react';

type ViewerFundingHorizontalProps = {
  projectId: string;
  fundingGoal: number;
};

export function ViewerFundingHorizontal({ projectId, fundingGoal }: ViewerFundingHorizontalProps) {
  // In a real app, you would fetch this data from an API
  const [fundingData, setFundingData] = useState({
    raised: Math.floor(fundingGoal * 0.65), // Example: 65% funded
    backers: 48,
    daysLeft: 14,
  });

  const percentFunded = (fundingData.raised / fundingGoal) * 100;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Funding Progress */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">${fundingData.raised.toLocaleString()}</span>
              <span className="text-muted-foreground">of ${fundingGoal.toLocaleString()} goal</span>
            </div>
            <Progress value={percentFunded} className="h-2" />
            <div className="text-sm text-muted-foreground">
              {Math.round(percentFunded)}% funded with {fundingData.daysLeft} days to go
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between md:justify-around">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xl font-medium">{fundingData.backers}</div>
              <div className="text-xs text-muted-foreground">Backers</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-1">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xl font-medium">{fundingData.daysLeft}</div>
              <div className="text-xs text-muted-foreground">Days Left</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button className="w-full md:w-auto">
              <DollarSign className="mr-2 h-4 w-4" /> Back This Project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
