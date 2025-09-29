import { ProfileData } from './profile-data';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  return (
    <section className='min-h-[70vh]'>
      <ProfileData username={username} />
    </section>
  );
}
