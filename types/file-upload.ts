export interface FileUploadConfig {
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

export interface ImageDimensionConfig {
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

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FileMetadata {
  /** File object */
  file: File;
  /** Unique identifier for the file */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** File type (MIME type) */
  type: string;
  /** File extension */
  extension: string;
  /** Whether the file is an image */
  isImage: boolean;
  /** Image dimensions (if applicable) */
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
  /** File preview URL (for images) */
  previewUrl?: string;
  /** Upload progress (0-100) */
  progress?: number;
  /** Upload status */
  status: 'pending' | 'uploading' | 'success' | 'error';
  /** Error message (if any) */
  error?: string;
  /** Validation result */
  validation?: FileValidationResult;
}

export interface FileUploadState {
  /** Array of uploaded files */
  files: FileMetadata[];
  /** Whether files are being processed */
  isProcessing: boolean;
  /** Whether files are being uploaded */
  isUploading: boolean;
  /** Current drag state */
  isDragActive: boolean;
  /** Whether the dropzone is disabled */
  isDisabled: boolean;
}

export interface FileUploadCallbacks {
  /** Called when files are added */
  onFilesAdded?: (files: FileMetadata[]) => void;
  /** Called when files are removed */
  onFilesRemoved?: (fileIds: string[]) => void;
  /** Called when file validation fails */
  onValidationError?: (file: FileMetadata, errors: string[]) => void;
  /** Called when upload starts */
  onUploadStart?: (files: FileMetadata[]) => void;
  /** Called when upload progress updates */
  onUploadProgress?: (fileId: string, progress: number) => void;
  /** Called when upload completes */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadComplete?: (fileId: string, result: any) => void;
  /** Called when upload fails */
  onUploadError?: (fileId: string, error: Error) => void;
  /** Called when all uploads complete */

  onAllUploadsComplete?: (
    results: Array<{ fileId: string; result: any }>
  ) => void;
}

export interface FileUploadProps {
  /** Upload configuration */
  config: FileUploadConfig;
  /** Image dimension validation (for image files) */
  imageConfig?: ImageDimensionConfig;
  /** Callback functions */
  callbacks?: FileUploadCallbacks;
  /** Custom upload function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadFunction?: (file: File) => Promise<any>;
  /** Custom validation function */
  customValidation?: (file: File) => Promise<FileValidationResult>;
  /** Custom className for styling */
  className?: string;
  /** Custom dropzone text */
  dropzoneText?: string;
  /** Custom dropzone subtext */
  dropzoneSubtext?: string;
  /** Whether to show file previews */
  showPreviews?: boolean;
  /** Whether to show upload progress */
  showProgress?: boolean;
  /** Whether to allow file removal */
  allowRemove?: boolean;
  /** Custom file size formatter */
  formatFileSize?: (bytes: number) => string;
}

export interface FilePreviewProps {
  /** File metadata */
  file: FileMetadata;
  /** Whether to show file info */
  showInfo?: boolean;
  /** Whether to show remove button */
  showRemove?: boolean;
  /** Callback when file is removed */
  onRemove?: (fileId: string) => void;
  /** Custom className */
  className?: string;
}

export interface UploadProgressProps {
  /** File metadata */
  file: FileMetadata;
  /** Custom className */
  className?: string;
}

// Utility types
export type FileType =
  | 'image'
  | 'document'
  | 'pdf'
  | 'video'
  | 'audio'
  | 'other';

export interface FileTypeConfig {
  type: FileType;
  mimeTypes: string[];
  extensions: string[];
  maxSize?: number;
  imageConfig?: ImageDimensionConfig;
}

export const DEFAULT_FILE_TYPES: Record<string, FileTypeConfig> = {
  image: {
    type: 'image',
    mimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  pdf: {
    type: 'pdf',
    mimeTypes: ['application/pdf'],
    extensions: ['.pdf'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
  document: {
    type: 'document',
    mimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
    ],
    extensions: [
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.txt',
      '.csv',
    ],
    maxSize: 25 * 1024 * 1024, // 25MB
  },
  video: {
    type: 'video',
    mimeTypes: [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/avi',
      'video/mov',
    ],
    extensions: ['.mp4', '.webm', '.ogg', '.avi', '.mov'],
    maxSize: 100 * 1024 * 1024, // 100MB
  },
  audio: {
    type: 'audio',
    mimeTypes: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'],
    extensions: ['.mp3', '.wav', '.ogg', '.mpeg'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
};
