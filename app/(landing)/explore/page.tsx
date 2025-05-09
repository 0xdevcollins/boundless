'use client';

import PageTransition from '@/components/landing/components/PageTransition';
import Navbar from '@/components/shared/navbar';
import { PublicProjectCard } from '@/components/shared/public-project-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import { useProjects } from '@/store/useProjectStore';
import type { Project } from '@/types/project';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const { projects, isLoading, error, fetchProjects } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects(false);
  }, [fetchProjects]);

  // Apply filters whenever projects, search term or filters change
  useEffect(() => {
    if (!projects.length) return;

    let results = [...projects];

    // Apply search filter
    if (debouncedSearchTerm) {
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter((project) => project.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter((project) => project.ideaValidation === statusFilter.toUpperCase());
    }

    setFilteredProjects(results);
  }, [projects, debouncedSearchTerm, categoryFilter, statusFilter]);

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(projects.map((project) => project.category))).sort();

  return (
    <PageTransition>
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">Explore Projects</h1>
          <p className="text-muted-foreground">Discover and support innovative blockchain projects</p>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">Error: {error}</div>
        ) : !projects.length ? (
          <div className="text-center py-10">No projects found</div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <Button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="validated">Validated</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Reset Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setStatusFilter('all');
                    }}
                    disabled={searchTerm === '' && categoryFilter === 'all' && statusFilter === 'all'}
                  >
                    Reset Filters
                  </Button>
                </div>
              </Card>
            </div>

            {/* Results Count */}
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project) => (
                  <PublicProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">No projects match your filters</div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
