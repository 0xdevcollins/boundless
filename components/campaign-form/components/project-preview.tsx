'use client';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency } from '@/utils/format';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  //   Github,
  //   Linkedin,
  Maximize2,
  Minimize2,
  //   Twitter,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { type ProjectFormValues, categories } from '../types';

interface ProjectPreviewProps {
  formData: ProjectFormValues;
}

export function ProjectPreview({ formData }: ProjectPreviewProps) {
  const data = formData;
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleAllSections(!isAllExpanded)}
                className="gap-2"
              >
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
      {/* <motion.div layout className="space-y-4">
				<button
					type="button"
					onClick={() => toggleSection("team")}
					className="flex items-center justify-between w-full group"
				>
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
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="overflow-hidden"
						>
							<div className="grid gap-4 sm:grid-cols-2">
								{data.teamMembers.map((member) => (
									<motion.div
										key={member.userId}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.2 }}
										whileHover={{ scale: 1.02, y: -2 }}
										className="group relative flex items-center gap-4 p-4 border rounded-lg hover:border-primary/50 transition-all duration-200 bg-card hover:shadow-md"
									>
										<Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
											<AvatarImage
												src={member.user?.image || "/placeholder.svg"}
											/>
											<AvatarFallback className="bg-primary/10 text-primary">
												{member.user?.name?.charAt(0) || "U"}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<h4 className="font-medium truncate group-hover:text-primary transition-colors">
												{member.user?.name || "Team Member"}
											</h4>
											<p className="text-sm text-muted-foreground truncate">
												{member.role}
											</p>
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

			<Separator /> */}

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
                    key={milestone.id}
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
                                (new Date(milestone.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
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
        <button
          type="button"
          onClick={() => toggleSection('documents')}
          className="flex items-center justify-between w-full group"
        >
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
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">Pitch Deck</h4>
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
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">Whitepaper</h4>
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
}
