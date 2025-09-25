import { Github, Globe, Youtube, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProjectAboutProps {
  project: {
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
  };
}

/**
 * Project About component for mobile view
 * Contains creator info and project links
 */
export function ProjectAbout({ project }: ProjectAboutProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'github':
        return <Github className='h-4 w-4' />;
      case 'twitter':
        return <X className='h-4 w-4' />;
      case 'globe':
        return <Globe className='h-4 w-4' />;
      case 'youtube':
        return <Youtube className='h-4 w-4' />;
      default:
        return <Globe className='h-4 w-4' />;
    }
  };

  return (
    <div className='space-y-6 text-white'>
      {/* Creator Info */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-white'>Creator</h2>
        <div className='flex items-center gap-3'>
          <Avatar className='h-12 w-12'>
            <AvatarImage
              src={project.creator.avatar || '/placeholder.svg'}
              alt={project.creator.name}
            />
            <AvatarFallback className='bg-blue-600 text-sm font-medium text-white'>
              {project.creator.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='text-base leading-tight font-medium text-white'>
              {project.creator.name}
            </p>
            <p className='mt-1 text-xs font-medium tracking-wide text-[#DBF936] uppercase'>
              {project.creator.role}
            </p>
          </div>
        </div>
      </div>

      {/* Project Links */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold text-gray-300'>Project Links</h2>
        <div className='space-y-3'>
          {project.links.map((link, index) => (
            <a
              key={index}
              href={`https://${link.url}`}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-3 text-sm text-white transition-colors hover:text-white'
            >
              <span className='text-gray-400 transition-colors group-hover:text-white'>
                {getIcon(link.icon)}
              </span>
              <span className='truncate'>{link.url}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
