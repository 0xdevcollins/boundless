# File Upload Component

A production-ready, accessible drag and drop file upload component built with React, TypeScript, and shadcn/ui. Features comprehensive file validation, image dimension checking, progress tracking, and a beautiful user interface.

## Features

### 🎯 Core Functionality

- **Drag & Drop Interface**: Intuitive drag and drop with visual feedback
- **File Type Validation**: Support for images, PDFs, documents, and custom file types
- **Size Validation**: Configurable file size limits with user-friendly error messages
- **Multiple File Support**: Upload single or multiple files simultaneously
- **Progress Tracking**: Real-time upload progress with individual file status

### 🖼️ Image Processing

- **Dimension Validation**: Check image width, height, and aspect ratios
- **Image Previews**: Thumbnail previews with full-size modal views
- **Format Support**: JPEG, PNG, GIF, WebP, SVG, and more
- **Aspect Ratio Checking**: Enforce specific aspect ratios with tolerance

### 🎨 User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Error Handling**: Clear, actionable error messages
- **Loading States**: Visual feedback during processing and upload
- **File Management**: Remove individual files or clear all

### 🔧 Developer Experience

- **TypeScript**: Full type safety with comprehensive interfaces
- **Customizable**: Extensive configuration options
- **Extensible**: Custom validation and upload functions
- **Production Ready**: Robust error handling and edge case management

## Installation

The component uses the following dependencies:

```bash
npm install react-dropzone @types/react-dropzone
```

## Quick Start

```tsx
import { FileUpload } from '@/components/file-upload';

function MyComponent() {
  const handleFilesAdded = files => {
    console.log('Files added:', files);
  };

  const uploadFunction = async file => {
    // Your upload logic here
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  };

  return (
    <FileUpload
      config={{
        maxSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        accept: {
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          'application/pdf': ['.pdf'],
        },
        multiple: true,
      }}
      imageConfig={{
        minWidth: 100,
        maxWidth: 2000,
        minHeight: 100,
        maxHeight: 2000,
        aspectRatio: 1, // Square images
        aspectRatioTolerance: 0.1,
      }}
      callbacks={{
        onFilesAdded: handleFilesAdded,
      }}
      uploadFunction={uploadFunction}
    />
  );
}
```

## Configuration

### FileUploadConfig

```tsx
interface FileUploadConfig {
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files that can be uploaded */
  maxFiles?: number;
  /** Accepted file types (MIME types) */
  accept?: Record<string, string[]>;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Whether to disable the uploader */
  disabled?: boolean;
}
```

### ImageDimensionConfig

```tsx
interface ImageDimensionConfig {
  /** Minimum width in pixels */
  minWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels */
  maxHeight?: number;
  /** Required aspect ratio (width/height) */
  aspectRatio?: number;
  /** Tolerance for aspect ratio validation (default: 0.1) */
  aspectRatioTolerance?: number;
}
```

## Components

### FileUpload

The main component that provides the drag and drop interface and file management.

**Props:**

- `config`: FileUploadConfig - Upload configuration
- `imageConfig`: ImageDimensionConfig - Image validation rules
- `callbacks`: FileUploadCallbacks - Event handlers
- `uploadFunction`: (file: File) => Promise<any> - Custom upload function
- `customValidation`: (file: File) => Promise<FileValidationResult> - Custom validation
- `showPreviews`: boolean - Show file previews (default: true)
- `showProgress`: boolean - Show upload progress (default: true)
- `allowRemove`: boolean - Allow file removal (default: true)

### FilePreview

Individual file preview component with image thumbnails and file information.

### FilePreviewGrid

Grid layout for displaying multiple file previews.

### UploadProgress

Progress indicator for individual files or overall upload progress.

## Hooks

### useFileUpload

Custom hook that provides all the file upload logic and state management.

```tsx
const {
  files,
  isProcessing,
  isUploading,
  isDragActive,
  processFiles,
  removeFile,
  uploadFile,
  uploadAllFiles,
  clearAllFiles,
  getRootProps,
  getInputProps,
} = useFileUpload({
  config,
  imageConfig,
  callbacks,
  uploadFunction,
  customValidation,
});
```

## Callbacks

```tsx
interface FileUploadCallbacks {
  onFilesAdded?: (files: FileMetadata[]) => void;
  onFilesRemoved?: (fileIds: string[]) => void;
  onValidationError?: (file: FileMetadata, errors: string[]) => void;
  onUploadStart?: (files: FileMetadata[]) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  onUploadComplete?: (fileId: string, result: any) => void;
  onUploadError?: (fileId: string, error: Error) => void;
  onAllUploadsComplete?: (
    results: Array<{ fileId: string; result: any }>
  ) => void;
}
```

## File Types

The component includes predefined file type configurations:

```tsx
import { DEFAULT_FILE_TYPES } from '@/components/file-upload';

// Available types: image, pdf, document, video, audio
const imageConfig = DEFAULT_FILE_TYPES.image;
```

## Validation

### Built-in Validation

- File size limits
- File type restrictions
- Image dimension validation
- Aspect ratio checking

### Custom Validation

```tsx
const customValidation = async (file: File): Promise<FileValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Your custom validation logic
  if (file.name.includes('test')) {
    warnings.push('File name contains "test"');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};
```

## Accessibility

The component is fully accessible with:

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Announcements**: Screen reader announcements for validation errors
- **High Contrast**: Works with high contrast themes

## Styling

The component uses shadcn/ui components and can be customized with:

- CSS custom properties
- Tailwind CSS classes
- Custom className props
- Theme variants

## Error Handling

Comprehensive error handling for:

- Network failures
- File validation errors
- Upload timeouts
- Server errors
- File processing errors

## Performance

Optimized for performance with:

- Lazy loading of image previews
- Efficient file processing
- Memory management for large files
- Debounced validation
- Cancellable uploads

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Examples

### Basic Image Upload

```tsx
<FileUpload
  config={{
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    multiple: false,
  }}
  imageConfig={{
    minWidth: 480,
    maxWidth: 480,
    minHeight: 480,
    maxHeight: 480,
    aspectRatio: 1,
  }}
/>
```

### Document Upload

```tsx
<FileUpload
  config={{
    maxSize: 25 * 1024 * 1024, // 25MB
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 10,
  }}
/>
```

### Custom Upload Function

```tsx
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'my_preset');

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/my_cloud/image/upload',
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
};

<FileUpload
  config={{ maxSize: 10 * 1024 * 1024 }}
  uploadFunction={uploadToCloudinary}
/>;
```

## Demo

Visit `/demo/file-upload` to see the component in action with various configurations and examples.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
