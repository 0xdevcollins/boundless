'use client';

import React from 'react';
import ProjectPageHero from '@/components/Project-Page-Hero';
import ExploreHeader from '@/components/projects/ExploreHeader';

function ProjectsPage() {
  const handleSearch = (searchTerm: string) => {
    console.log('Search:', searchTerm);
  };

  const handleSort = (sortType: string) => {
    console.log('Sort:', sortType);
  };

  const handleStatus = (status: string) => {
    console.log('Status:', status);
  };

  const handleCategory = (category: string) => {
    console.log('Category:', category);
  };

  return (
    <div>
      <ProjectPageHero />
      <ExploreHeader
        onSearch={handleSearch}
        onSortChange={handleSort}
        onStatusChange={handleStatus}
        onCategoryChange={handleCategory}
      />
      <div className='flex flex-wrap justify-center gap-8 p-8'></div>
    </div>
  );
}

export default ProjectsPage;
