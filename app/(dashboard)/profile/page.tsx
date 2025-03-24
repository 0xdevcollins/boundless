
'use client'; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDisplay from '@/components/dashboard/profile/ProfileDisplay';
import ProfileEditForm from '@/components/dashboard/profile/ProfileEditForm';

export default function ProfilePage() {
  const [userData, setUserData] = useState<{
    username: string;
    displayName: string;
    bio?: string;
    twitter?: string;
    linkedIn?: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get('/api/user/profile');
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {isEditing ? (
        <ProfileEditForm
          initialData={userData}
          onSuccess={(updatedData) => {
            setUserData(updatedData);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileDisplay
          userData={userData}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
