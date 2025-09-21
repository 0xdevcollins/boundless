'use client';
import React, { useState } from 'react';
import BoundlessSheet from './boundless-sheet';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const BoundlessSheetDemo: React.FC = () => {
  const [openBottom, setOpenBottom] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openWithTitle, setOpenWithTitle] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);

  return (
    <div className='space-y-6 p-6'>
      <div className='text-center'>
        <h1 className='mb-2 text-3xl font-bold'>BoundlessSheet Demo</h1>
        <p className='text-muted-foreground'>
          Responsive sheet component for mobile, tablet, and desktop
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Basic Bottom Sheet */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Bottom Sheet</CardTitle>
            <CardDescription>
              Default bottom sheet with responsive behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setOpenBottom(true)} className='w-full'>
              Open Bottom Sheet
            </Button>
          </CardContent>
        </Card>

        {/* Right Side Sheet */}
        <Card>
          <CardHeader>
            <CardTitle>Right Side Sheet</CardTitle>
            <CardDescription>
              Sheet that slides in from the right
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setOpenRight(true)} className='w-full'>
              Open Right Sheet
            </Button>
          </CardContent>
        </Card>

        {/* Sheet with Title */}
        <Card>
          <CardHeader>
            <CardTitle>Sheet with Title</CardTitle>
            <CardDescription>
              Sheet with a custom title and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setOpenWithTitle(true)} className='w-full'>
              Open with Title
            </Button>
          </CardContent>
        </Card>

        {/* Custom Sheet */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Sheet</CardTitle>
            <CardDescription>
              Sheet with custom styling and height
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setOpenCustom(true)} className='w-full'>
              Open Custom Sheet
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Info */}
      <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            📱 Responsive Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='text-center'>
              <Badge variant='secondary' className='mb-2'>
                Mobile
              </Badge>
              <p className='text-muted-foreground text-sm'>
                Full width, bottom sheet, 85% max height, close button at
                -right-10
              </p>
            </div>
            <div className='text-center'>
              <Badge variant='secondary' className='mb-2'>
                Tablet
              </Badge>
              <p className='text-muted-foreground text-sm'>
                Centered with max-width, 80% max height, close button at
                -right-14
              </p>
            </div>
            <div className='text-center'>
              <Badge variant='secondary' className='mb-2'>
                Desktop
              </Badge>
              <p className='text-muted-foreground text-sm'>
                Large max-width (6xl), optimized spacing, close button at
                -right-14
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Components */}

      {/* Basic Bottom Sheet */}
      <BoundlessSheet open={openBottom} setOpen={setOpenBottom}>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-white'>
            Welcome to BoundlessSheet
          </h2>
          <p className='text-gray-300'>
            This is a responsive sheet component that adapts to different screen
            sizes. Try resizing your browser window to see the responsive
            behavior!
          </p>
          <Separator className='bg-white/20' />
          <div className='space-y-2'>
            <h3 className='font-medium text-white'>Features:</h3>
            <ul className='space-y-1 text-gray-300'>
              <li>• Responsive design for all screen sizes</li>
              <li>• Smooth animations and transitions</li>
              <li>• Keyboard navigation support (ESC to close)</li>
              <li>• Accessible with proper ARIA labels</li>
              <li>• Customizable styling and behavior</li>
            </ul>
          </div>
          <div className='pt-4'>
            <Button
              onClick={() => setOpenBottom(false)}
              className='w-full'
              variant='outline'
            >
              Close Sheet
            </Button>
          </div>
        </div>
      </BoundlessSheet>

      {/* Right Side Sheet */}
      <BoundlessSheet
        open={openRight}
        setOpen={setOpenRight}
        side='right'
        maxHeight='90vh'
      >
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-white'>Right Side Sheet</h2>
          <p className='text-gray-300'>
            This sheet slides in from the right side. Perfect for navigation
            menus, settings panels, or additional content.
          </p>
          <div className='space-y-3'>
            <div className='rounded-lg bg-white/5 p-3'>
              <h4 className='mb-1 font-medium text-white'>Navigation Item 1</h4>
              <p className='text-sm text-gray-400'>
                Description for navigation item
              </p>
            </div>
            <div className='rounded-lg bg-white/5 p-3'>
              <h4 className='mb-1 font-medium text-white'>Navigation Item 2</h4>
              <p className='text-sm text-gray-400'>
                Description for navigation item
              </p>
            </div>
            <div className='rounded-lg bg-white/5 p-3'>
              <h4 className='mb-1 font-medium text-white'>Navigation Item 3</h4>
              <p className='text-sm text-gray-400'>
                Description for navigation item
              </p>
            </div>
          </div>
        </div>
      </BoundlessSheet>

      {/* Sheet with Title */}
      <BoundlessSheet
        open={openWithTitle}
        setOpen={setOpenWithTitle}
        title='Sheet with Custom Title'
        minHeight='500px'
      >
        <div className='space-y-4'>
          <p className='text-gray-300'>
            This sheet has a custom title that appears in the header. The title
            is centered and styled consistently.
          </p>
          <Separator className='bg-white/20' />
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Card className='border-white/10 bg-white/5'>
              <CardHeader>
                <CardTitle className='text-lg text-white'>Card 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-300'>
                  This is a sample card within the sheet content.
                </p>
              </CardContent>
            </Card>
            <Card className='border-white/10 bg-white/5'>
              <CardHeader>
                <CardTitle className='text-lg text-white'>Card 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-300'>
                  Another sample card to demonstrate layout.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='pt-4'>
            <Button onClick={() => setOpenWithTitle(false)} className='w-full'>
              Confirm Action
            </Button>
          </div>
        </div>
      </BoundlessSheet>

      {/* Custom Sheet */}
      <BoundlessSheet
        open={openCustom}
        setOpen={setOpenCustom}
        title='Custom Styled Sheet'
        contentClassName='bg-gradient-to-br from-purple-900/90 to-blue-900/90'
        maxHeight='70vh'
        minHeight='600px'
      >
        <div className='space-y-6'>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500'>
              <span className='text-2xl'>✨</span>
            </div>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Custom Styled Sheet
            </h3>
            <p className='text-gray-300'>
              This sheet demonstrates custom styling with gradients and enhanced
              visual design.
            </p>
          </div>

          <Separator className='bg-white/20' />

          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg bg-white/10 p-4'>
              <span className='font-medium text-white'>Feature 1</span>
              <Badge variant='secondary'>Active</Badge>
            </div>
            <div className='flex items-center justify-between rounded-lg bg-white/10 p-4'>
              <span className='font-medium text-white'>Feature 2</span>
              <Badge variant='outline'>Pending</Badge>
            </div>
            <div className='flex items-center justify-between rounded-lg bg-white/10 p-4'>
              <span className='font-medium text-white'>Feature 3</span>
              <Badge variant='secondary'>Active</Badge>
            </div>
          </div>

          <div className='flex gap-3 pt-4'>
            <Button
              onClick={() => setOpenCustom(false)}
              variant='outline'
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenCustom(false)}
              className='flex-1 bg-gradient-to-r from-purple-500 to-blue-500'
            >
              Save Changes
            </Button>
          </div>
        </div>
      </BoundlessSheet>
    </div>
  );
};

export default BoundlessSheetDemo;
