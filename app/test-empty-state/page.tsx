'use client';

import EmptyState from '@/components/EmptyState';
import { useState } from 'react';

export default function TestEmptyStatePage() {
  const [selectedType, setSelectedType] = useState<
    'default' | 'comment' | 'campaign' | 'user'
  >('default');

  const typeConfigs = {
    default: {
      title: 'No items found',
      description:
        'It looks like there are no items to display right now. Try adding some content to get started.',
      buttonText: 'Add Item',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    comment: {
      title: 'No comments yet',
      description:
        'Be the first to share your thoughts and start the conversation.',
      buttonText: 'Add Comment',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    campaign: {
      title: 'No campaigns found',
      description:
        'Create your first campaign to get started with fundraising and reach your goals.',
      buttonText: 'Create Campaign',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
    user: {
      title: 'No users found',
      description:
        'Invite team members to collaborate on your projects and grow your community.',
      buttonText: 'Invite Users',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
    },
  };

  const handleAction = (type: string) => {
    alert(
      `${typeConfigs[type as keyof typeof typeConfigs].buttonText} clicked!`
    );
  };

  return (
    <div className='min-h-screen bg-gray-900 p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-white mb-8 text-center'>
          EmptyState Component Test - GSAP Animations
        </h1>

        {/* Type Selector */}
        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {Object.keys(typeConfigs).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Current Selection Info */}
        <div className='text-center mb-8'>
          <p className='text-gray-400'>
            Currently showing:{' '}
            <span className='text-blue-400 font-semibold capitalize'>
              {selectedType}
            </span>{' '}
            type
          </p>
          <p className='text-sm text-gray-500 mt-1'>
            Watch for smooth GSAP animations: fade-in → scale/rotate → text →
            button → floating
          </p>
        </div>

        {/* Main Test Container */}
        <div
          className='bg-gray-800 rounded-lg p-8 mb-8 shadow-2xl'
          style={{ height: '600px' }}
        >
          <EmptyState
            key={selectedType} // Force re-render to see animations
            type={selectedType}
            title={typeConfigs[selectedType].title}
            description={typeConfigs[selectedType].description}
            action={
              <button
                onClick={() => handleAction(selectedType)}
                className={`px-6 py-3 text-white rounded-lg transition-colors font-medium transform hover:scale-105 ${typeConfigs[selectedType].buttonColor}`}
              >
                {typeConfigs[selectedType].buttonText}
              </button>
            }
          />
        </div>

        {/* Additional Test Cases Grid */}
        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Without Action Button */}
          <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-white mb-4 flex items-center'>
              <span className='w-3 h-3 bg-red-500 rounded-full mr-2'></span>
              Without Action Button
            </h3>
            <div style={{ height: '350px' }}>
              <EmptyState
                type='default'
                title='Search results'
                description='No results found for your search query. Try adjusting your filters or search terms.'
              />
            </div>
          </div>

          {/* Long Text Test */}
          <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-white mb-4 flex items-center'>
              <span className='w-3 h-3 bg-yellow-500 rounded-full mr-2'></span>
              Long Text Test
            </h3>
            <div style={{ height: '350px' }}>
              <EmptyState
                type='campaign'
                title='This is a much longer title to test text wrapping behavior'
                description='This is a significantly longer description to test how the component handles extended text content and ensures proper responsive behavior across different screen sizes while maintaining readability and visual hierarchy.'
                action={
                  <button className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm'>
                    Take Action Now
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Animation Details */}
        <div className='mt-12 bg-gray-800 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-white mb-4'>
            🎬 Animation Sequence
          </h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
            <div className='bg-gray-700 p-3 rounded'>
              <div className='text-blue-400 font-medium'>1. Container</div>
              <div className='text-gray-300'>Fade in (0.3s)</div>
            </div>
            <div className='bg-gray-700 p-3 rounded'>
              <div className='text-green-400 font-medium'>2. Image</div>
              <div className='text-gray-300'>Scale + Rotate (0.6s)</div>
            </div>
            <div className='bg-gray-700 p-3 rounded'>
              <div className='text-yellow-400 font-medium'>3. Text</div>
              <div className='text-gray-300'>Fade up (0.5s)</div>
            </div>
            <div className='bg-gray-700 p-3 rounded'>
              <div className='text-purple-400 font-medium'>4. Button</div>
              <div className='text-gray-300'>Fade up (0.4s)</div>
            </div>
          </div>
          <div className='mt-4 p-3 bg-gray-700 rounded'>
            <div className='text-pink-400 font-medium'>
              🌊 Continuous: Floating Animation
            </div>
            <div className='text-gray-300'>
              Subtle bounce every 2s (infinite loop)
            </div>
          </div>
        </div>

        {/* Responsive Test Instructions */}
        <div className='mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-blue-400 mb-3'>
            📱 Responsive Testing
          </h3>
          <div className='text-gray-300 space-y-2'>
            <p>
              • <strong>Desktop:</strong> Images scale to 128px, large text
            </p>
            <p>
              • <strong>Tablet:</strong> Images scale to 112px, medium text
            </p>
            <p>
              • <strong>Mobile:</strong> Images scale to 80px, small text
            </p>
            <p>
              • Try resizing your browser window to see responsive behavior!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
