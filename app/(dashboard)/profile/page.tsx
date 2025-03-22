'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const profileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  displayName: z.string().min(1, 'Display Name is required'),
  bio: z.string().optional(),
  twitter: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  linkedin: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
})
type ProfileData = z.infer<typeof profileSchema>

type ProfileStats = {
  contributions: number
  votes: number
  fundedProjects: number
}

type UserProfile = {
  username: string
  displayName: string
  bio?: string
  profilePic?: string
  banner?: string
  stats?: ProfileStats
  twitter?: string
  linkedin?: string
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get<UserProfile>('/api/user/profile')
        setProfile(res.data)

        reset({
          username: res.data.username,
          displayName: res.data.displayName,
          bio: res.data.bio,
          twitter: res.data.twitter || '',
          linkedin: res.data.linkedin || '',
        })
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }
    fetchProfile()
  }, [reset])


  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0])
    }
  }

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0])
    }
  }


  const onSubmit = async (data: ProfileData) => {
    try {
      const formData = new FormData()
      formData.append('username', data.username)
      formData.append('displayName', data.displayName)
      formData.append('bio', data.bio || '')
      formData.append('twitter', data.twitter || '')
      formData.append('linkedin', data.linkedin || '')
      if (profilePicFile) formData.append('profilePic', profilePicFile)
      if (bannerFile) formData.append('banner', bannerFile)

      await axios.put('/api/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

    
      const res = await axios.get<UserProfile>('/api/user/profile')
      setProfile(res.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  if (!profile) return <div className="p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      {!isEditing ? (
        // Profile view mode
        <div className="profile-view">
          <div className="relative">
            {profile.banner ? (
              <Image
                src={profile.banner}
                alt="Banner"
                width={1000}
                height={300}
                className="w-full object-cover"
              />
            ) : (
              <div className="bg-gray-300 h-48 w-full" />
            )}
            <div className="absolute -bottom-12 left-4">
              {profile.profilePic ? (
                <Image
                  src={profile.profilePic}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white"
                />
              ) : (
                <div className="bg-gray-500 rounded-full h-24 w-24 border-4 border-white" />
              )}
            </div>
          </div>
          <div className="mt-16 pl-4">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p className="text-gray-600">{profile.bio}</p>
            <div className="flex space-x-4 mt-4">
              <div>
                <strong>{profile.stats?.contributions || 0}</strong>
                <p>Contributions</p>
              </div>
              <div>
                <strong>{profile.stats?.votes || 0}</strong>
                <p>Votes</p>
              </div>
              <div>
                <strong>{profile.stats?.fundedProjects || 0}</strong>
                <p>Funded Projects</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        // Profile edit mode
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              {...register('username')}
              className="border p-2 w-full"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Display Name</label>
            <input
              type="text"
              {...register('displayName')}
              className="border p-2 w-full"
            />
            {errors.displayName && (
              <p className="text-red-600 text-sm">{errors.displayName.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Bio</label>
            <textarea {...register('bio')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Twitter</label>
            <input
              type="text"
              {...register('twitter')}
              className="border p-2 w-full"
            />
            {errors.twitter && (
              <p className="text-red-600 text-sm">{errors.twitter.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">LinkedIn</label>
            <input
              type="text"
              {...register('linkedin')}
              className="border p-2 w-full"
            />
            {errors.linkedin && (
              <p className="text-red-600 text-sm">{errors.linkedin.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProfilePage
