/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  File,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  ImageIcon,
} from 'lucide-react';
import { useFileUpload } from '@/hooks/use-file-upload';
import { FileUploadProps, FileMetadata } from '@/types/file-upload';

interface FileUploadComponentProps extends FileUploadProps {
  /** Whether to show upload button */
  showUploadButton?: boolean;
  /** Whether to show clear all button */
  showClearButton?: boolean;
  /** Custom upload button text */
  uploadButtonText?: string;
  /** Custom clear button text */
  clearButtonText?: string;
}

export function FileUpload({
  config,
  imageConfig,
  callbacks,
  uploadFunction,
  customValidation,
  className,
  dropzoneText = 'Drag & drop files here, or click to select',
  dropzoneSubtext = 'Supports images, PDFs, and documents',
  showPreviews = true,
  showProgress = true,
  allowRemove = true,
  showUploadButton = true,
  showClearButton = true,
  uploadButtonText = 'Upload All',
  clearButtonText = 'Clear All',
  formatFileSize,
  ...props
}: FileUploadComponentProps) {
  const {
    files,
    isProcessing,
    isUploading,
    isDragActive,
    isDisabled,
    processFiles,
    removeFile,
    uploadFile,
    uploadAllFiles,
    clearAllFiles,
    getRootProps,
    getInputProps,
    formatFileSize: defaultFormatFileSize,
  } = useFileUpload({
    config,
    imageConfig,
    callbacks,
    uploadFunction,
    customValidation,
  });

  const fileSizeFormatter = formatFileSize || defaultFormatFileSize;

  const getFileIcon = (file: FileMetadata) => {
    if (file.isImage) return <ImageIcon className='h-4 w-4' />;
    if (file.type === 'application/pdf')
      return <FileText className='h-4 w-4' />;
    return <File className='h-4 w-4' />;
  };

  const getStatusIcon = (file: FileMetadata) => {
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

  const getStatusBadge = (file: FileMetadata) => {
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

  const validFiles = files.filter(f => f.validation?.isValid);
  const invalidFiles = files.filter(f => !f.validation?.isValid);
  const hasValidFiles = validFiles.length > 0;
  const hasInvalidFiles = invalidFiles.length > 0;

  return (
    <div className={cn('w-full space-y-4', className)} {...props}>
      {/* Dropzone */}
      <Card
        {...getRootProps()}
        className={cn(
          'cursor-pointer border-2 border-dashed transition-colors',
          isDragActive && 'border-primary bg-primary/5',
          isDisabled && 'cursor-not-allowed opacity-50',
          isProcessing && 'opacity-75'
        )}
        role='button'
        tabIndex={0}
        aria-label='File upload dropzone'
        aria-describedby='dropzone-description'
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isDisabled && !isProcessing) {
              // Trigger file input click
              const input = e.currentTarget.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement;
              input?.click();
            }
          }
        }}
      >
        <CardContent className='flex flex-col items-center justify-center p-8 text-center'>
          <input
            {...getInputProps()}
            aria-label='Select files to upload'
            aria-describedby='dropzone-description'
          />

          <div className='flex flex-col items-center space-y-2'>
            <Upload
              className={cn(
                'h-8 w-8',
                isDragActive ? 'text-primary' : 'text-muted-foreground'
              )}
            />

            <div className='space-y-1'>
              <p
                id='dropzone-description'
                className={cn(
                  'text-sm font-medium',
                  isDragActive ? 'text-primary' : 'text-foreground'
                )}
              >
                {dropzoneText}
              </p>
              <p className='text-muted-foreground text-xs'>{dropzoneSubtext}</p>
            </div>

            {config.maxSize && (
              <p className='text-muted-foreground text-xs'>
                Max size: {fileSizeFormatter(config.maxSize)}
              </p>
            )}

            {config.maxFiles && (
              <p className='text-muted-foreground text-xs'>
                Max files: {config.maxFiles}
              </p>
            )}
          </div>

          {isProcessing && (
            <div className='mt-4 flex items-center space-x-2'>
              <Loader2 className='h-4 w-4 animate-spin' />
              <span className='text-muted-foreground text-sm'>
                Processing files...
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>Files ({files.length})</h3>

            <div className='flex items-center space-x-2'>
              {showClearButton && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={clearAllFiles}
                  disabled={isUploading}
                >
                  <Trash2 className='mr-1 h-4 w-4' />
                  {clearButtonText}
                </Button>
              )}

              {showUploadButton && hasValidFiles && uploadFunction && (
                <Button
                  onClick={uploadAllFiles}
                  disabled={
                    isUploading || validFiles.every(f => f.status === 'success')
                  }
                >
                  {isUploading ? (
                    <>
                      <Loader2 className='mr-1 h-4 w-4 animate-spin' />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className='mr-1 h-4 w-4' />
                      {uploadButtonText}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            {files.map(file => (
              <Card key={file.id} className='p-3'>
                <div className='flex items-center space-x-3'>
                  {/* File Icon */}
                  <div className='flex-shrink-0'>{getFileIcon(file)}</div>

                  {/* File Info */}
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center space-x-2'>
                      <p className='truncate text-sm font-medium'>
                        {file.name}
                      </p>
                      {getStatusIcon(file)}
                    </div>

                    <div className='mt-1 flex items-center space-x-2'>
                      <span className='text-muted-foreground text-xs'>
                        {fileSizeFormatter(file.size)}
                      </span>

                      {file.dimensions && (
                        <span className='text-muted-foreground text-xs'>
                          {file.dimensions.width} × {file.dimensions.height}px
                        </span>
                      )}

                      {getStatusBadge(file)}
                    </div>

                    {/* Validation Errors */}
                    {file.validation && !file.validation.isValid && (
                      <div className='mt-2'>
                        {file.validation.errors.map((error, index) => (
                          <Alert
                            key={index}
                            variant='destructive'
                            className='py-2'
                          >
                            <AlertCircle className='h-4 w-4' />
                            <AlertDescription className='text-xs'>
                              {error}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}

                    {/* Upload Progress */}
                    {showProgress &&
                      file.status === 'uploading' &&
                      file.progress !== undefined && (
                        <div className='mt-2'>
                          <Progress value={file.progress} className='h-2' />
                          <p className='text-muted-foreground mt-1 text-xs'>
                            {file.progress}% uploaded
                          </p>
                        </div>
                      )}

                    {/* Error Message */}
                    {file.status === 'error' && file.error && (
                      <Alert variant='destructive' className='mt-2 py-2'>
                        <AlertCircle className='h-4 w-4' />
                        <AlertDescription className='text-xs'>
                          {file.error}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='flex items-center space-x-1'>
                    {allowRemove && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => removeFile(file.id)}
                        disabled={file.status === 'uploading'}
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {files.length > 0 && (
        <div className='text-muted-foreground text-xs'>
          {hasValidFiles && (
            <span className='text-green-600'>
              {validFiles.length} valid file{validFiles.length !== 1 ? 's' : ''}
            </span>
          )}
          {hasValidFiles && hasInvalidFiles && ' • '}
          {hasInvalidFiles && (
            <span className='text-red-600'>
              {invalidFiles.length} invalid file
              {invalidFiles.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
