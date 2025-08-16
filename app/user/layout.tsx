import { auth } from '@/auth';
import DashboardInset from '@/components/layout/DashboardInset';
import SidebarLayout from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

// Force dynamic rendering for all user pages
export const dynamic = 'force-dynamic';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/auth/signin');
  }
  return (
    <div className='flex min-h-screen bg-[#0F0F0F] overflow-hidden'>
      <SidebarProvider>
        <SidebarLayout />
        <DashboardInset>{children}</DashboardInset>
      </SidebarProvider>
    </div>
  );
}
