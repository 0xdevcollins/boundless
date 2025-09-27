'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AuthProvider } from '@/components/providers/auth-provider';
import { NotificationProvider } from 'react-notification-core';
import {
  mockFetchNotifications,
  mockMarkAsRead,
  mockMarkAllAsRead,
  mockDeleteNotification,
} from '@/lib/mock';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <NotificationProvider
          fetchNotifications={mockFetchNotifications}
          onMarkAsRead={mockMarkAsRead}
          onMarkAllAsRead={mockMarkAllAsRead}
          onDeleteNotification={mockDeleteNotification}
          fetchOptions={{
            retryCount: 2,
            retryDelay: 1000,
            timeout: 5000,
          }}
        >
          {children}
        </NotificationProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
