'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CompletedProject } from '@/types/project';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CompletedProjectCardProps {
  project: CompletedProject;
}

export default function CompletedProjectCard({ project }: CompletedProjectCardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card key={project.id}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Badge variant="secondary">{project.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="font-medium">{project.totalRaised}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contributors</p>
                <p className="font-medium">{project.contributors}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Completed on {project.completionDate}</span>
            </div>
            <Link href={project.href}>
              <Button className="w-full" variant="outline">
                View Results
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
