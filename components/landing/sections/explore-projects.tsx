'use client';

import { PublicProjectCard } from '@/components/shared/public-project-card';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/store/useProjectStore';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import AnimatedUnderline from '../components/AnimatedUnderline';
import PageTransition from '../components/PageTransition';

export default function TrendingProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const { projects, isLoading, error, fetchProjects } = useProjects();

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects(false);
      setHasAttemptedFetch(true);
    };

    loadProjects();
  }, [fetchProjects]);

  if (isLoading || !hasAttemptedFetch) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-destructive">Error: {error}</div>;
  }

  if (!projects.length) {
    return <div className="text-center py-10">No projects found</div>;
  }

  return (
    <PageTransition>
      <section className="py-16 md:py-24 bg-background" ref={ref}>
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Trending Projects</h2>
              <AnimatedUnderline isInView={isInView} />
            </div>
            <p className="text-lg text-muted-foreground mt-6">
              Discover innovative projects from our community of creators building on blockchain technology
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            {projects.slice(0, 4).map((project) => (
              <PublicProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="outline" className="group">
              <Link href="/explore" className="flex items-center">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
