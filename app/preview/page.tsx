'use client';
import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types/project';

// Mock project data for preview
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Bitmed',
    description:
      'To build a secure, transparent, and trusted digital health ecosystem powered by blockchain technology, enabling seamless data sharing and patient care coordination.',
    image: '/placeholder-image.jpg',
    link: '#',
    tags: ['healthcare', 'blockchain', 'digital-health'],
    category: 'Category',
    type: 'healthcare',
    amount: 50000,
    status: 'under_review',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    owner: 'user123',
    ownerName: 'Creator Name',
    ownerUsername: 'creator',
    ownerAvatar: '/placeholder-avatar.jpg',
  },
  {
    id: '2',
    name: 'DeFi Protocol',
    description:
      'A decentralized finance protocol that enables automated yield farming and liquidity provision across multiple blockchain networks.',
    image: '/placeholder-image.jpg',
    link: '#',
    tags: ['defi', 'yield-farming', 'liquidity'],
    category: 'DeFi',
    type: 'defi',
    amount: 75000,
    status: 'funding',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    owner: 'user456',
    ownerName: 'Another Creator',
    ownerUsername: 'creator2',
    ownerAvatar: '/placeholder-avatar.jpg',
  },
  {
    id: '3',
    name: 'NFT Marketplace',
    description:
      'A next-generation NFT marketplace with advanced features like batch minting, lazy minting, and cross-chain compatibility.',
    image: '/placeholder-image.jpg',
    link: '#',
    tags: ['nft', 'marketplace', 'cross-chain'],
    category: 'NFT',
    type: 'nft',
    amount: 100000,
    status: 'approved',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    owner: 'user789',
    ownerName: 'Third Creator',
    ownerUsername: 'creator3',
    ownerAvatar: '/placeholder-avatar.jpg',
  },
];

export default function PreviewPage() {
  const handleValidationClick = (projectId: string) => {
    alert(`Validation clicked for project: ${projectId}`);
  };

  const handleVoteClick = (projectId: string) => {
    alert(`Vote clicked for project: ${projectId}`);
  };

  return (
    <div className='min-h-screen bg-gray-900 px-4 py-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-white'>
            Project Card Component Preview
          </h1>
          <p className='text-lg text-gray-400'>
            Responsive design with GSAP animations
          </p>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:block'>
          <h2 className='mb-8 text-2xl font-semibold text-gray-300'>
            Desktop Layout (3 columns)
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {mockProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                creatorName={project.ownerName}
                creatorAvatar={project.ownerAvatar}
                daysLeft={23 - index * 5}
                votes={{
                  current: 46 + index * 15,
                  total: 100,
                }}
                onValidationClick={() => handleValidationClick(project.id)}
                onVoteClick={() => handleVoteClick(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Tablet Layout */}
        <div className='hidden md:block lg:hidden'>
          <h2 className='mb-8 text-2xl font-semibold text-gray-300'>
            Tablet Layout (2 columns)
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {mockProjects.slice(0, 2).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                creatorName={project.ownerName}
                creatorAvatar={project.ownerAvatar}
                daysLeft={23 - index * 5}
                votes={{
                  current: 46 + index * 15,
                  total: 100,
                }}
                onValidationClick={() => handleValidationClick(project.id)}
                onVoteClick={() => handleVoteClick(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='block md:hidden'>
          <h2 className='mb-8 text-2xl font-semibold text-gray-300'>
            Mobile Layout (1 column)
          </h2>
          <div className='space-y-6'>
            {mockProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                creatorName={project.ownerName}
                creatorAvatar={project.ownerAvatar}
                daysLeft={23 - index * 5}
                votes={{
                  current: 46 + index * 15,
                  total: 100,
                }}
                onValidationClick={() => handleValidationClick(project.id)}
                onVoteClick={() => handleVoteClick(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Responsive Grid Test */}
        <div className='mt-16'>
          <h2 className='mb-8 text-2xl font-semibold text-gray-300'>
            Responsive Grid Test
          </h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }, (_, i) => {
              const project = mockProjects[i % mockProjects.length];
              return (
                <ProjectCard
                  key={`test-${i}`}
                  project={{
                    ...project,
                    id: `test-${i}`,
                    name: `Project ${i + 1}`,
                    description: `This is a test project description for project ${i + 1}. It demonstrates the responsive behavior and animations of the component across different screen sizes.`,
                  }}
                  creatorName={`Creator ${i + 1}`}
                  creatorAvatar='/placeholder-avatar.jpg'
                  daysLeft={Math.floor(Math.random() * 30) + 1}
                  votes={{
                    current: Math.floor(Math.random() * 100),
                    total: 100,
                  }}
                  onValidationClick={() => handleValidationClick(`test-${i}`)}
                  onVoteClick={() => handleVoteClick(`test-${i}`)}
                />
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className='mt-16 rounded-lg bg-gray-800 p-6'>
          <h3 className='mb-4 text-xl font-semibold text-white'>
            Preview Instructions
          </h3>
          <ul className='space-y-2 text-gray-300'>
            <li>
              • <strong>Hover</strong> over cards to see GSAP hover animations
            </li>
            <li>
              • <strong>Scroll</strong> to see entrance animations with scroll
              triggers
            </li>
            <li>
              • <strong>Resize</strong> your browser to test responsive behavior
            </li>
            <li>
              • <strong>Click</strong> buttons to see interaction feedback
            </li>
            <li>
              • <strong>Mobile</strong>: Use browser dev tools to test mobile
              layout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
