'use client';

import { LoaderIcon } from '@/components/settings/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangeEvent, type FormEvent, useState } from 'react';

const toast = (props: { title: string; description: string }) => {
  console.log(`Toast: ${props.title} - ${props.description}`);
  alert(`${props.title}: ${props.description}`);
};

interface FormData {
  username: string;
  displayName: string;
  email: string;
}

interface FormErrors {
  username?: string;
  displayName?: string;
  email?: string;
}

export function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    displayName: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    } else if (formData.username.length > 30) {
      newErrors.username = 'Username must not be longer than 30 characters.';
    }

    if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters.';
    } else if (formData.displayName.length > 50) {
      newErrors.displayName = 'Display name must not be longer than 50 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Account updated',
        description: 'Your account information has been updated successfully.',
      });
      console.log(formData);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your account information and how others see you on the platform.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-sm font-medium text-red-500">{errors.username}</p>}
            <p className="text-sm text-gray-500">
              This is your public username. It can only contain letters, numbers, and underscores.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
            />
            {errors.displayName && <p className="text-sm font-medium text-red-500">{errors.displayName}</p>}
            <p className="text-sm text-gray-500">This is your public display name. It can contain any characters.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-sm font-medium text-red-500">{errors.email}</p>}
            <p className="text-sm text-gray-500">This email will be used for account-related notifications.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
