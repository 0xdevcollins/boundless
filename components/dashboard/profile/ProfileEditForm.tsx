'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { UserProfile } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  image: z.string().optional(),
  bannerImage: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  initialData: UserProfile;
  onSuccess: (data: UserProfile) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ initialData, onSuccess, onCancel }: ProfileEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name,
      bio: initialData.bio,
      twitter: initialData.twitter,
      linkedin: initialData.linkedin,
      image: initialData.image,
      bannerImage: initialData.bannerImage,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.put('/api/user/profile', data);
      onSuccess(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

					<div className="grid gap-6 max-w-2xl">
						<div className="space-y-4">
							<div>
								<Label>Banner Image</Label>
								<ImageUpload
									value={initialData.bannerImage || ""}
									onChange={(url) => form.setValue("bannerImage", url)}
									onRemove={() => form.setValue("bannerImage", "")}
								/>
							</div>

							<div>
								<Label>Profile Picture</Label>
								<ImageUpload
									value={initialData.image || ""}
									onChange={(url) => form.setValue("image", url)}
									onRemove={() => form.setValue("image", "")}
								/>
							</div>
						</div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" {...form.register('name')} className="bg-background max-w-md" />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" {...form.register('bio')} rows={4} className="bg-background resize-none" />
                {form.formState.errors.bio && (
                  <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  {...form.register('twitter')}
                  placeholder="https://twitter.com/yourusername"
                  className="bg-background max-w-md"
                />
                {form.formState.errors.twitter && (
                  <p className="text-sm text-destructive">{form.formState.errors.twitter.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  {...form.register('linkedin')}
                  placeholder="https://linkedin.com/in/yourusername"
                  className="bg-background max-w-md"
                />
                {form.formState.errors.linkedin && (
                  <p className="text-sm text-destructive">{form.formState.errors.linkedin.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="bg-background"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
