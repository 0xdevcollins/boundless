'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  File,
  FileText,
  ImageIcon,
} from 'lucide-react';
import { UploadProgressProps } from '@/types/file-upload';

export function UploadProgress({ file, className }: UploadProgressProps) {
  const getFileIcon = () => {
    if (file.isImage) return <ImageIcon className='h-4 w-4' />;
    if (file.type === 'application/pdf')
      return <FileText className='h-4 w-4' />;
    return <File className='h-4 w-4' />;
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

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className='p-4'>
        <div className='space-y-3'>
          {/* Header */}
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0'>{getFileIcon()}</div>

            <div className='min-w-0 flex-1'>
              <div className='flex items-center space-x-2'>
                <p className='truncate text-sm font-medium' title={file.name}>
                  {file.name}
                </p>
                {getStatusIcon()}
              </div>

              <div className='mt-1 flex items-center space-x-2'>
                <span className='text-muted-foreground text-xs'>
                  {formatFileSize(file.size)}
                </span>
                {file.dimensions && (
                  <span className='text-muted-foreground text-xs'>
                    {file.dimensions.width} × {file.dimensions.height}px
                  </span>
                )}
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              {getStatusBadge()}
            </div>
          </div>

          {/* Progress Bar */}
          {file.status === 'uploading' && (
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-xs'>
                <span className='text-muted-foreground'>Uploading...</span>
                <span className='font-medium'>{file.progress || 0}%</span>
              </div>
              <Progress value={file.progress || 0} className='h-2' />
            </div>
          )}

          {/* Success State */}
          {file.status === 'success' && (
            <div className='flex items-center space-x-2 text-sm text-green-600'>
              <CheckCircle className='h-4 w-4' />
              <span>Upload completed successfully</span>
            </div>
          )}

          {/* Error State */}
          {file.status === 'error' && (
            <div className='space-y-2'>
              <div className='flex items-center space-x-2 text-sm text-red-600'>
                <AlertCircle className='h-4 w-4' />
                <span>Upload failed</span>
              </div>
              {file.error && (
                <p className='rounded bg-red-50 p-2 text-xs text-red-600'>
                  {file.error}
                </p>
              )}
            </div>
          )}

          {/* Pending State */}
          {file.status === 'pending' && (
            <div className='text-muted-foreground flex items-center space-x-2 text-sm'>
              <div className='border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
              <span>Waiting to upload...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Overall upload progress for multiple files
interface OverallUploadProgressProps {
  files: UploadProgressProps['file'][];
  className?: string;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export function OverallUploadProgress({
  files,
  className,
  onCancel,
  showCancelButton = true,
}: OverallUploadProgressProps) {
  const totalFiles = files.length;
  const completedFiles = files.filter(f => f.status === 'success').length;
  const failedFiles = files.filter(f => f.status === 'error').length;
  const uploadingFiles = files.filter(f => f.status === 'uploading').length;
  const pendingFiles = files.filter(f => f.status === 'pending').length;

  const overallProgress =
    totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0;

  const isUploading = uploadingFiles > 0 || pendingFiles > 0;
  const isComplete = completedFiles === totalFiles;
  const hasErrors = failedFiles > 0;

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className='p-4'>
        <div className='space-y-4'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium'>Upload Progress</h3>
              <p className='text-muted-foreground text-xs'>
                {completedFiles} of {totalFiles} files completed
              </p>
            </div>

            {showCancelButton && isUploading && onCancel && (
              <Button variant='outline' size='sm' onClick={onCancel}>
                <X className='mr-1 h-4 w-4' />
                Cancel
              </Button>
            )}
          </div>

          {/* Overall Progress */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>Overall Progress</span>
              <span className='font-medium'>
                {Math.round(overallProgress)}%
              </span>
            </div>
            <Progress value={overallProgress} className='h-2' />
          </div>

          {/* Status Summary */}
          <div className='flex items-center space-x-4 text-xs'>
            {completedFiles > 0 && (
              <div className='flex items-center space-x-1 text-green-600'>
                <CheckCircle className='h-3 w-3' />
                <span>{completedFiles} completed</span>
              </div>
            )}

            {uploadingFiles > 0 && (
              <div className='flex items-center space-x-1 text-blue-600'>
                <Loader2 className='h-3 w-3 animate-spin' />
                <span>{uploadingFiles} uploading</span>
              </div>
            )}

            {pendingFiles > 0 && (
              <div className='text-muted-foreground flex items-center space-x-1'>
                <div className='border-muted-foreground h-3 w-3 rounded-full border' />
                <span>{pendingFiles} pending</span>
              </div>
            )}

            {failedFiles > 0 && (
              <div className='flex items-center space-x-1 text-red-600'>
                <AlertCircle className='h-3 w-3' />
                <span>{failedFiles} failed</span>
              </div>
            )}
          </div>

          {/* Individual File Progress */}
          {files.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-muted-foreground text-xs font-medium'>
                Files
              </h4>
              <div className='max-h-32 space-y-1 overflow-y-auto'>
                {files.map(file => (
                  <div
                    key={file.id}
                    className='flex items-center space-x-2 text-xs'
                  >
                    <div className='w-4 flex-shrink-0'>
                      {file.status === 'success' && (
                        <CheckCircle className='h-3 w-3 text-green-500' />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className='h-3 w-3 text-red-500' />
                      )}
                      {file.status === 'uploading' && (
                        <Loader2 className='h-3 w-3 animate-spin text-blue-500' />
                      )}
                      {file.status === 'pending' && (
                        <div className='border-muted-foreground h-3 w-3 rounded-full border' />
                      )}
                    </div>
                    <span className='flex-1 truncate' title={file.name}>
                      {file.name}
                    </span>
                    {file.status === 'uploading' &&
                      file.progress !== undefined && (
                        <span className='text-muted-foreground'>
                          {file.progress}%
                        </span>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion Message */}
          {isComplete && (
            <div className='flex items-center space-x-2 rounded bg-green-50 p-2 text-sm text-green-600'>
              <CheckCircle className='h-4 w-4' />
              <span>
                All files uploaded successfully!
                {hasErrors && ` (${failedFiles} failed)`}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
