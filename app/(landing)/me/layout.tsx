import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | Boundless',
  description: 'View and manage your profile on Boundless',
};

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto min-h-screen max-w-[1440px] flex-1 px-5 py-5 md:px-[50px] lg:px-[100px]'>
      {children}
    </div>
  );
}
