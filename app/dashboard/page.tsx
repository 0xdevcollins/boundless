'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Mail, Shield, Rocket } from 'lucide-react';
import LaunchCampaignFlow from '@/components/project/LaunchCampaignFlow';
import BoundlessSheet from '@/components/sheet/boundless-sheet';

export default function DashboardPage() {
  const router = useRouter();
  const [showLaunchFlow, setShowLaunchFlow] = useState(false);

  // Mock user data
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://github.com/shadcn.png',
    id: 'mock-user-id',
    role: 'USER',
  };

  const handleSignOut = async () => {
    // Mock sign out
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          <div className='flex space-x-4'>
            <Button
              onClick={() => setShowLaunchFlow(true)}
              className='bg-green-600 hover:bg-green-700'
            >
              <Rocket className='mr-2 h-4 w-4' />
              Test Launch Campaign
            </Button>
            <Button onClick={handleSignOut} variant='outline'>
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </Button>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <User className='mr-2 h-5 w-5' />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={mockUser.image || ''} />
                  <AvatarFallback>
                    {mockUser.name?.charAt(0) || mockUser.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{mockUser.name || 'No name'}</p>
                  <p className='text-sm text-gray-500'>{mockUser.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Mail className='mr-2 h-5 w-5' />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-500'>User ID:</span>
                <span className='text-sm font-mono'>{mockUser.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-gray-500'>Email:</span>
                <span className='text-sm'>{mockUser.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Shield className='mr-2 h-5 w-5' />
                Role & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-500'>Role:</span>
                  <span className='text-sm font-medium capitalize'>
                    {mockUser.role}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-500'>Status:</span>
                  <span className='text-sm text-green-600'>Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='mt-8'>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Boundless Project</CardTitle>
              <CardDescription>
                Your platform for crowdfunding and grants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>
                This is your dashboard where you can manage your projects, view
                contributions, and access all the features of the platform. The
                authentication system is now working properly!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Launch Campaign Flow Modal */}
      <BoundlessSheet
        open={showLaunchFlow}
        setOpen={setShowLaunchFlow}
        contentClassName='h-full'
      >
        <LaunchCampaignFlow
          projectId='test-project-123'
          onBack={() => setShowLaunchFlow(false)}
          onComplete={() => setShowLaunchFlow(false)}
        />
      </BoundlessSheet>
    </div>
  );
}
