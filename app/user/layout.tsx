import DashboardInset from '@/components/layout/DashboardInset';
import SidebarLayout from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// Force dynamic rendering for all user pages
export const dynamic = 'force-dynamic';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen overflow-hidden bg-[#0F0F0F]'>
      <SidebarProvider>
        <SidebarLayout />
        <DashboardInset>{children}</DashboardInset>
      </SidebarProvider>
    </div>
  );
}
