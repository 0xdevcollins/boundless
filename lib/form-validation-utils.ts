import { z } from 'zod';
import {
  type CreateProjectFormData,
  stepSchemas,
} from '@/components/landing-page/project/CreateProjectModal/schemas';

export interface ValidationError {
  field: string;
  message: string;
  step: number;
  path: string[];
}

export interface StepValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  missingFields: string[];
}

export const getFieldDisplayName = (path: string[]): string => {
  const fieldMap: Record<string, string> = {
    'basic.name': 'Project Name',
    'basic.category': 'Category',
    'basic.type': 'Project Type',
    'basic.shortDescription': 'Short Description',
    'basic.fundingGoal': 'Funding Goal',
    'basic.duration': 'Duration',
    'details.description': 'Project Description',
    'details.problemStatement': 'Problem Statement',
    'details.solution': 'Solution',
    'details.targetAudience': 'Target Audience',
    'details.keyFeatures': 'Key Features',
    'details.technologyStack': 'Technology Stack',
    'details.roadmap': 'Project Roadmap',
    'milestones.milestones': 'Project Milestones',
    'team.teamMembers': 'Team Members',
    'contact.website': 'Website',
    'contact.github': 'GitHub Repository',
    'contact.twitter': 'Twitter/X',
    'contact.discord': 'Discord',
    'contact.telegram': 'Telegram',
    'contact.email': 'Contact Email',
    'contact.whitepaper': 'Whitepaper',
    'contact.demo': 'Demo/Video',
  };

  const fullPath = path.join('.');
  return fieldMap[fullPath] || path[path.length - 1] || 'Field';
};

export const getStepName = (step: number): string => {
  const stepNames: Record<number, string> = {
    1: 'Basic Information',
    2: 'Project Details',
    3: 'Milestones',
    4: 'Team Members',
    5: 'Contact & Links',
  };
  return stepNames[step] || `Step ${step}`;
};

export const validateStep = (
  step: number,
  data: unknown
): StepValidationResult => {
  const schema = stepSchemas[step as keyof typeof stepSchemas];
  if (!schema) {
    return {
      isValid: false,
      errors: [],
      missingFields: [],
    };
  }

  // Handle undefined or null data
  if (data === undefined || data === null) {
    return {
      isValid: false,
      errors: [],
      missingFields: [],
    };
  }

  try {
    schema.parse(data);
    return {
      isValid: true,
      errors: [],
      missingFields: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError && error.issues) {
      const errors: ValidationError[] = error.issues.map((err: z.ZodIssue) => ({
        field: getFieldDisplayName(err.path),
        message: err.message,
        step,
        path: err.path.map(p => String(p)),
      }));

      const missingFields = errors
        .filter(err => err.message.includes('required'))
        .map(err => err.field);

      return {
        isValid: false,
        errors,
        missingFields,
      };
    }

    return {
      isValid: false,
      errors: [
        {
          field: 'Unknown',
          message: 'An unexpected validation error occurred',
          step,
          path: [],
        },
      ],
      missingFields: [],
    };
  }
};

export const validateAllSteps = (
  formData: CreateProjectFormData
): {
  isValid: boolean;
  stepResults: Record<number, StepValidationResult>;
  allErrors: ValidationError[];
} => {
  const stepResults: Record<number, StepValidationResult> = {};
  const allErrors: ValidationError[] = [];

  // Validate each step
  for (let step = 1; step <= 5; step++) {
    const stepKey = getStepDataKey(step);
    const stepData = formData[stepKey as keyof CreateProjectFormData];
    const result = validateStep(step, stepData);

    stepResults[step] = result;
    allErrors.push(...result.errors);
  }

  return {
    isValid: allErrors.length === 0,
    stepResults,
    allErrors,
  };
};

export const getStepDataKey = (step: number) => {
  const keys = ['basic', 'details', 'milestones', 'team', 'contact'] as const;
  return keys[step - 1];
};

export const getErrorMessage = (error: ValidationError): string => {
  const { field, message, step } = error;

  // Customize error messages for better UX
  if (message.includes('required')) {
    return `${field} is required in ${getStepName(step)}. Please fill this field to continue.`;
  }

  if (message.includes('too_small')) {
    if (field.includes('Name') || field.includes('Title')) {
      return `${field} must be at least 3 characters long.`;
    }
    if (field.includes('Description') || field.includes('Bio')) {
      return `${field} must be at least 20 characters long.`;
    }
    if (field.includes('Funding')) {
      return `${field} must be at least $100.`;
    }
    return `${field} is too short. Please provide more details.`;
  }

  if (message.includes('too_big')) {
    return `${field} is too long. Please shorten your input.`;
  }

  if (message.includes('invalid_type')) {
    return `${field} has an invalid format. Please check your input.`;
  }

  if (message.includes('invalid_string')) {
    if (field.includes('Email')) {
      return `Please enter a valid email address for ${field}.`;
    }
    if (
      field.includes('URL') ||
      field.includes('Website') ||
      field.includes('GitHub') ||
      field.includes('Twitter') ||
      field.includes('Discord') ||
      field.includes('Telegram')
    ) {
      return `Please enter a valid URL for ${field}. Make sure it starts with http:// or https://`;
    }
    return `${field} format is invalid. Please check your input.`;
  }

  if (message.includes('at least')) {
    if (field.includes('Key Features')) {
      return `Please add at least one key feature to describe your project.`;
    }
    if (field.includes('Technology Stack')) {
      return `Please add at least one technology to your tech stack.`;
    }
    if (field.includes('Team Members')) {
      return `Please add at least one team member.`;
    }
    if (field.includes('Milestones')) {
      return `Please add at least one project milestone.`;
    }
  }

  // Default fallback
  return `${field}: ${message}`;
};

export const getStepCompletionStatus = (
  step: number,
  formData: CreateProjectFormData
): {
  isCompleted: boolean;
  isPartiallyCompleted: boolean;
  completionPercentage: number;
  missingFields: string[];
} => {
  try {
    const stepKey = getStepDataKey(step);
    const stepData = formData[stepKey as keyof CreateProjectFormData];

    // If stepData is undefined or null, return default values
    if (!stepData) {
      return {
        isCompleted: false,
        isPartiallyCompleted: false,
        completionPercentage: 0,
        missingFields: [],
      };
    }

    const validation = validateStep(step, stepData);

    const isCompleted = validation.isValid;
    const missingFields = validation.missingFields;

    // Calculate partial completion based on filled fields
    let totalFields = 0;
    let filledFields = 0;

    if (stepData && typeof stepData === 'object') {
      const countFields = (obj: Record<string, unknown>, prefix = ''): void => {
        Object.entries(obj).forEach(([key, value]) => {
          const fieldPath = prefix ? `${prefix}.${key}` : key;

          if (Array.isArray(value)) {
            totalFields += 1;
            if (value.length > 0) {
              filledFields += 1;
            }
          } else if (typeof value === 'object' && value !== null) {
            countFields(value as Record<string, unknown>, fieldPath);
          } else {
            totalFields += 1;
            if (value !== '' && value !== null && value !== undefined) {
              filledFields += 1;
            }
          }
        });
      };

      countFields(stepData);
    }

    const completionPercentage =
      totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    const isPartiallyCompleted = completionPercentage > 0 && !isCompleted;

    return {
      isCompleted,
      isPartiallyCompleted,
      completionPercentage,
      missingFields,
    };
  } catch {
    return {
      isCompleted: false,
      isPartiallyCompleted: false,
      completionPercentage: 0,
      missingFields: [],
    };
  }
};
