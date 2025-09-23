type AddToWaitlistRequest = {
  email: string;
  firstName: string;
  lastName: string;
  source?: string;
  referrer?: string;
  tags?: string[];
};

type NewsletterSubscribeRequest = {
  email: string;
  name: string;
};

export const addToWaitlist = async (data: AddToWaitlistRequest) => {
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

export const newsletterSubscribe = async (data: NewsletterSubscribeRequest) => {
  const res = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to subscribe to newsletter');
  }

  return res.json();
};
