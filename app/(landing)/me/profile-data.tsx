import { getMe } from '@/lib/api/auth';
import { auth } from '@/auth';
import ProfileDataClient from '@/components/profile/ProfileDataClient';

export async function ProfileData() {
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user?.accessToken) {
    return (
      <section className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>Please sign in to view your profile</div>
      </section>
    );
  }

  try {
    const userData = await getMe(session.user.accessToken);
    // console.log(userData);
    return (
      <ProfileDataClient
        user={userData}
        username={session.user.username || 'me'}
      />
    );
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
        <div className='text-red-500'>Failed to load your profile</div>
      </section>
    );
  }
}
