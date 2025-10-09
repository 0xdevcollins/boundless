import React from 'react';
import { Timeline, TimelineItemType } from './index';

// Example component demonstrating different Timeline variants
const TimelineExample: React.FC = () => {
  const sampleData: TimelineItemType[] = [
    {
      id: '1',
      title: 'Project Initiation',
      description: 'Project kickoff and initial planning phase',
      date: 'Jan 2024',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Development Phase',
      description: 'Active development and implementation',
      date: 'Feb 2024',
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Testing Phase',
      description: 'Quality assurance and testing',
      date: 'Mar 2024',
      status: 'awaiting',
    },
  ];

  return (
    <div className='space-y-8 p-6'>
      <h2 className='mb-6 text-2xl font-bold text-white'>Timeline Examples</h2>

      {/* Default Timeline */}
      <div>
        <h3 className='mb-4 text-lg font-semibold text-white'>
          Default Timeline
        </h3>
        <Timeline items={sampleData} />
      </div>

      {/* Compact Timeline */}
      <div>
        <h3 className='mb-4 text-lg font-semibold text-white'>
          Compact Timeline
        </h3>
        <Timeline items={sampleData} variant='compact' />
      </div>

      {/* Detailed Timeline */}
      <div>
        <h3 className='mb-4 text-lg font-semibold text-white'>
          Detailed Timeline
        </h3>
        <Timeline items={sampleData} variant='detailed' />
      </div>

      {/* Timeline without connector */}
      <div>
        <h3 className='mb-4 text-lg font-semibold text-white'>
          Timeline without Connector
        </h3>
        <Timeline items={sampleData} showConnector={false} />
      </div>
    </div>
  );
};

export default TimelineExample;
