export interface CommentUser {
  _id: string;
  profile: {
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string;
  };
}

export interface CommentReactionCounts {
  LIKE: number;
  DISLIKE: number;
  HELPFUL: number;
}

export interface CommentEditHistory {
  content: string;
  editedAt: string;
}

export interface CommentReport {
  userId: string;
  reason: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';
  description?: string;
  createdAt: string;
}

export interface ProjectComment {
  _id: string;
  userId: CommentUser;
  projectId: string;
  content: string;
  parentCommentId?: string;
  status: 'active' | 'deleted' | 'flagged' | 'hidden';
  editHistory: CommentEditHistory[];
  reactionCounts: CommentReactionCounts;
  totalReactions: number;
  replyCount: number;
  replies?: ProjectComment[]; // Nested replies
  createdAt: string;
  updatedAt: string;
  isSpam: boolean;
  reports: CommentReport[];
}

export interface ModerationResult {
  flagged: boolean;
  reason?: string;
}

export interface CreateCommentRequest {
  content: string;
  parentCommentId?: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface ReportCommentRequest {
  reason: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';
  description?: string;
}

export interface GetCommentsQuery {
  page?: number;
  limit?: number;
  parentCommentId?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'totalReactions';
  sortOrder?: 'asc' | 'desc';
}

// Response Types
export interface CreateCommentResponse {
  success: boolean;
  data: {
    comment: ProjectComment;
    moderationResult: ModerationResult;
  };
  message: string;
  timestamp: string;
  path: string;
}

export interface GetCommentsResponse {
  success: boolean;
  data: {
    comments: ProjectComment[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    filters: {
      parentCommentId?: string;
      sortBy: string;
      sortOrder: string;
    };
  };
  message: string;
  timestamp: string;
  path: string;
}

export interface UpdateCommentResponse {
  success: boolean;
  data: {
    comment: ProjectComment;
    moderationResult: ModerationResult;
  };
  message: string;
  timestamp: string;
  path: string;
}

export interface DeleteCommentResponse {
  success: boolean;
  data: null;
  message: string;
  timestamp: string;
  path: string;
}

export interface ReportCommentResponse {
  success: boolean;
  data: null;
  message: string;
  timestamp: string;
  path: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

export type CommentApiResponse =
  | CreateCommentResponse
  | GetCommentsResponse
  | UpdateCommentResponse
  | DeleteCommentResponse
  | ReportCommentResponse
  | ApiErrorResponse;

// Hook Types for React/Next.js
export interface UseCommentsOptions {
  projectId: string;
  page?: number;
  limit?: number;
  parentCommentId?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'totalReactions';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

export interface UseCommentsReturn {
  comments: ProjectComment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading: boolean;
  error: string | null;
  refetch: () => void;
  loadMore: () => void;
  pausePolling: () => void;
  resumePolling: () => void;
  isPolling: boolean;
}

export interface UseCreateCommentReturn {
  createComment: (data: CreateCommentRequest) => Promise<CreateCommentResponse>;
  loading: boolean;
  error: string | null;
}

export interface UseUpdateCommentReturn {
  updateComment: (
    commentId: string,
    data: UpdateCommentRequest
  ) => Promise<UpdateCommentResponse>;
  loading: boolean;
  error: string | null;
}

export interface UseDeleteCommentReturn {
  deleteComment: (commentId: string) => Promise<DeleteCommentResponse>;
  loading: boolean;
  error: string | null;
}

export interface UseReportCommentReturn {
  reportComment: (
    commentId: string,
    data: ReportCommentRequest
  ) => Promise<ReportCommentResponse>;
  loading: boolean;
  error: string | null;
}
