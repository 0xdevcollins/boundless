'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useMarkdown } from '@/hooks/use-markdown';

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    description: string;
    logo: string;
    category: string;
    validation: string;
    date: string;
    votes: number;
    totalVotes: number;
    daysToDeadline: number;
    creator: {
      name: string;
      role: string;
      avatar: string;
    };
    links: Array<{
      type: string;
      url: string;
      icon: string;
    }>;
    details?: {
      introduction?: string;
      challenges?: string[];
      solutions?: string[];
      features?: {
        title: string;
        items: string[];
      }[];
      goals?: {
        phase: string;
        description: string;
      }[];
      media?: {
        type: 'image' | 'video';
        title: string;
        url: string;
        thumbnail?: string;
      }[];
      quote?: {
        text: string;
        author: string;
      };
      links?: {
        text: string;
        url: string;
      }[];
      supportMessage?: string;
    };
  };
}

// Generate markdown content from project data
const getProjectMarkdownContent = (project: ProjectDetailsProps['project']) => {
  const details = project.details || {};

  return `# Introduction

${details.introduction || 'Bitmed is redefining healthcare access and trust through blockchain technology. By leveraging the speed and scalability of Sonic blockchain, Bitmed ensures that health data, patient records, and transactions remain tamper-proof, accessible, and transparent for all stakeholders in the healthcare ecosystem.'}

## Why ${project.name} Matters

### Key Challenges in Indonesia's Healthcare:

${
  details.challenges
    ? details.challenges.map(challenge => `- ${challenge}`).join('\n')
    : `- Limited access to trusted health records.
- Growing population with rising demand for digital health services.
- Lack of transparency in healthcare transactions.`
}

### ${project.name}'s Solution:

${
  details.solutions
    ? details.solutions.map(solution => `- ${solution}`).join('\n')
    : `- A blockchain-secured health record system.
- Decentralized access for patients, providers, and regulators.
- Seamless integration of digital payments and telemedicine.`
}

## Features

${
  details.features
    ? details.features
        .map(
          feature => `### ${feature.title}

${feature.items.map(item => `- ${item}`).join('\n')}`
        )
        .join('\n\n')
    : `### Secure Health Data

- Immutable patient records.
- Permissioned access for authorized providers only.

### Transparent Transactions

- Every health service and payment recorded on-chain.
- Fraud prevention and audit-ready histories.

### Scalable Ecosystem

- Designed to serve over 280M citizens.
- Flexible architecture that grows with demand.`
}

## Project Goals

${
  details.goals
    ? details.goals
        .map(
          (goal, index) =>
            `${index + 1}. **${goal.phase}** - ${goal.description}`
        )
        .join('\n')
    : `1. **Phase 1** - Build MVP and launch with pilot hospitals.
2. **Phase 2** - Onboard healthcare providers across Indonesia.
3. **Phase 3** - Expand into Southeast Asia and integrate insurance providers.`
}

## Media Showcase

${
  details.media
    ? details.media
        .filter(media => media.type === 'image')
        .map(
          media => `### ${media.title}

![${media.title}](${media.url})`
        )
        .join('\n\n')
    : `### Patient Record Overview

![Patient Record Overview](/medical-dashboard-patient-records-interface.jpg)

### Patient Profile Page

![Patient Profile Page](/medical-patient-profile-interface.jpg)`
}

${
  details.quote
    ? `## Community Impact

> "${details.quote.text}"
> 
> — ${details.quote.author}`
    : `## Community Impact

> "Our mission is not just to digitize healthcare but to make it trusted, transparent, and accessible for every individual in Indonesia."
> 
> — Bitmed Team`
}

## Learn More

${
  details.links
    ? details.links.map(link => `- [${link.text}](${link.url})`).join('\n')
    : `- [Visit Website](https://bitmed-omega.vercel.app)
- [Read Whitepaper](https://bitmed.com/whitepaper)
- [Watch Demo Video](https://youtube.com/watch?v=UHJUujd30)`
}

## Support ${project.name} Today

${details.supportMessage || "By backing this project, you're contributing to a healthier, more transparent future for 280M lives in Indonesia."}`;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const details = project.details || {};
  const markdownContent = getProjectMarkdownContent(project);

  const { loading, error, styledContent } = useMarkdown(markdownContent, {
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
      {details.media && details.media.some(media => media.type === 'video') && (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>Media Showcase</h2>
          <div className='space-y-6'>
            {details.media
              .filter(media => media.type === 'video')
              .map((media, index) => (
                <div key={index}>
                  <h3 className='mb-3 text-lg font-semibold text-white'>
                    {media.title}
                  </h3>
                  <Card className='border-gray-800 bg-[#2B2B2B] text-white'>
                    <CardContent className='p-6'>
                      <div className='relative flex aspect-video items-center justify-center rounded-lg bg-black'>
                        <video
                          className='h-full w-full rounded-lg object-cover'
                          poster={media.thumbnail}
                          controls
                        >
                          <source src={media.url} type='video/mp4' />
                          Your browser does not support the video tag.
                        </video>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700'>
                            <span className='text-2xl text-white'>▶</span>
                          </div>
                        </div>
                      </div>
                      <p className='mt-4 text-center text-gray-400'>
                        Click to play video
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Support Message Section - placed at the end like original */}
      {details.supportMessage && (
        <section>
          <h2 className='mb-4 text-2xl font-bold text-white'>
            Support {project.name} Today
          </h2>
          <p className='leading-relaxed text-white'>{details.supportMessage}</p>
        </section>
      )}
    </div>
  );
}
