import ProjectPageHero from '@/components/Project-Page-Hero';
import ProjectsClient from '@/components/project/ProjectsPage';

export default function ProjectsPage() {
  return (
    <div className='relative mx-auto min-h-screen max-w-[1440px] px-5 py-5 md:px-[50px] lg:px-[100px]'>
      <ProjectPageHero />
      <ProjectsClient />
    </div>
  );
}
