import { ReactNode, Suspense } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
  params: Promise<{
    username: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main className='flex-1 px-6 py-5 md:px-10 md:py-20 xl:px-[100px]'>
      <Suspense fallback={<ProfileLoadingFallback />}>{children}</Suspense>
    </main>
  );
}

function ProfileLoadingFallback() {
  return (
    <section className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
        <div className='text-white'>Loading profile...</div>
      </div>
    </section>
  );
}
