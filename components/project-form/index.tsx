'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BasicInfoStep } from './steps/basic-info-step';
import { TeamStep } from './steps/team-step';
import { MilestonesStep } from './steps/milestones-step';
import { DocumentsStep } from './steps/documents-step';
import { ReviewStep } from './steps/review-step';
import { projectFormSchema, type ProjectFormValues, steps, categories } from './types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getXLMPrice } from '@/utils/price';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Circle,
  Eye,
  Calendar,
  FileText,
  Maximize2,
  Minimize2,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// const AUTOSAVE_INTERVAL = 30000 // 30 seconds

export function ProjectForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [xlmPrice, setXLMPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      userId: '',
      walletAddress: '',
      teamMembers: [],
      milestones: [],
      pitchDeck: undefined,
      whitepaper: undefined,
    },
    mode: 'onChange',
  });

  // Track form changes
  // useEffect(() => {
  //   const subscription = form.watch(() => {
  //     setIsDirty(true);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form]);

  // Auto-save functionality
  // useEffect(() => {
  //   if (!isDirty) return

  //   const autosaveTimer = setInterval(() => {
  //     saveDraft()
  //   }, AUTOSAVE_INTERVAL)

  //   return () => clearInterval(autosaveTimer)
  // }, [isDirty])

  // Keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     // Ctrl/Cmd + S to save draft
  //     if ((e.ctrlKey || e.metaKey) && e.key === "s") {
  //       e.preventDefault()
  //       saveDraft()
  //     }
  //     // Ctrl/Cmd + Arrow Right to next step
  //     if ((e.ctrlKey || e.metaKey) && e.key === "ArrowRight") {
  //       e.preventDefault()
  //       handleNavigation(currentStep + 1)
  //     }
  //     // Ctrl/Cmd + Arrow Left to previous step
  //     if ((e.ctrlKey || e.metaKey) && e.key === "ArrowLeft") {
  //       e.preventDefault()
  //       handleNavigation(currentStep - 1)
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyPress)
  //   return () => window.removeEventListener("keydown", handleKeyPress)
  // }, [currentStep])

  // Calculate step completion
  const getStepCompletion = (step: number): boolean => {
    const fields = getFieldsForStep(step);
    const values = form.getValues();
    return fields.every((field) => {
      const value = values[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    });
  };

  // Calculate overall progress
  const calculateProgress = () => {
    const totalSteps = steps.length - 1; // Exclude review step
    const completedSteps = steps.slice(0, -1).filter((_, index) => getStepCompletion(index)).length;
    return (completedSteps / totalSteps) * 100;
  };

  // Fetch XLM price on component mount
  useEffect(() => {
    const fetchXLMPrice = async () => {
      try {
        const price = await getXLMPrice();
        setXLMPrice(price);
      } catch (error) {
        console.error('Failed to fetch XLM price:', error);
      }
    };
    fetchXLMPrice();
  }, []);

  const handleNavigation = async (step: number) => {
    if (step < 0 || step >= steps.length) return;

    // If moving to review step, just update the step without validation
    if (step === steps.length - 1) {
      setCurrentStep(step);
      return;
    }

    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep(step);
    } else {
      // Show error toast if validation fails
      toast.error("Please fill in all required fields before proceeding");
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setIsSubmitting(true);

      const projectId = nanoid();

      // Create form data for file uploads
      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('fundingGoal', String(data.fundingGoal));
      formData.append('category', data.category);

      // Handle image uploads
      if (data.bannerImage instanceof File) {
        formData.append('bannerImage', data.bannerImage);
      } else if (typeof data.bannerImage === 'string') {
        formData.append('bannerImageUrl', data.bannerImage);
      }

      if (data.profileImage instanceof File) {
        formData.append('profileImage', data.profileImage);
      } else if (typeof data.profileImage === 'string') {
        formData.append('profileImageUrl', data.profileImage);
      }

      // Handle document uploads
      if (data.pitchDeck instanceof File) {
        formData.append('pitchDeck', data.pitchDeck);
      } else if (typeof data.pitchDeck === 'string') {
        formData.append('pitchDeckUrl', data.pitchDeck);
      }

      if (data.whitepaper instanceof File) {
        formData.append('whitepaper', data.whitepaper);
      } else if (typeof data.whitepaper === 'string') {
        formData.append('whitepaperUrl', data.whitepaper);
      }

      // Create the project first
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create project');
      }

      const { project } = await response.json();

      // Create team members if any
      if (data.teamMembers.length > 0) {
        try {
          const teamResponse = await fetch(`/api/projects/${project.id}/team`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teamMembers: data.teamMembers.map((member) => ({
                userId: member.userId,
                role: member.role || 'Team Member', // Provide default role if empty
                fullName: member.user?.name || 'Team Member', // Use user's name or default
              })),
            }),
          });

          if (!teamResponse.ok) {
            const error = await teamResponse.json();
            throw new Error(error.message || 'Failed to add team members');
          }
        } catch (error) {
          console.error('Failed to add team members:', error);
          // Continue with project creation even if team member addition fails
          toast.warning('Project created but failed to add team members', {
            description: 'You can add team members later from the project settings.',
          });
        }
      }

      // Create milestones if any
      if (data.milestones.length > 0) {
        try {
          const milestonesResponse = await fetch(`/api/projects/${project.id}/milestones`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              milestones: data.milestones.map((milestone) => ({
                title: milestone.title,
                description: milestone.description,
                dueDate: milestone.dueDate,
                color: milestone.color,
                progress: milestone.progress || 0,
              })),
            }),
          });

          if (!milestonesResponse.ok) {
            const error = await milestonesResponse.json();
            throw new Error(error.message || 'Failed to add milestones');
          }
        } catch (error) {
          console.error('Failed to add milestones:', error);
          // Continue with project creation even if milestone addition fails
          toast.warning('Project created but failed to add milestones', {
            description: 'You can add milestones later from the project settings.',
          });
        }
      }

      // // Clear the draft after successful submission
      // localStorage.removeItem("projectDraft")

      toast.success('Project created successfully', {
        description: 'Your project has been created and is now live.',
      });
      router.push(`/projects/${project.id}`);
    } catch (error: unknown) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get fields to validate for each step
  const getFieldsForStep = (step: number): (keyof ProjectFormValues)[] => {
    switch (step) {
      case 0: // Basic Info
        return ['title', 'description', 'fundingGoal', 'category'];
      case 1: // Team
        return ['teamMembers'];
      case 2: // Milestones
        return ['milestones'];
      case 3: // Documents
        return ['pitchDeck', 'whitepaper'];
      default:
        return [];
    }
  };

  const PreviewContent = () => {
    const data = form.getValues();
    const category = categories.find((cat) => cat.id === data.category);
    const [expandedSections, setExpandedSections] = useState({
      description: true,
      team: true,
      milestones: true,
      documents: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    const toggleAllSections = (expand: boolean) => {
      setExpandedSections({
        description: expand,
        team: expand,
        milestones: expand,
        documents: expand,
      });
    };

    const isAllExpanded = Object.values(expandedSections).every((v) => v);
    // const isAllCollapsed = Object.values(expandedSections).every((v) => !v)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8 max-h-[80vh] overflow-y-auto"
      >
        {/* Expand/Collapse All Button */}
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="outline" size="sm" onClick={() => toggleAllSections(!isAllExpanded)} className="gap-2">
                  {isAllExpanded ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      Collapse All
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      Expand All
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isAllExpanded ? 'Collapse all sections' : 'Expand all sections'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Project Banner */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-r from-primary/20 to-primary/5"
        >
          {data.bannerImage ? (
            data.bannerImage instanceof File ? (
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(data.bannerImage) || '/placeholder.svg'}
                alt="Project banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                width={100}
                height={100}
                src={data.bannerImage || '/placeholder.svg'}
                alt="Project banner"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">No banner image</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end gap-4">
              {data.profileImage ? (
                data.profileImage instanceof File ? (
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(data.profileImage) || '/placeholder.svg'}
                    alt="Project profile"
                    className="w-20 h-20 rounded-lg border-4 border-background object-cover"
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={data.profileImage || '/placeholder.svg'}
                    alt="Project profile"
                    className="w-20 h-20 rounded-lg border-4 border-background object-cover"
                  />
                )
              ) : (
                <div className="w-20 h-20 rounded-lg border-4 border-background bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {data.title ? data.title.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{data.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    {category?.name || data.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    {formatCurrency(data.fundingGoal)} Goal
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div layout className="space-y-4">
          <button
            type="button"
            onClick={() => toggleSection('description')}
            className="flex items-center justify-between w-full group"
          >
            <h3 className="text-lg font-semibold">Description</h3>
            {expandedSections.description ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.description && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{data.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Separator />

        {/* Team Section */}
        <motion.div layout className="space-y-4">
          <button type="button" onClick={() => toggleSection('team')} className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Badge variant="outline">{data.teamMembers.length} members</Badge>
            </div>
            {expandedSections.team ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.team && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative flex items-center gap-4 p-4 border rounded-lg hover:border-primary/50 transition-all duration-200 bg-card hover:shadow-md"
                    >
                      <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                        <AvatarImage src={member.user?.image || '/placeholder.svg'} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                          {member.user?.name || 'Team Member'}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {member.user?.github && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={member.user.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <Github className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>GitHub Profile</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {member.user?.twitter && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={member.user.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <Twitter className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>Twitter Profile</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {member.user?.linkedin && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={member.user.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    <Linkedin className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>LinkedIn Profile</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Separator />

        {/* Milestones Section */}
        <motion.div layout className="space-y-4">
          <button
            type="button"
            onClick={() => toggleSection('milestones')}
            className="flex items-center justify-between w-full group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Project Roadmap</h3>
              <Badge variant="outline">{data.milestones.length} milestones</Badge>
            </div>
            {expandedSections.milestones ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.milestones && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {data.milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className="relative pl-8 pb-8 last:pb-0 group"
                    >
                      {/* Timeline line */}
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-border group-hover:bg-primary/50 transition-colors" />
                      {/* Timeline dot */}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="absolute left-0 top-0 w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center group-hover:border-primary/80 transition-colors"
                      >
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </motion.div>
                      <div className="p-4 border rounded-lg bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200">
                        <h4 className="font-medium group-hover:text-primary transition-colors">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        {milestone.dueDate && (
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="gap-1 group-hover:bg-primary/10 transition-colors">
                              <Calendar className="h-3 w-3" />
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </Badge>
                            {/* Add days remaining badge */}
                            <Badge variant="secondary" className="gap-1">
                              {(() => {
                                const days = Math.ceil(
                                  (new Date(milestone.dueDate).getTime() - new Date().getTime()) /
                                    (1000 * 60 * 60 * 24),
                                );
                                return days > 0 ? `${days} days left` : 'Due today';
                              })()}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Separator />

        {/* Documents Section */}
        <motion.div layout className="space-y-4">
          <button type="button" onClick={() => toggleSection('documents')} className="flex items-center justify-between w-full group">
            <h3 className="text-lg font-semibold">Project Documents</h3>
            {expandedSections.documents ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.documents && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.pitchDeck && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-all duration-200 bg-card hover:shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                            Pitch Deck
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {data.pitchDeck instanceof File ? data.pitchDeck.name : 'Uploaded'}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  {data.whitepaper && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-all duration-200 bg-card hover:shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                            Whitepaper
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {data.whitepaper instanceof File ? data.whitepaper.name : 'Uploaded'}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Form {...form}>
      <form
        onKeyDown={(e) => {
          // Prevent form submission on Enter key when not on review step
          if (e.key === 'Enter' && currentStep !== steps.length - 1) {
            e.preventDefault();
          }
        }}
        onSubmit={(e) => {
          // Prevent form submission when not on review step
          if (currentStep !== steps.length - 1) {
            e.preventDefault();
            return;
          }
          form.handleSubmit(async (data) => {
            console.log('Form submit event triggered');
            try {
              setIsSubmitting(true);
              await onSubmit(data);
            } catch (error) {
              console.error('Form submission error:', error);
            } finally {
              setIsSubmitting(false);
            }
          })(e);
        }}
        className="space-y-8"
      >
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Project Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-1.5" />
          </div>

          {/* Steps Progress */}
          <div className="flex items-center justify-between bg-muted/30 p-1 rounded-lg">
            {steps.map((step, index) => (
              <Button
                type="button"
                key={step.id}
                variant={index === currentStep ? 'default' : 'ghost'}
                size="sm"
                className={`h-auto py-1 px-2 text-xs flex items-center gap-1.5 ${
                  index === currentStep ? '' : getStepCompletion(index) ? 'text-green-600' : 'text-muted-foreground'
                }`}
                onClick={() => handleNavigation(index)}
              >
                {getStepCompletion(index) ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
                <span className="font-medium">{step.title}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {currentStep === 0 && <BasicInfoStep form={form} xlmPrice={xlmPrice} />}
          {currentStep === 1 && <TeamStep form={form} />}
          {currentStep === 2 && <MilestonesStep form={form} />}
          {currentStep === 3 && <DocumentsStep form={form} />}
          {currentStep === 4 && <ReviewStep formData={form.getValues()} />}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleNavigation(currentStep - 1)}
              disabled={currentStep === 0 || isSubmitting}
              className="h-8"
            >
              Previous
            </Button>
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5" disabled={isSubmitting}>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Project Preview</DialogTitle>
                  <DialogDescription>This is how your project will appear to others</DialogDescription>
                </DialogHeader>
                <PreviewContent />
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-3">
            {currentStep === steps.length - 1 ? (
              <Button type="submit" size="sm" className="h-8" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="h-8"
                onClick={() => handleNavigation(currentStep + 1)}
                disabled={isSubmitting}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
