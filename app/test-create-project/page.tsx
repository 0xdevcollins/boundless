'use client';

import { useState } from 'react';
import CreateProjectModal from '@/components/landing-page/project/CreateProjectModal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Rocket,
  CheckCircle,
  Users,
  Target,
  Zap,
  ArrowRight,
  Star,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function TestCreateProjectPage() {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: <CheckCircle className='h-6 w-6 text-green-400' />,
      title: 'Smart Validation',
      description:
        'Real-time validation with helpful error messages and field-level guidance',
    },
    {
      icon: <Users className='h-6 w-6 text-blue-400' />,
      title: 'Team Management',
      description: 'Add team members with roles, bios, and social links',
    },
    {
      icon: <Target className='h-6 w-6 text-purple-400' />,
      title: 'Milestone Tracking',
      description:
        'Define project milestones with timelines and funding requirements',
    },
    {
      icon: <Zap className='h-6 w-6 text-yellow-400' />,
      title: 'Rich Text Editor',
      description: 'Powerful markdown editor for detailed project descriptions',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Basic Information',
      description: 'Project name, category, and funding goals',
    },
    {
      number: 2,
      title: 'Project Details',
      description: 'Detailed description, problem statement, and solution',
    },
    {
      number: 3,
      title: 'Milestones',
      description: 'Define key milestones and timelines',
    },
    {
      number: 4,
      title: 'Team Members',
      description: 'Add team members and their information',
    },
    {
      number: 5,
      title: 'Contact & Links',
      description: 'Project links and contact information',
    },
  ];

  return (
    <div className='bg-background min-h-screen'>
      {/* Hero Section */}
      <div className='from-background via-background/95 to-background/90 relative overflow-hidden bg-gradient-to-br'>
        <div className='absolute inset-0 bg-[url("/stars.svg")] opacity-20' />
        <div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mb-6 flex justify-center'>
              <div className='relative'>
                <div className='from-primary/20 absolute inset-0 rounded-full bg-gradient-to-r to-purple-500/20 blur-xl' />
                <div className='from-primary/10 relative rounded-full bg-gradient-to-r to-purple-500/10 p-1'>
                  <div className='bg-background/80 rounded-full p-4'>
                    <Rocket className='text-primary h-12 w-12' />
                  </div>
                </div>
              </div>
            </div>

            <h1 className='mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              Create Your
              <span className='from-primary bg-gradient-to-r to-purple-400 bg-clip-text text-transparent'>
                {' '}
                Project
              </span>
            </h1>

            <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl'>
              Launch your next big idea with our comprehensive project creation
              flow. Built with advanced validation, user-friendly design, and
              powerful features.
            </p>

            <div className='mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
              <Button
                onClick={() => setIsOpen(true)}
                size='lg'
                className='group from-primary bg-gradient-to-r to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
              >
                <Sparkles className='mr-2 h-5 w-5' />
                Create Project Modal
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>

              <Badge
                variant='outline'
                className='border-primary/20 bg-primary/5 text-primary px-4 py-2'
              >
                <Shield className='mr-1 h-4 w-4' />
                Enhanced UX & Validation
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-white'>
            Powerful Features
          </h2>
          <p className='mx-auto max-w-2xl text-gray-400'>
            Experience the most advanced project creation flow with intelligent
            validation, real-time feedback, and beautiful user interface.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='bg-background/50 hover:border-primary/50 hover:shadow-primary/10 border-gray-800 transition-all duration-300 hover:shadow-lg'
            >
              <CardHeader className='pb-4'>
                <div className='mb-2'>{feature.icon}</div>
                <CardTitle className='text-lg text-white'>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-gray-400'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className='bg-gray-900/50 py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-3xl font-bold text-white'>
              5-Step Process
            </h2>
            <p className='mx-auto max-w-2xl text-gray-400'>
              Our streamlined process guides you through every aspect of project
              creation with clear validation and helpful guidance.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-5'>
            {steps.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='relative mb-4'>
                  <div className='from-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r to-purple-600 text-lg font-bold text-white'>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className='from-primary/50 absolute top-6 left-1/2 hidden h-0.5 w-full bg-gradient-to-r to-transparent lg:block' />
                  )}
                </div>
                <h3 className='mb-2 text-lg font-semibold text-white'>
                  {step.title}
                </h3>
                <p className='text-sm text-gray-400'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <Card className='from-primary/10 border-primary/20 bg-gradient-to-r to-purple-600/10'>
          <CardContent className='p-8 text-center'>
            <Star className='text-primary mx-auto mb-4 h-12 w-12' />
            <h3 className='mb-4 text-2xl font-bold text-white'>
              Ready to Create Your Project?
            </h3>
            <p className='mx-auto mb-6 max-w-2xl text-gray-300'>
              Experience our enhanced project creation flow with intelligent
              validation, real-time feedback, and beautiful user interface.
              Click below to get started!
            </p>
            <Button
              onClick={() => setIsOpen(true)}
              size='lg'
              className='from-primary bg-gradient-to-r to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
            >
              <Rocket className='mr-2 h-5 w-5' />
              Start Creating Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className='border-t border-gray-800 bg-gray-900/50 py-8'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <p className='text-gray-400'>
            Built with ❤️ using Next.js, React Hook Form, Zod, and Tailwind CSS
          </p>
        </div>
      </div>

      <CreateProjectModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
}
