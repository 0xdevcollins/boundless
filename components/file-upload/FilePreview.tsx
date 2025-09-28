'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileText,
  File,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import { FilePreviewProps } from '@/types/file-upload';
import Image from 'next/image';

export function FilePreview({
  file,
  showInfo = true,
  showRemove = true,
  onRemove,
  className,
}: FilePreviewProps) {
  const [imageError, setImageError] = useState(false);

  const getFileIcon = () => {
    if (file.isImage) return <ImageIcon className='h-6 w-6' />;
    if (file.type === 'application/pdf')
      return <FileText className='h-6 w-6' />;
    return <File className='h-6 w-6' />;
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'success':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'error':
        return <AlertCircle className='h-4 w-4 text-red-500' />;
      case 'uploading':
        return <Loader2 className='h-4 w-4 animate-spin text-blue-500' />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (file.status) {
      case 'success':
        return (
          <Badge variant='default' className='bg-green-100 text-green-800'>
            Success
          </Badge>
        );
      case 'error':
        return <Badge variant='destructive'>Error</Badge>;
      case 'uploading':
        return <Badge variant='secondary'>Uploading...</Badge>;
      default:
        return <Badge variant='outline'>Pending</Badge>;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderPreview = () => {
    if (file.isImage && file.previewUrl && !imageError) {
      return (
        <div className='group relative'>
          <Image
            src={file.previewUrl}
            width={100}
            height={100}
            alt={`Preview of ${file.name}`}
            className='h-32 w-full rounded-md object-cover'
            onError={handleImageError}
            role='img'
          />
          <div className='bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center rounded-md bg-black transition-all duration-200'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='secondary'
                  size='sm'
                  className='opacity-0 transition-opacity group-hover:opacity-100'
                  aria-label={`Preview ${file.name}`}
                >
                  <Eye className='mr-1 h-4 w-4' />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className='max-h-[90vh] max-w-4xl overflow-auto'>
                <DialogHeader>
                  <DialogTitle>{file.name}</DialogTitle>
                </DialogHeader>
                <div className='flex items-center justify-center'>
                  <Image
                    width={100}
                    height={100}
                    src={file.previewUrl}
                    alt={file.name}
                    className='max-h-[70vh] max-w-full object-contain'
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      );
    }

    // Fallback for non-image files or when image fails to load
    return (
      <div className='bg-muted flex h-32 w-full items-center justify-center rounded-md'>
        <div className='text-center'>
          {getFileIcon()}
          <p className='text-muted-foreground mt-1 max-w-24 truncate text-xs'>
            {file.extension.toUpperCase()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className='p-3'>
        <div className='space-y-3'>
          {/* Preview */}
          {renderPreview()}

          {/* File Info */}
          {showInfo && (
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <p
                  className='flex-1 truncate text-sm font-medium'
                  title={file.name}
                >
                  {file.name}
                </p>
                {getStatusIcon()}
              </div>

              <div className='text-muted-foreground flex items-center justify-between text-xs'>
                <span>{formatFileSize(file.size)}</span>
                {file.dimensions && (
                  <span>
                    {file.dimensions.width} × {file.dimensions.height}px
                  </span>
                )}
              </div>

              <div className='flex items-center justify-between'>
                {getStatusBadge()}
                <div className='flex items-center space-x-1'>
                  {file.isImage && file.previewUrl && !imageError && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          aria-label={`Preview ${file.name}`}
                        >
                          <Eye className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-h-[90vh] max-w-4xl overflow-auto'>
                        <DialogHeader>
                          <DialogTitle>{file.name}</DialogTitle>
                        </DialogHeader>
                        <div className='flex items-center justify-center'>
                          <Image
                            width={100}
                            height={100}
                            src={file.previewUrl}
                            alt={file.name}
                            className='max-h-[70vh] max-w-full object-contain'
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {showRemove && onRemove && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onRemove(file.id)}
                      disabled={file.status === 'uploading'}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </div>

              {/* Validation Errors */}
              {file.validation && !file.validation.isValid && (
                <div className='space-y-1'>
                  {file.validation.errors.map((error, index) => (
                    <p key={index} className='text-xs text-red-600'>
                      {error}
                    </p>
                  ))}
                </div>
              )}

              {/* Warnings */}
              {file.validation && file.validation.warnings.length > 0 && (
                <div className='space-y-1'>
                  {file.validation.warnings.map((warning, index) => (
                    <p key={index} className='text-xs text-yellow-600'>
                      {warning}
                    </p>
                  ))}
                </div>
              )}

              {/* Error Message */}
              {file.status === 'error' && file.error && (
                <p className='text-xs text-red-600'>{file.error}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Grid layout for multiple file previews
interface FilePreviewGridProps {
  files: FilePreviewProps['file'][];
  showInfo?: boolean;
  showRemove?: boolean;
  onRemove?: (fileId: string) => void;
  className?: string;
  columns?: number;
}

export function FilePreviewGrid({
  files,
  showInfo = true,
  showRemove = true,
  onRemove,
  className,
  columns = 3,
}: FilePreviewGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid gap-4',
        gridCols[columns as keyof typeof gridCols] || 'grid-cols-3',
        className
      )}
    >
      {files.map(file => (
        <FilePreview
          key={file.id}
          file={file}
          showInfo={showInfo}
          showRemove={showRemove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
