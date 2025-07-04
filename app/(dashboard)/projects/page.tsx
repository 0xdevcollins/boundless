'use client';

import { ProjectsList } from '@/components/projects/project-list';
import { ProjectFilters, type SortOption } from '@/components/shared/project-filters';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  return (
    <div className="container">
      <ProjectFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <ProjectsList category={selectedCategory} searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
}
