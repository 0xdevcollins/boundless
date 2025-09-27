/* eslint-disable no-console */
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  FileUpload,
  FilePreviewGrid,
  OverallUploadProgress,
  FileUploadConfig,
  ImageDimensionConfig,
  FileMetadata,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DEFAULT_FILE_TYPES,
} from '@/components/file-upload';
import {
  Upload,
  Settings,
  FileText,
  File,
  Info,
  CheckCircle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AlertCircle,
  ImageIcon,
} from 'lucide-react';

export default function FileUploadDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<FileMetadata[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadResults, setUploadResults] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Configuration state
  const [config, setConfig] = useState<FileUploadConfig>({
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    multiple: true,
    disabled: false,
  });

  const [imageConfig, setImageConfig] = useState<ImageDimensionConfig>({
    minWidth: 100,
    maxWidth: 2000,
    minHeight: 100,
    maxHeight: 2000,
    aspectRatio: 1, // Square images
    aspectRatioTolerance: 0.1,
  });

  const [showPreviews, setShowPreviews] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [allowRemove, setAllowRemove] = useState(true);

  // Mock upload function
  const mockUploadFunction = async (file: File): Promise<any> => {
    // Simulate upload delay
    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 3000 + 1000)
    );

    // Simulate occasional failures
    if (Math.random() < 0.1) {
      throw new Error('Upload failed due to network error');
    }

    return {
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: `https://example.com/uploads/${file.name}`,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };
  };

  const handleFilesAdded = (files: FileMetadata[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFilesRemoved = (fileIds: string[]) => {
    setUploadedFiles(prev => prev.filter(f => !fileIds.includes(f.id)));
  };

  const handleValidationError = (file: FileMetadata, errors: string[]) => {
    console.warn('Validation error for file:', file.name, errors);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUploadStart = (files: FileMetadata[]) => {
    setIsUploading(true);
    setUploadResults([]);
  };

  const handleUploadComplete = (fileId: string, result: any) => {
    setUploadResults(prev => [...prev, { fileId, result }]);
  };

  const handleUploadError = (fileId: string, error: Error) => {
    console.error('Upload error for file:', fileId, error);
  };

  const handleAllUploadsComplete = (
    results: Array<{ fileId: string; result: any }>
  ) => {
    setIsUploading(false);
    setUploadResults(results);
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
    setUploadResults([]);
  };

  const getFileTypeIcon = (file: FileMetadata) => {
    if (file.isImage) return <ImageIcon className='h-4 w-4' />;
    if (file.type === 'application/pdf')
      return <FileText className='h-4 w-4' />;
    return <File className='h-4 w-4' />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className='container mx-auto space-y-8 py-8'>
      <div className='space-y-4 text-center'>
        <h1 className='text-4xl font-bold'>File Upload Component Demo</h1>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          A production-ready drag and drop file upload component with
          comprehensive validation, image dimension checking, and progress
          tracking.
        </p>
      </div>

      <Tabs defaultValue='demo' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='demo'>Demo</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
          <TabsTrigger value='results'>Results</TabsTrigger>
        </TabsList>

        <TabsContent value='demo' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* File Upload Component */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Upload className='h-5 w-5' />
                  <span>File Upload</span>
                </CardTitle>
                <CardDescription>
                  Drag and drop files or click to select. Supports images, PDFs,
                  and documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  config={config}
                  imageConfig={imageConfig}
                  callbacks={{
                    onFilesAdded: handleFilesAdded,
                    onFilesRemoved: handleFilesRemoved,
                    onValidationError: handleValidationError,
                    onUploadStart: handleUploadStart,
                    onUploadComplete: handleUploadComplete,
                    onUploadError: handleUploadError,
                    onAllUploadsComplete: handleAllUploadsComplete,
                  }}
                  uploadFunction={mockUploadFunction}
                  showPreviews={showPreviews}
                  showProgress={showProgress}
                  allowRemove={allowRemove}
                  dropzoneText='Drag & drop files here, or click to select'
                  dropzoneSubtext='Supports images, PDFs, and documents'
                />
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {isUploading && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Progress</CardTitle>
                  <CardDescription>
                    Real-time upload progress for all files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OverallUploadProgress
                    files={uploadedFiles}
                    onCancel={() => setIsUploading(false)}
                  />
                </CardContent>
              </Card>
            )}

            {/* File Previews */}
            {uploadedFiles.length > 0 && showPreviews && (
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <CardTitle>File Previews</CardTitle>
                  <CardDescription>
                    Preview of uploaded files with validation status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FilePreviewGrid
                    files={uploadedFiles}
                    columns={4}
                    showInfo={true}
                    showRemove={allowRemove}
                    onRemove={fileId => handleFilesRemoved([fileId])}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value='settings' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Settings className='h-5 w-5' />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='maxSize'>Max File Size (bytes)</Label>
                  <Input
                    id='maxSize'
                    type='number'
                    value={config.maxSize || 0}
                    onChange={e =>
                      setConfig(prev => ({
                        ...prev,
                        maxSize: parseInt(e.target.value) || undefined,
                      }))
                    }
                  />
                  <p className='text-muted-foreground text-xs'>
                    Current:{' '}
                    {config.maxSize
                      ? formatFileSize(config.maxSize)
                      : 'No limit'}
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='maxFiles'>Max Files</Label>
                  <Input
                    id='maxFiles'
                    type='number'
                    value={config.maxFiles || 0}
                    onChange={e =>
                      setConfig(prev => ({
                        ...prev,
                        maxFiles: parseInt(e.target.value) || undefined,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center space-x-2'>
                  <Switch
                    id='multiple'
                    checked={config.multiple}
                    onCheckedChange={checked =>
                      setConfig(prev => ({ ...prev, multiple: checked }))
                    }
                  />
                  <Label htmlFor='multiple'>Allow Multiple Files</Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Switch
                    id='disabled'
                    checked={config.disabled}
                    onCheckedChange={checked =>
                      setConfig(prev => ({ ...prev, disabled: checked }))
                    }
                  />
                  <Label htmlFor='disabled'>Disabled</Label>
                </div>
              </CardContent>
            </Card>

            {/* Image Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <ImageIcon className='h-5 w-5' />
                  <span>Image Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='minWidth'>Min Width (px)</Label>
                    <Input
                      id='minWidth'
                      type='number'
                      value={imageConfig.minWidth || 0}
                      onChange={e =>
                        setImageConfig(prev => ({
                          ...prev,
                          minWidth: parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='maxWidth'>Max Width (px)</Label>
                    <Input
                      id='maxWidth'
                      type='number'
                      value={imageConfig.maxWidth || 0}
                      onChange={e =>
                        setImageConfig(prev => ({
                          ...prev,
                          maxWidth: parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='minHeight'>Min Height (px)</Label>
                    <Input
                      id='minHeight'
                      type='number'
                      value={imageConfig.minHeight || 0}
                      onChange={e =>
                        setImageConfig(prev => ({
                          ...prev,
                          minHeight: parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='maxHeight'>Max Height (px)</Label>
                    <Input
                      id='maxHeight'
                      type='number'
                      value={imageConfig.maxHeight || 0}
                      onChange={e =>
                        setImageConfig(prev => ({
                          ...prev,
                          maxHeight: parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='aspectRatio'>Aspect Ratio</Label>
                  <Input
                    id='aspectRatio'
                    type='number'
                    step='0.1'
                    value={imageConfig.aspectRatio || 0}
                    onChange={e =>
                      setImageConfig(prev => ({
                        ...prev,
                        aspectRatio: parseFloat(e.target.value) || undefined,
                      }))
                    }
                  />
                  <p className='text-muted-foreground text-xs'>
                    Width/Height ratio (e.g., 1.0 for square, 1.5 for 3:2)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='showPreviews'
                      checked={showPreviews}
                      onCheckedChange={setShowPreviews}
                    />
                    <Label htmlFor='showPreviews'>Show Previews</Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='showProgress'
                      checked={showProgress}
                      onCheckedChange={setShowProgress}
                    />
                    <Label htmlFor='showProgress'>Show Progress</Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='allowRemove'
                      checked={allowRemove}
                      onCheckedChange={setAllowRemove}
                    />
                    <Label htmlFor='allowRemove'>Allow Remove</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='results' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Upload Results */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Results</CardTitle>
                <CardDescription>
                  Results from successful uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadResults.length > 0 ? (
                  <div className='space-y-3'>
                    {uploadResults.map((result, index) => {
                      const file = uploadedFiles.find(
                        f => f.id === result.fileId
                      );
                      return (
                        <div
                          key={index}
                          className='flex items-center space-x-3 rounded-lg border p-3'
                        >
                          {file && getFileTypeIcon(file)}
                          <div className='min-w-0 flex-1'>
                            <p className='truncate text-sm font-medium'>
                              {file?.name || 'Unknown file'}
                            </p>
                            <p className='text-muted-foreground text-xs'>
                              Uploaded successfully
                            </p>
                          </div>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className='text-muted-foreground py-8 text-center'>
                    No upload results yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* File Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>File Statistics</CardTitle>
                <CardDescription>Overview of uploaded files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-muted rounded-lg p-3 text-center'>
                      <p className='text-2xl font-bold'>
                        {uploadedFiles.length}
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Total Files
                      </p>
                    </div>
                    <div className='bg-muted rounded-lg p-3 text-center'>
                      <p className='text-2xl font-bold'>
                        {uploadedFiles.reduce(
                          (sum, file) => sum + file.size,
                          0
                        ) > 0
                          ? formatFileSize(
                              uploadedFiles.reduce(
                                (sum, file) => sum + file.size,
                                0
                              )
                            )
                          : '0 Bytes'}
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        Total Size
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium'>File Types</h4>
                    <div className='space-y-1'>
                      {Object.entries(
                        uploadedFiles.reduce(
                          (acc, file) => {
                            const type = file.isImage
                              ? 'image'
                              : file.type.includes('pdf')
                                ? 'pdf'
                                : 'document';
                            acc[type] = (acc[type] || 0) + 1;
                            return acc;
                          },
                          {} as Record<string, number>
                        )
                      ).map(([type, count]) => (
                        <div
                          key={type}
                          className='flex items-center justify-between text-sm'
                        >
                          <span className='capitalize'>{type}</span>
                          <Badge variant='outline'>{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <Button variant='outline' size='sm' onClick={clearAllFiles}>
                      Clear All Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Info className='h-5 w-5' />
            <span>Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-2'>
              <h4 className='font-medium'>File Validation</h4>
              <ul className='text-muted-foreground space-y-1 text-sm'>
                <li>• File type validation</li>
                <li>• File size limits</li>
                <li>• Custom validation rules</li>
                <li>• Real-time error feedback</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium'>Image Processing</h4>
              <ul className='text-muted-foreground space-y-1 text-sm'>
                <li>• Dimension validation</li>
                <li>• Aspect ratio checking</li>
                <li>• Image previews</li>
                <li>• Format support (JPEG, PNG, WebP, etc.)</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h4 className='font-medium'>User Experience</h4>
              <ul className='text-muted-foreground space-y-1 text-sm'>
                <li>• Drag and drop interface</li>
                <li>• Progress tracking</li>
                <li>• File previews</li>
                <li>• Accessibility support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
