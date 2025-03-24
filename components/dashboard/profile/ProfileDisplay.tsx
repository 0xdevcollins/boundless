'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Linkedin, 
  Edit2, 
  Award, 
  ThumbsUp, 
  Briefcase,
  Loader2
} from 'lucide-react';
// import { cn } from "@/lib/utils";

interface ProfileDisplayProps {
  userData: {
    username: string;
    name: string;
    bio?: string;
    bannerImage?: string;
    image?: string;
    twitter?: string;
    linkedin?: string;
    totalContributions?: number;
    votes?: number;
    fundedProjects?: number;
  };
  onEdit: () => void;
  isLoading?: boolean;
}

export default function ProfileDisplay({ 
  userData, 
  onEdit,
  isLoading = false 
}: ProfileDisplayProps) {
  const {
    username,
    name,
    bio,
    bannerImage,
    image,
    twitter,
    linkedin,
    totalContributions = 0,
    votes = 0,
    fundedProjects = 0,
  } = userData;

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full bg-card">
      {/* Banner Image */}
      <div className="relative w-full h-40 bg-gradient-to-r from-primary/20 to-primary/30">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Profile banner"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <CardContent className="relative pt-16 px-6">
        {/* Profile Picture */}
        <div className="absolute -top-12 left-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background bg-muted">
            <Image
              src={image || '/default-profile-pic.jpg'}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-6">
          <Button 
            onClick={onEdit} 
            variant="outline" 
            size="sm"
            className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className="text-muted-foreground">@{username}</p>
          </div>

          {bio && (
            <p className="text-foreground/80 max-w-2xl">{bio}</p>
          )}

          {/* Social Links */}
          <div className="flex space-x-4">
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-muted/50">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Contributions</p>
                <p className="font-semibold text-foreground">{totalContributions}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-muted/50">
              <ThumbsUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Votes</p>
                <p className="font-semibold text-foreground">{votes}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-muted/50">
              <Briefcase className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Funded Projects</p>
                <p className="font-semibold text-foreground">{fundedProjects}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
