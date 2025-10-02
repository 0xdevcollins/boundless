'use client';

import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  Image,
  Calendar,
} from 'lucide-react';

interface DetailsProps {
  onDataChange?: (data: DetailsFormData) => void;
  initialData?: Partial<DetailsFormData>;
}

export interface DetailsFormData {
  vision: string;
}

const detailsSchema = z.object({
  vision: z.string().trim().min(1, 'Vision is required'),
});

const Details = React.forwardRef<{ validate: () => boolean }, DetailsProps>(
  ({ onDataChange, initialData }, ref) => {
    const [vision, setVision] = useState(initialData?.vision || '');
    const [errors, setErrors] = useState<{ vision?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleVisionChange = (value: string) => {
      setVision(value);
      onDataChange?.({ vision: value });

      // Clear error when user starts typing
      if (errors.vision) {
        setErrors(prev => ({ ...prev, vision: undefined }));
      }
    };

    const validateForm = (): boolean => {
      setSubmitted(true);
      const parsed = detailsSchema.safeParse({ vision });
      if (parsed.success) {
        setErrors({});
        return true;
      }
      setErrors({
        vision: parsed.error.issues[0]?.message || 'Vision is required',
      });
      return false;
    };

    // Expose validation function to parent
    React.useImperativeHandle(ref, () => ({
      validate: validateForm,
    }));

    const executeCommand = (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            executeCommand('bold');
            break;
          case 'i':
            e.preventDefault();
            executeCommand('italic');
            break;
          case 'u':
            e.preventDefault();
            executeCommand('underline');
            break;
          case 'k':
            e.preventDefault();
            const url = prompt('Enter URL:');
            if (url) executeCommand('createLink', url);
            break;
        }
      }
    };

    const handleInput = () => {
      if (editorRef.current) {
        const content = editorRef.current.innerHTML;
        handleVisionChange(content);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    };

    return (
      <div className='min-h-full space-y-6 text-white'>
        {/* Vision */}
        <div className='space-y-3'>
          <Label className='text-white'>
            Vision <span className='text-red-500'>*</span>
          </Label>

          {/* Rich Text Editor */}
          <div className='space-y-3'>
            {/* Toolbar */}
            <div className='flex flex-wrap items-center gap-2 rounded-lg border border-[#484848] bg-[#1A1A1A] p-3'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('undo')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Undo2 className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('redo')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Redo2 className='h-4 w-4' />
              </Button>

              <div className='h-4 w-px bg-[#484848]' />

              <select
                onChange={e => executeCommand('formatBlock', e.target.value)}
                className='bg-transparent text-sm text-[#B5B5B5] focus:outline-none'
                defaultValue='normal'
              >
                <option value='normal'>Normal</option>
                <option value='h1'>Heading 1</option>
                <option value='h2'>Heading 2</option>
                <option value='h3'>Heading 3</option>
                <option value='p'>Paragraph</option>
              </select>

              <div className='h-4 w-px bg-[#484848]' />

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('bold')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Bold className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('italic')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Italic className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('strikeThrough')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Strikethrough className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('formatCode')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Code className='h-4 w-4' />
              </Button>

              <div className='h-4 w-px bg-[#484848]' />

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) executeCommand('createLink', url);
                }}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Link className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => {
                  const url = prompt('Enter image URL:');
                  if (url) executeCommand('insertImage', url);
                }}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Image className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => executeCommand('insertUnorderedList')}
                className='h-8 w-8 p-0 text-[#B5B5B5] hover:bg-[#2A2A2A] hover:text-white'
              >
                <Calendar className='h-4 w-4' />
              </Button>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              className={cn(
                'focus:border-primary min-h-48 w-full rounded-lg border border-[#484848] bg-[#1A1A1A] p-4 text-white placeholder:text-[#919191] focus:outline-none',
                submitted && errors.vision && 'border-red-500'
              )}
              style={{ minHeight: '192px' }}
              data-placeholder="Tell your project's full story...\n\nUse text, images, links, or videos to bring your vision to life. Format freely with headings, lists, and more."
              suppressContentEditableWarning={true}
            />

            {/* Placeholder text */}
            {!vision && (
              <div className='pointer-events-none absolute top-4 left-4 text-[#919191]'>
                <p>Tell your project's full story...</p>
                <p className='mt-2'>
                  Use text, images, links, or videos to bring your vision to
                  life. Format freely with headings, lists, and more.
                </p>
              </div>
            )}
          </div>

          {submitted && errors.vision && (
            <p className='text-sm text-red-500'>{errors.vision}</p>
          )}
        </div>
      </div>
    );
  }
);

Details.displayName = 'Details';

export default Details;
