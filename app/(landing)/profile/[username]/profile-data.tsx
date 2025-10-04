import { getUserProfileByUsername, getMe } from '@/lib/api/auth';
import { GetMeResponse } from '@/lib/api/types';
import { auth } from '@/auth';
import ProfileOverview from '@/components/profile/ProfileOverview';

interface ProfileDataProps {
  username: string;
}

export async function ProfileData({ username }: ProfileDataProps) {
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user?.accessToken) {
    return (
      <section className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Please sign in to view profiles</div>
      </section>
    );
  }

  try {
    const isOwnProfile = session?.user?.username === username;
    let userData: GetMeResponse;

    if (isOwnProfile) {
      userData = await getMe(session.user.accessToken);
    } else {
      userData = await getUserProfileByUsername(
        username,
        session.user.accessToken
      );
    }

    return <ProfileOverview username={username} user={userData} />;
  } catch (error) {
    // Check if it's an authentication error
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 401
    ) {
      return (
        <section className='flex min-h-screen items-center justify-center'>
          <div className='text-red-500'>
            Session expired. Please sign in again.
          </div>
        </section>
      );
    }

    return (
      <section className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Failed to load user profile</div>
      </section>
    );
  }
}
