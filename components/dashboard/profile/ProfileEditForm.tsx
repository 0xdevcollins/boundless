'use client';

import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  username: z.string().nonempty('Username is required'),
  displayName: z.string().nonempty('Display name is required'),
  bio: z.string().optional(),
  // You can also handle social links, e.g.:
  twitter: z.string().url('Invalid URL').optional(),
  linkedIn: z.string().url('Invalid URL').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  initialData: ProfileFormData;
  onSuccess: (updatedData: ProfileFormData) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({
  initialData,
  onSuccess,
  onCancel
}: ProfileEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData.username,
      displayName: initialData.displayName,
      bio: initialData.bio,
      twitter: initialData.twitter,
      linkedIn: initialData.linkedIn
    }
  });

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const response = await axios.put('/api/user/profile', formData);
      onSuccess(response.data); // pass updated data back to parent
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally show an error toast or message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username */}
      <div>
        <label className="block font-semibold">Username</label>
        <input
          type="text"
          {...register('username')}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Display Name */}
      <div>
        <label className="block font-semibold">Display Name</label>
        <input
          type="text"
          {...register('displayName')}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm">{errors.displayName.message}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className="block font-semibold">Bio</label>
        <textarea
          {...register('bio')}
          className="border border-gray-300 p-2 rounded w-full"
          rows={3}
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
      </div>

      {/* Twitter */}
      <div>
        <label className="block font-semibold">Twitter</label>
        <input
          type="text"
          {...register('twitter')}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {errors.twitter && (
          <p className="text-red-500 text-sm">{errors.twitter.message}</p>
        )}
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-semibold">LinkedIn</label>
        <input
          type="text"
          {...register('linkedIn')}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {errors.linkedIn && (
          <p className="text-red-500 text-sm">{errors.linkedIn.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
