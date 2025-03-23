import React from 'react';
import Image from 'next/image';

interface ProfileDisplayProps {
  userData: {
    username: string;
    displayName: string;
    bio?: string;
    bannerUrl?: string;
    profilePicUrl?: string;
    totalContributions?: number;
    votes?: number;
    fundedProjects?: number;
  };
  onEdit: () => void;
}

export default function ProfileDisplay({ userData, onEdit }: ProfileDisplayProps) {
  const {
    username,
    displayName,
    bio,
    bannerUrl,
    profilePicUrl,
    totalContributions,
    votes,
    fundedProjects,
  } = userData;

  return (
    <div>

      {bannerUrl && (
        <div className="relative mb-4 w-full h-32">
          <Image
            src={bannerUrl}
            alt="Banner"
            fill
            className="object-cover"
          />
        </div>
      )}

      
      <div className="flex items-center space-x-4">
        <Image
          src={profilePicUrl || '/default-profile-pic.jpg'}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>

      {/* Bio */}
      {bio && <p className="mt-4">{bio}</p>}

      {/* Engagement Stats */}
      <div className="mt-4 flex space-x-4">
        <p>Contributions: {totalContributions || 0}</p>
        <p>Votes: {votes || 0}</p>
        <p>Funded Projects: {fundedProjects || 0}</p>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
}
