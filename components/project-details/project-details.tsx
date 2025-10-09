'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useMarkdown } from '@/hooks/use-markdown';
import { CrowdfundingProject } from '@/lib/api/types';

interface ProjectDetailsProps {
  project: CrowdfundingProject & {
    // Additional fields that might be added during transformation
    daysToDeadline?: number;
    additionalCreator?: {
      name: string;
      role: string;
      avatar: string;
    };
    links?: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
  };
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { loading, error, styledContent } = useMarkdown(project.description, {
    breaks: true,
    gfm: true,
    pedantic: true,
    loadingDelay: 100,
  });

  return (
    <div className='space-y-8 text-white'>
      {/* Markdown Content */}
      <div className='prose prose-invert max-w-none'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-[#B5B5B5]'>Loading content...</div>
          </div>
        ) : error ? (
          <div className='mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4 text-red-400'>
            <p className='font-medium'>Error loading content:</p>
            <p className='mt-1 text-sm'>{error}</p>
          </div>
        ) : (
          styledContent
        )}
      </div>

      {/* Video Media Showcase - placed after markdown content like original */}
      {project.demoVideo && (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>Media Showcase</h2>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Project Demo
              </h3>
              <Card className='border-gray-800 bg-[#2B2B2B] text-white'>
                <CardContent className='p-6'>
                  <div className='relative flex aspect-video items-center justify-center rounded-lg bg-black'>
                    <video
                      className='h-full w-full rounded-lg object-cover'
                      controls
                    >
                      <source src={project.demoVideo} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className='mt-4 text-center text-gray-400'>
                    Project demonstration video
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Support Message Section - placed at the end like original */}
      <section>
        <h2 className='mb-4 text-2xl font-bold text-white'>
          Support {project.title} Today
        </h2>
        <p className='leading-relaxed text-white'>
          By backing {project.title}, you're contributing to innovative
          solutions in the {project.category} space and helping bring this
          vision to life.
        </p>
      </section>
    </div>
  );
}
