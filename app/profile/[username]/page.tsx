'use client';
import { useEffect, useState } from 'react';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setUsername(resolvedParams.username);
      setIsLoading(false);
    };
    getParams();
  }, [params]);

  if (isLoading) {
    return (
      <section className='flex min-h-screen items-center justify-center bg-[#0F0F0F]'>
        <div className='text-white'>Loading...</div>
      </section>
    );
  }

  return (
    <section className='min-h-screen bg-[#0F0F0F]'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold text-white'>Profile: {username}</h1>
      </div>
    </section>
  );
}
