import Image from 'next/image';
import React from 'react';
import { Textarea } from '../ui/textarea';

function ProjectSubmissionForm() {
  return (
    <div className='text-white'>
      <h5>Submit your project information</h5>
      <form action=''>
        <div>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Project Title *
          </label>
          <div className='w-full h-12 flex gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div>
              <Image src='/cube.svg' width={20} height={20} alt='cube' />
            </div>
            <input
              type='text'
              className='font-normal text-base text-placeholder'
              placeholder='Enter project title'
            />
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Project Tagline (Short one-liner)
          </label>
          <div className='w-full h-12 flex gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <input
              type='text'
              className='font-normal text-base text-placeholder'
              placeholder='Enter your one-liner'
            />
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Project Description (Rich Text Editor or Markdown supported)
          </label>

          <Textarea
            className='font-normal text-base text-placeholder rounded-[12px] bg-stepper-foreground w-full h-[172px] border border-stepper-border'
            placeholder='Describe your project in a few words'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs text-card font-medium'>
            Funding Goal
          </label>
          <div className='w-full h-12 flex gap-3 p-4 rounded-[12px] bg-stepper-foreground border border-stepper-border'>
            <div>
              <Image src='/cube.svg' width={20} height={20} alt='cube' />
            </div>
            <input
              type='text'
              className='font-normal text-base text-placeholder'
              placeholder='Enter project title'
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectSubmissionForm;
