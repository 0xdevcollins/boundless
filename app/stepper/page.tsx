import ProjectSubmissionForm from '@/components/project/ProjectSubmissionForm';
import { Stepper } from '@/components/stepper';
import React from 'react';

const submissionSteps = [
  {
    title: 'Initialize',
    description: 'Submit your project idea to kickstart your campaign journey.',
    state: 'completed' as const,
  },
  {
    title: 'Project Details',
    description: 'Provide detailed information about your project.',
    state: 'active' as const,
  },
  {
    title: 'Review & Submit',
    description: 'Review your submission and finalize your entry.',
    state: 'pending' as const,
  },
];

function page() {
  return (
    <section className='bg-red-500'>
      <section className='w-[1284px] h-[1035px]  bg-background border border-card/10 rounded-t-3xl'>
        <Stepper steps={submissionSteps} />
        <ProjectSubmissionForm />
      </section>
    </section>
  );
}

export default page;
