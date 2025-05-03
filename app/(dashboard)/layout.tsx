import ConnectWalletButton from '@/components/connect-wallet';
import { MobileSidebar } from '@/components/mobile-sidebar';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { Sidebar } from '@/components/sidebar';
import type React from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'User dashboard layout',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col md:pl-[280px]">
        {/* Mobile Header with Menu */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <MobileSidebar />
          </div>
          <div className="flex items-center gap-2">
            <ConnectWalletButton />
            <NotificationDropdown />
          </div>
        </header>

        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
