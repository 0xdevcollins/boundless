import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { testimonials } from '@/components/testimonials/data/testimonial';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
};

export default AboutPage;
