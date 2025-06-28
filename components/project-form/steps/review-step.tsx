'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, DollarSign, FileText, FileUp, Flag, Users } from 'lucide-react';
import { useState } from 'react';
import type { ProjectFormValues } from '../types';
import { categories } from '../types';

interface ReviewStepProps {
  formData: ProjectFormValues;
}

export function ReviewStep({ formData }: ReviewStepProps) {
  const category = categories.find((cat) => cat.id === formData.category);
  const [openSections, setOpenSections] = useState({
    basic: true,
    team: true,
    milestones: true,
    documents: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Review Your Project</h3>
        <p className="text-sm text-muted-foreground">Review all the information before submitting for validation</p>
        <Separator className="my-3" />
      </div>

      {/* Validation Process Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Flag className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Project Validation Process</h4>
            <p className="text-sm text-blue-700">
              After submission, your project will enter a community validation phase where users can vote on your idea.
              Once validated, your project will be eligible for funding campaigns.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Basic Information */}
        <Collapsible
          open={openSections.basic}
          onOpenChange={() => toggleSection('basic')}
          className="border rounded-lg overflow-hidden transition-all duration-200"
        >
          <div className="flex items-center justify-between p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <FileUp className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Basic Information</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0">
                {openSections.basic ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-3 pb-4 px-3">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <h4 className="text-xs font-medium mb-1">Project Title</h4>
                  <p className="text-sm">{formData.title}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium mb-1">Category</h4>
                  <Badge variant="secondary">{category?.name || formData.category}</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">{formData.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1 flex items-center gap-2">
                  <DollarSign className="h-3 w-3 text-primary" />
                  Funding Goal
                </h4>
                <p className="text-lg font-bold text-primary">${formData.fundingGoal?.toLocaleString() ?? '0'}</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Team Members */}
        <Collapsible
          open={openSections.team}
          onOpenChange={() => toggleSection('team')}
          className="border rounded-lg overflow-hidden transition-all duration-200"
        >
          <div className="flex items-center justify-between p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Team Members</h3>
              <Badge variant="outline" className="text-xs">
                {formData.teamMembers.length}
              </Badge>
            </div>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0">
                {openSections.team ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="pt-3 pb-4 px-3">
              {formData.teamMembers.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">No team members added yet</div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {formData.teamMembers.map((member, index) => (
                    <motion.div
                      key={member.userId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 border rounded-lg"
                    >
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={member.user?.image || '/placeholder.svg'} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {member.user?.name?.charAt(0) || member.userId.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{member.user?.name || `User ${index + 1}`}</h4>
                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Milestones */}
        <Collapsible
          open={openSections.milestones}
          onOpenChange={() => toggleSection('milestones')}
          className="border rounded-lg overflow-hidden transition-all duration-200"
        >
          <div className="flex items-center justify-between p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Milestones</h3>
              <Badge variant="outline" className="text-xs">
                {formData.milestones.length}
              </Badge>
            </div>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0">
                {openSections.milestones ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="pt-3 pb-4 px-3">
              {formData.milestones.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">No milestones added yet</div>
              ) : (
                <div className="space-y-3">
                  {formData.milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6 pb-3 last:pb-0"
                    >
                      {/* Timeline line */}
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                        <span className="text-[10px] font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="p-2 border rounded-lg bg-card">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">{milestone.title}</h4>
                          {milestone.dueDate && (
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(milestone.dueDate), 'MMM d, yyyy')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{milestone.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{milestone.progress || 0}%</span>
                          </div>
                          <Progress value={milestone.progress || 0} className="h-1.5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Documents */}
        <Collapsible
          open={openSections.documents}
          onOpenChange={() => toggleSection('documents')}
          className="border rounded-lg overflow-hidden transition-all duration-200"
        >
          <div className="flex items-center justify-between p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Documents</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0">
                {openSections.documents ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <CardContent className="pt-3 pb-4 px-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">Pitch Deck</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {formData.pitchDeck instanceof File
                          ? formData.pitchDeck.name
                          : formData.pitchDeck
                            ? 'URL provided'
                            : 'Not uploaded'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">Whitepaper</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {formData.whitepaper instanceof File
                          ? formData.whitepaper.name
                          : formData.whitepaper
                            ? 'URL provided'
                            : 'Not uploaded'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
