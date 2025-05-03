import type { Metadata } from 'next';
import { SettingsLayout } from './settings-layout';

export const metadata: Metadata = {
  title: 'Settings | Boundless',
  description: 'Manage your account settings, security, and notification preferences.',
};

export default function SettingsPage() {
  return <SettingsLayout />;
}
