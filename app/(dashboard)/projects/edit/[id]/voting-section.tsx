'use client';

import { VoteButton } from '@/components/shared/vote-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Users } from 'lucide-react';

interface VotingSectionProps {
  projectId: string;
  initialVoteCount: number;
  initialUserVoted: boolean;
  ideaValidation: 'PENDING' | 'REJECTED' | 'VALIDATED';
}

export function VotingSection({ projectId, initialVoteCount, initialUserVoted, ideaValidation }: VotingSectionProps) {
  // Determine if voting is allowed based on validation status
  const votingEnabled = ideaValidation === 'PENDING';

  // Calculate progress - this is just an example, adjust as needed
  // Assuming 100 votes is the goal for validation
  const votingGoal = 100;
  const progressPercentage = Math.min(Math.round((initialVoteCount / votingGoal) * 100), 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Validation Voting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Validation Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    ideaValidation === 'VALIDATED'
                      ? 'default'
                      : ideaValidation === 'REJECTED'
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {ideaValidation.charAt(0) + ideaValidation.slice(1).toLowerCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {ideaValidation === 'PENDING'
                    ? 'This project is awaiting community validation'
                    : ideaValidation === 'VALIDATED'
                      ? 'This project has been validated by the community'
                      : 'This project was rejected by the community'}
                </span>
              </div>
            </div>

            {/* Voting Progress */}
            {ideaValidation === 'PENDING' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Validation Progress</span>
                  <span>
                    {initialVoteCount} / {votingGoal} votes
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  This project needs {votingGoal - initialVoteCount} more votes to reach the validation threshold
                </p>
              </div>
            )}

            {/* Vote Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Community support helps projects move to the funding stage
                </span>
              </div>

              {votingEnabled ? (
                <VoteButton
                  projectId={projectId}
                  initialVoteCount={initialVoteCount}
                  initialUserVoted={initialUserVoted}
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  Voting is {ideaValidation === 'VALIDATED' ? 'complete' : 'closed'} for this project
                </div>
              )}
            </div>

            {/* Info Box */}
            {ideaValidation !== 'PENDING' && (
              <div className="rounded-lg bg-muted p-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Voting is {ideaValidation === 'VALIDATED' ? 'complete' : 'closed'}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ideaValidation === 'VALIDATED'
                      ? 'This project has been validated and has moved to the funding stage.'
                      : 'This project did not receive enough votes for validation.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Voters */}
      {initialVoteCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Supporters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This would ideally be populated with actual voter data */}
              {Array.from({ length: Math.min(3, initialVoteCount) }).map((_, i) => {
                const placeholderKey = `voter-placeholder-${i}-${projectId}`;
                return (
                  <div key={placeholderKey} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="font-medium">Community Member</div>
                      <div className="text-sm text-muted-foreground">
                        {i === 0 ? 'Just now' : i === 1 ? '2 hours ago' : '1 day ago'}
                      </div>
                    </div>
                    <Badge variant="outline">Supporter</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
