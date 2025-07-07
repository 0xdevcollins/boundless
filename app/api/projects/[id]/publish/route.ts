import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const API_BASE_URL = 'http://api.boundlessfi.xyz';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const projectId = id;

    // Cast session to access the accessToken property
    const userSession = session as any;

    // Call the external API to publish the campaign
    const response = await fetch(`${API_BASE_URL}/campaigns/${projectId}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userSession.user.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to publish campaign' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      project: data,
      message: 'Campaign published successfully',
    });
  } catch (error) {
    console.error('Error publishing project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
