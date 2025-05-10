'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  avatar: string;
  message: string;
  timeAgo: string;
  initials: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    avatar: '/globe.svg',
    message: 'Chigozie supported your project',
    timeAgo: '2 hours ago',
    initials: 'JD',
  },
  {
    id: '2',
    avatar: '/globe.svg',
    message: 'New comment on "DeFi Trading Platform"',
    timeAgo: '5 hours ago',
    initials: 'UC',
  },
  {
    id: '3',
    avatar: '/globe.svg',
    message: 'Your idea reached 50% funding',
    timeAgo: '1 day ago',
    initials: 'YI',
  },
];

export default function RecentActivity() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Recent Activity</h2>
      </CardHeader>
      <CardContent className="grid gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar} alt="Avatar" />
              <AvatarFallback>{activity.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.message}</p>
              <p className="text-sm text-muted-foreground">{activity.timeAgo}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
