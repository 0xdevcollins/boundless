import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | Boundless',
  description: 'View and manage your profile on Boundless',
};

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex-1 px-6 py-5 md:px-10 md:py-20 xl:px-[100px]'>
      {children}
    </div>
  );
}
