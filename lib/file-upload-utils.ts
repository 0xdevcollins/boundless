import { FileValidationResult, FileMetadata } from '@/types/file-upload';

/**
 * Utility functions for file upload operations
 */

export class FileUploadError extends Error {
  constructor(
    message: string,
    public code: string,
    public fileId?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export const FILE_UPLOAD_ERROR_CODES = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  INVALID_IMAGE_DIMENSIONS: 'INVALID_IMAGE_DIMENSIONS',
  INVALID_ASPECT_RATIO: 'INVALID_ASPECT_RATIO',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MAX_FILES_EXCEEDED: 'MAX_FILES_EXCEEDED',
  PROCESSING_ERROR: 'PROCESSING_ERROR',
} as const;

export type FileUploadErrorCode =
  (typeof FILE_UPLOAD_ERROR_CODES)[keyof typeof FILE_UPLOAD_ERROR_CODES];

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename
    .slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
    .toLowerCase();
}

/**
 * Check if file is an image based on MIME type
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Check if file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf';
}

/**
 * Check if file is a document (Word, Excel, PowerPoint, etc.)
 */
export function isDocumentFile(file: File): boolean {
  const documentTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
  ];
  return documentTypes.includes(file.type);
}

/**
 * Validate file size
 */
export function validateFileSize(
  file: File,
  maxSize: number
): FileValidationResult {
  if (file.size > maxSize) {
    return {
      isValid: false,
      errors: [
        `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`,
      ],
      warnings: [],
    };
  }
  return { isValid: true, errors: [], warnings: [] };
}

/**
 * Validate file type
 */
export function validateFileType(
  file: File,
  acceptedTypes: Record<string, string[]>
): FileValidationResult {
  const acceptedMimeTypes = Object.values(acceptedTypes).flat();

  if (!acceptedMimeTypes.includes(file.type)) {
    return {
      isValid: false,
      errors: [`File type ${file.type} is not allowed`],
      warnings: [],
    };
  }
  return { isValid: true, errors: [], warnings: [] };
}

/**
 * Validate image dimensions
 */
export function validateImageDimensions(
  width: number,
  height: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  aspectRatio?: number,
  aspectRatioTolerance: number = 0.1
): FileValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (minWidth && width < minWidth) {
    errors.push(`Image width (${width}px) is below minimum (${minWidth}px)`);
  }

  if (maxWidth && width > maxWidth) {
    errors.push(`Image width (${width}px) exceeds maximum (${maxWidth}px)`);
  }

  if (minHeight && height < minHeight) {
    errors.push(`Image height (${height}px) is below minimum (${minHeight}px)`);
  }

  if (maxHeight && height > maxHeight) {
    errors.push(`Image height (${height}px) exceeds maximum (${maxHeight}px)`);
  }

  if (aspectRatio) {
    const actualRatio = width / height;
    const ratioDiff = Math.abs(actualRatio - aspectRatio);
    if (ratioDiff > aspectRatioTolerance) {
      errors.push(
        `Image aspect ratio (${actualRatio.toFixed(2)}) does not match required ratio (${aspectRatio.toFixed(2)})`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number; aspectRatio: number }> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(
        new FileUploadError(
          'File is not an image',
          FILE_UPLOAD_ERROR_CODES.INVALID_FILE_TYPE
        )
      );
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const dimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      };
      resolve(dimensions);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new FileUploadError(
          'Failed to load image',
          FILE_UPLOAD_ERROR_CODES.PROCESSING_ERROR
        )
      );
    };

    img.src = url;
  });
}

/**
 * Create a unique file ID
 */
export function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  // Remove or replace dangerous characters
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Get file type category
 */
export function getFileTypeCategory(
  file: File
): 'image' | 'pdf' | 'document' | 'video' | 'audio' | 'other' {
  if (isImageFile(file)) return 'image';
  if (isPdfFile(file)) return 'pdf';
  if (isDocumentFile(file)) return 'document';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'other';
}

/**
 * Create file metadata object
 */
export function createFileMetadata(
  file: File
): Omit<
  FileMetadata,
  'id' | 'dimensions' | 'previewUrl' | 'status' | 'validation'
> {
  return {
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    extension: getFileExtension(file.name),
    isImage: isImageFile(file),
  };
}

/**
 * Retry upload with exponential backoff
 */
export async function retryUpload<T>(
  uploadFunction: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await uploadFunction();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new FileUploadError(
    `Upload failed after ${maxRetries + 1} attempts`,
    FILE_UPLOAD_ERROR_CODES.UPLOAD_FAILED,
    undefined,
    lastError!
  );
}

/**
 * Create upload progress tracker
 */
export function createProgressTracker(
  onProgress: (progress: number) => void,
  totalSize: number
) {
  let loaded = 0;

  return {
    update: (bytesLoaded: number) => {
      loaded = bytesLoaded;
      const progress = Math.round((loaded / totalSize) * 100);
      onProgress(Math.min(progress, 100));
    },
    getProgress: () => Math.round((loaded / totalSize) * 100),
    isComplete: () => loaded >= totalSize,
  };
}

/**
 * Validate multiple files
 */
export async function validateFiles(
  files: File[],
  config: {
    maxSize?: number;
    maxFiles?: number;
    accept?: Record<string, string[]>;
    imageConfig?: {
      minWidth?: number;
      maxWidth?: number;
      minHeight?: number;
      maxHeight?: number;
      aspectRatio?: number;
      aspectRatioTolerance?: number;
    };
  }
): Promise<
  Array<{ file: File; validation: FileValidationResult; dimensions?: any }>
> {
  const results = [];

  for (const file of files) {
    const validation: FileValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };
    let dimensions;

    // Validate file size
    if (config.maxSize) {
      const sizeValidation = validateFileSize(file, config.maxSize);
      validation.errors.push(...sizeValidation.errors);
      validation.warnings.push(...sizeValidation.warnings);
    }

    // Validate file type
    if (config.accept) {
      const typeValidation = validateFileType(file, config.accept);
      validation.errors.push(...typeValidation.errors);
      validation.warnings.push(...typeValidation.warnings);
    }

    // Validate image dimensions
    if (isImageFile(file) && config.imageConfig) {
      try {
        dimensions = await getImageDimensions(file);
        const dimensionValidation = validateImageDimensions(
          dimensions.width,
          dimensions.height,
          config.imageConfig.minWidth,
          config.imageConfig.maxWidth,
          config.imageConfig.minHeight,
          config.imageConfig.maxHeight,
          config.imageConfig.aspectRatio,
          config.imageConfig.aspectRatioTolerance
        );
        validation.errors.push(...dimensionValidation.errors);
        validation.warnings.push(...dimensionValidation.warnings);
      } catch (error) {
        validation.errors.push(
          `Failed to validate image dimensions: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    validation.isValid = validation.errors.length === 0;
    results.push({ file, validation, dimensions });
  }

  return results;
}

/**
 * Error message formatter
 */
export function formatErrorMessage(error: Error | FileUploadError): string {
  if (error instanceof FileUploadError) {
    switch (error.code) {
      case FILE_UPLOAD_ERROR_CODES.FILE_TOO_LARGE:
        return 'File is too large. Please choose a smaller file.';
      case FILE_UPLOAD_ERROR_CODES.INVALID_FILE_TYPE:
        return 'File type is not supported. Please choose a different file.';
      case FILE_UPLOAD_ERROR_CODES.INVALID_IMAGE_DIMENSIONS:
        return 'Image dimensions are not valid. Please check the requirements.';
      case FILE_UPLOAD_ERROR_CODES.INVALID_ASPECT_RATIO:
        return 'Image aspect ratio is not correct. Please check the requirements.';
      case FILE_UPLOAD_ERROR_CODES.UPLOAD_FAILED:
        return 'Upload failed. Please try again.';
      case FILE_UPLOAD_ERROR_CODES.NETWORK_ERROR:
        return 'Network error. Please check your connection and try again.';
      case FILE_UPLOAD_ERROR_CODES.MAX_FILES_EXCEEDED:
        return 'Too many files. Please remove some files and try again.';
      default:
        return error.message;
    }
  }
  return error.message;
}
