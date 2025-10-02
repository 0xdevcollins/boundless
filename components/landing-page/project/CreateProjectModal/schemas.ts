import { z } from 'zod';

// Step 1: Basic Information
export const basicSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .min(3, 'Project name must be at least 3 characters long')
    .max(100, 'Project name must be less than 100 characters'),
  category: z
    .enum([
      'web3',
      'defi',
      'nft',
      'dao',
      'infrastructure',
      'social_impact',
      'education',
      'healthcare',
      'environment',
      'technology',
    ])
    .refine(val => val !== undefined, {
      message: 'Please select a category for your project',
    }),
  type: z
    .enum([
      'crowdfunding',
      'grant',
      'hackathon',
      'research',
      'creative',
      'open_source',
    ])
    .refine(val => val !== undefined, {
      message: 'Please select a project type',
    }),
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .min(20, 'Short description must be at least 20 characters long')
    .max(200, 'Short description must be less than 200 characters'),
  fundingGoal: z
    .number()
    .min(100, 'Funding goal must be at least $100')
    .max(10000000, 'Funding goal must be less than $10,000,000'),
  duration: z
    .number()
    .min(1, 'Duration must be at least 1 month')
    .max(24, 'Duration must be less than 24 months'),
});

// Step 2: Details
export const detailsSchema = z.object({
  description: z
    .string()
    .min(1, 'Project description is required')
    .min(100, 'Project description must be at least 100 characters long'),
  problemStatement: z
    .string()
    .min(1, 'Problem statement is required')
    .min(50, 'Problem statement must be at least 50 characters long'),
  solution: z
    .string()
    .min(1, 'Solution is required')
    .min(50, 'Solution must be at least 50 characters long'),
  targetAudience: z
    .string()
    .min(1, 'Target audience is required')
    .min(20, 'Target audience must be at least 20 characters long'),
  keyFeatures: z
    .array(z.string().min(1, 'Key feature cannot be empty'))
    .min(1, 'Please add at least one key feature')
    .max(10, 'Maximum 10 key features allowed'),
  technologyStack: z
    .array(z.string().min(1, 'Technology cannot be empty'))
    .min(1, 'Please add at least one technology')
    .max(15, 'Maximum 15 technologies allowed'),
  roadmap: z
    .string()
    .min(1, 'Project roadmap is required')
    .min(50, 'Roadmap must be at least 50 characters long'),
});

// Step 3: Milestones
export const milestoneSchema = z.object({
  title: z
    .string()
    .min(1, 'Milestone title is required')
    .min(3, 'Milestone title must be at least 3 characters long')
    .max(100, 'Milestone title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Milestone description is required')
    .min(20, 'Milestone description must be at least 20 characters long'),
  dueDate: z.date().refine(val => val instanceof Date, {
    message: 'Please select a valid date',
  }),
  fundingAmount: z.number().min(0, 'Funding amount must be positive or zero'),
});

export const milestonesSchema = z.object({
  milestones: z
    .array(milestoneSchema)
    .min(1, 'Please add at least one project milestone')
    .max(10, 'Maximum 10 milestones allowed'),
});

// Step 4: Team
export const teamMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Team member name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters'),
  role: z
    .string()
    .min(1, 'Team member role is required')
    .min(2, 'Role must be at least 2 characters long')
    .max(50, 'Role must be less than 50 characters'),
  bio: z
    .string()
    .min(1, 'Team member bio is required')
    .min(20, 'Bio must be at least 20 characters long')
    .max(500, 'Bio must be less than 500 characters'),
  linkedin: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .url('Please enter a valid Twitter URL')
    .optional()
    .or(z.literal('')),
  github: z
    .string()
    .url('Please enter a valid GitHub URL')
    .optional()
    .or(z.literal('')),
});

export const teamSchema = z.object({
  teamMembers: z
    .array(teamMemberSchema)
    .min(1, 'Please add at least one team member')
    .max(20, 'Maximum 20 team members allowed'),
});

// Step 5: Contact & Links
export const contactSchema = z.object({
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  github: z
    .string()
    .url('Please enter a valid GitHub URL')
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .url('Please enter a valid Twitter URL')
    .optional()
    .or(z.literal('')),
  discord: z
    .string()
    .url('Please enter a valid Discord URL')
    .optional()
    .or(z.literal('')),
  telegram: z
    .string()
    .url('Please enter a valid Telegram URL')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  whitepaper: z
    .string()
    .url('Please enter a valid whitepaper URL')
    .optional()
    .or(z.literal('')),
  demo: z
    .string()
    .url('Please enter a valid demo URL')
    .optional()
    .or(z.literal('')),
});

// Complete form schema
export const createProjectSchema = z.object({
  basic: basicSchema,
  details: detailsSchema,
  milestones: milestonesSchema,
  team: teamSchema,
  contact: contactSchema,
});

export type BasicFormData = z.infer<typeof basicSchema>;
export type DetailsFormData = z.infer<typeof detailsSchema>;
export type MilestonesFormData = z.infer<typeof milestonesSchema>;
export type TeamFormData = z.infer<typeof teamSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

// Step validation schemas
export const stepSchemas = {
  1: basicSchema,
  2: detailsSchema,
  3: milestonesSchema,
  4: teamSchema,
  5: contactSchema,
} as const;

// Initial default values for each step
export const initialStepDefaults = {
  basic: {
    name: '',
    category: undefined,
    type: undefined,
    shortDescription: '',
    fundingGoal: 1000,
    duration: 3,
  },
  details: {
    description: '',
    problemStatement: '',
    solution: '',
    targetAudience: '',
    keyFeatures: [],
    technologyStack: [],
    roadmap: '',
  },
  milestones: {
    milestones: [
      {
        title: '',
        description: '',
        dueDate: new Date(),
        fundingAmount: 0,
      },
    ],
  },
  team: {
    teamMembers: [
      {
        name: '',
        role: '',
        bio: '',
        linkedin: '',
        twitter: '',
        github: '',
      },
    ],
  },
  contact: {
    website: '',
    github: '',
    twitter: '',
    discord: '',
    telegram: '',
    email: '',
    whitepaper: '',
    demo: '',
  },
} as const;
