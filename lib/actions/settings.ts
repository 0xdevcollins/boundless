type UserSettings = {
  theme?: string;
  language?: string;
  notificationsEnabled?: boolean;
};

export async function getUserSettings(): Promise<UserSettings> {
  const res = await fetch('/api/user/settings');

  if (!res.ok) {
    throw new Error('Failed to fetch settings');
  }

  return res.json();
}

export async function updateUserSettings(data: UserSettings): Promise<UserSettings> {
  const res = await fetch('/api/user/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update settings');
  }

  return res.json();
}
