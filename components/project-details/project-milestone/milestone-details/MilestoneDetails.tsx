'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useMarkdown } from '@/hooks/use-markdown';
import { Milestone } from '@/types/milestone';

interface MilestoneDetailsProps {
  milestoneId: string;
  milestone?: Milestone;
}

const MilestoneDetails = ({
  milestoneId,
  milestone,
}: MilestoneDetailsProps) => {
  // Mock milestone data for now - in real app, this would come from API
  const mockMilestone: Milestone = milestone || {
    id: milestoneId,
    title: 'Prototype & Smart Contract Setup',
    description: `## Milestone Details

### Overview
Bitmed is redefining healthcare access and trust through blockchain technology. By leveraging the speed and scalability of Sonic blockchain, Bitmed ensures that health data, patient records, and transactions remain tamper-proof, accessible, and transparent for all stakeholders in the healthcare ecosystem.
### Key Deliverables
- Smart contract development and deployment
- Prototype application development
- Security audit and testing
- Documentation and user guides

### Technical Requirements
- Integration with Sonic blockchain
- Secure data handling for health information
- Scalable architecture for 280M users
- Compliance with healthcare regulations

### Success Criteria
- [ ] Smart contracts deployed and tested
- [ ] Prototype application functional
- [ ] Security audit completed
- [ ] Documentation published
- [ ] Performance benchmarks met`,
    status: 'in_progress',
    startDate: '2024-12-05',
    endDate: '2025-01-31',
    budget: 12300,
    currency: 'USD',
    deliverables: [
      'Smart contract development',
      'Prototype application',
      'Security audit',
      'Documentation',
    ],
    demoVideo: '/demo-video.mp4', // This would be a real video URL
    attachments: [
      {
        name: 'Technical Specification',
        url: '/attachments/tech-spec.pdf',
        type: 'pdf',
      },
      {
        name: 'Architecture Diagram',
        url: '/attachments/architecture.png',
        type: 'image',
      },
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/boundlessfi/milestone-1',
        icon: 'github',
      },
      {
        type: 'documentation',
        url: 'https://docs.boundlessfi.com/milestone-1',
        icon: 'book',
      },
    ],
    projectId: 'project-123',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-15',
  };

  const { loading, error, styledContent } = useMarkdown(
    mockMilestone.description,
    {
      breaks: true,
      gfm: true,
      pedantic: true,
      loadingDelay: 100,
    }
  );

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

      {/* Video Media Showcase */}
      {mockMilestone.demoVideo && (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>Media Showcase</h2>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Milestone Demo
              </h3>
              <Card className='border-gray-800 bg-[#2B2B2B] text-white'>
                <CardContent className='p-6'>
                  <div className='relative flex aspect-video items-center justify-center rounded-lg bg-black'>
                    <video
                      className='h-full w-full rounded-lg object-cover'
                      controls
                    >
                      <source src={mockMilestone.demoVideo} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className='mt-4 text-center text-gray-400'>
                    Milestone demonstration video
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Attachments Section */}
      {mockMilestone.attachments && mockMilestone.attachments.length > 0 && (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>Attachments</h2>
          <div className='space-y-4'>
            {mockMilestone.attachments.map((attachment, index) => (
              <Card
                key={index}
                className='border-gray-800 bg-[#2B2B2B] text-white'
              >
                <CardContent className='p-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700'>
                      <span className='text-sm font-medium'>
                        {attachment.type.toUpperCase()}
                      </span>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-white'>
                        {attachment.name}
                      </h4>
                      <p className='text-sm text-gray-400'>{attachment.type}</p>
                    </div>
                    <a
                      href={attachment.url}
                      className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                    >
                      Download
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Links Section */}
      {mockMilestone.links && mockMilestone.links.length > 0 && (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>Related Links</h2>
          <div className='space-y-3'>
            {mockMilestone.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-3 rounded-lg border border-gray-800 bg-[#2B2B2B] p-4 text-white transition-colors hover:bg-gray-700'
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700'>
                  <span className='text-sm font-medium'>{link.icon}</span>
                </div>
                <div className='flex-1'>
                  <h4 className='font-medium'>{link.type}</h4>
                  <p className='text-sm text-gray-400'>{link.url}</p>
                </div>
                <svg
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Support Message Section */}
      <section>
        <h2 className='mb-4 text-2xl font-bold text-white'>
          Support This Milestone
        </h2>
        <p className='leading-relaxed text-white'>
          By supporting this milestone, you're contributing to the development
          of
          {mockMilestone.title} and helping bring this important work to
          completion. Your support helps ensure timely delivery and quality
          execution.
        </p>
      </section>
    </div>
  );
};

export default MilestoneDetails;
