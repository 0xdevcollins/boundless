'use client';

import { useState } from 'react';
import { ProjectComments } from '@/components/project-details/comment-section/project-comments';

export default function TestCommentsPage() {
  const [projectId, setProjectId] = useState('project-1');

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='mx-auto max-w-4xl px-4'>
        <div className='mb-6 rounded-lg bg-white p-6 shadow-lg'>
          <h1 className='mb-4 text-2xl font-bold text-gray-900'>
            Comment System Test Page
          </h1>

          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Project ID:
              </label>
              <input
                type='text'
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='Enter project ID'
              />
            </div>

            <div className='rounded-md border border-blue-200 bg-blue-50 p-4'>
              <h3 className='mb-2 text-sm font-medium text-blue-800'>
                Simplified Auto-Refresh
              </h3>
              <p className='text-sm text-blue-700'>
                Comments automatically refresh every 30 seconds using a simple
                useEffect. This keeps the code clean and reduces server requests
                while maintaining fresh data.
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-lg bg-white p-6 shadow-lg'>
          <h2 className='mb-4 text-xl font-semibold text-gray-900'>
            Comments for Project: {projectId}
          </h2>

          <ProjectComments projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
