import { getUserProfileByUsername, getMe } from '@/lib/api/auth';
import { GetMeResponse } from '@/lib/api/types';
import { auth } from '@/auth';
import ProfileOverview from '@/components/profile/ProfileOverview';

interface ProfileDataProps {
  username: string;
}

export async function ProfileData({ username }: ProfileDataProps) {
  try {
    const session = await auth();
    const isOwnProfile = session?.user?.username === username;
    let userData: GetMeResponse;

    if (isOwnProfile && session?.user?.accessToken) {
      userData = await getMe(session.user.accessToken);
    } else {
      userData = await getUserProfileByUsername(
        username,
        session?.user?.accessToken
      );
    }

    return <ProfileOverview username={username} user={userData} />;
  } catch {
    return (
      <section className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Failed to load user profile</div>
      </section>
    );
  }
}
