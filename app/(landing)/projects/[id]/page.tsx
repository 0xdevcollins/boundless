import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectLayout } from '@/components/project-details/project-layout';
import { Footer } from '@/components/landing-page';
import Link from 'next/link';

// Mock data
const mockProjectData = {
  id: 'bitmed',
  name: 'Bitmed',
  description:
    'To build a secure, transparent, and trusted digital health ecosystem powered by Sonic blockchain for 280M lives in Indonesia.',
  logo: '/icon.png',
  category: 'Category',
  validation: 'Validation',
  date: '03 Sep, 2025',
  votes: 28,
  totalVotes: 100,
  daysToDeadline: 43,
  creator: {
    name: "Creator's Name",
    role: 'OWNER',
    avatar: '/user.png',
  },
  links: [
    { type: 'github', url: 'github.com/example/Bitmed', icon: 'github' },
    { type: 'twitter', url: '@bitmed_17', icon: 'twitter' },
    { type: 'website', url: 'bitmed-omega.vercel.app', icon: 'globe' },
    { type: 'youtube', url: 'youtube.com/watch?v=UHJUujd30', icon: 'youtube' },
  ],
  details: {
    introduction:
      'Bitmed is redefining healthcare access and trust through blockchain technology. By leveraging the speed and scalability of Sonic blockchain, Bitmed ensures that health data, patient records, and transactions remain tamper-proof, accessible, and transparent for all stakeholders in the healthcare ecosystem.',
    challenges: [
      'Limited access to trusted health records.',
      'Growing population with rising demand for digital health services.',
      'Lack of transparency in healthcare transactions.',
    ],
    solutions: [
      'A blockchain-secured health record system.',
      'Decentralized access for patients, providers, and regulators.',
      'Seamless integration of digital payments and telemedicine.',
    ],
    features: [
      {
        title: 'Secure Health Data',
        items: [
          'Immutable patient records.',
          'Permissioned access for authorized providers only.',
        ],
      },
      {
        title: 'Transparent Transactions',
        items: [
          'Every health service and payment recorded on-chain.',
          'Fraud prevention and audit-ready histories.',
        ],
      },
      {
        title: 'Scalable Ecosystem',
        items: [
          'Designed to serve over 280M citizens.',
          'Flexible architecture that grows with demand.',
        ],
      },
    ],
    goals: [
      {
        phase: 'Phase 1',
        description: 'Build MVP and launch with pilot hospitals.',
      },
      {
        phase: 'Phase 2',
        description: 'Onboard healthcare providers across Indonesia.',
      },
      {
        phase: 'Phase 3',
        description:
          'Expand into Southeast Asia and integrate insurance providers.',
      },
    ],
    media: [
      {
        type: 'image',
        title: 'Patient Record Overview',
        url: '/preview_img.png',
      },
      {
        type: 'image',
        title: 'Patient Profile Page',
        url: '/preview_img.png',
      },
      {
        type: 'video',
        title: 'How Bitmed Works in 2 Minutes',
        url: '/videos/bitmed-demo.mp4',
        thumbnail: '/video-thumbnail.jpg',
      },
    ],
    quote: {
      text: 'Our mission is not just to digitize healthcare but to make it trusted, transparent, and accessible for every individual in Indonesia.',
      author: 'Bitmed Team',
    },
    links: [
      { text: 'Visit Website', url: 'https://bitmed-omega.vercel.app' },
      { text: 'Read Whitepaper', url: 'https://bitmed.com/whitepaper' },
      {
        text: 'Watch Demo Video',
        url: 'https://youtube.com/watch?v=UHJUujd30',
      },
    ],
    supportMessage:
      "By backing this project, you're contributing to a healthier, more transparent future for 280M lives in Indonesia.",
  },
};
interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectUrl = `/projects/${id}`;

  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden bg-[#030303]'>
      <header className='sticky top-0 z-50 border-b border-gray-800 bg-[#030303]'>
        <div className='w-full px-4 sm:px-6'>
          <div className='mx-auto flex max-w-[1400px] items-center justify-between py-3'>
            {/* Back button */}
            <Link href='/projects' passHref>
              <Button
                variant='outline'
                className='h-9 gap-2 border border-gray-700 bg-transparent px-3 text-white transition-colors hover:border-gray-600'
              >
                <ArrowLeft className='h-4 w-4' />
                <span className='hidden sm:inline'>Back</span>
              </Button>
            </Link>

            {/* Open in new tab button */}
            <Link href={projectUrl} passHref target='_blank'>
              <Button
                variant='outline'
                className='h-9 gap-2 border border-gray-700 bg-transparent px-3 text-white transition-colors hover:border-gray-600'
              >
                <span className='hidden sm:inline'>Open</span>
                <ExternalLink className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className='flex-1'>
        <ProjectLayout project={mockProjectData} />
      </div>

      <Footer />
    </div>
  );
}
