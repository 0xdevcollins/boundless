type AddToWaitlistRequest = {
  email: string;
  firstName: string;
  lastName: string;
  source?: string;
  referrer?: string;
  tags?: string[];
};

export const addToWaitlist = async (data: AddToWaitlistRequest) => {
  // Use the local Next.js API route instead of external backend
  const res = await fetch('/api/waitlist/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to subscribe to waitlist');
  }

  return res.json();
};
