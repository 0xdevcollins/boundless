import api from './api';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  DeleteCommentResponse,
  ReportCommentRequest,
  ReportCommentResponse,
} from '@/types/comment';

/**
 * Get comments for a project with pagination and filtering
 */
export const getComments = async (
  projectId: string,
  page = 1,
  limit = 10,
  filters?: {
    parentCommentId?: string;
    sortBy?: 'createdAt' | 'updatedAt' | 'totalReactions';
    sortOrder?: 'asc' | 'desc';
  }
): Promise<GetCommentsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.parentCommentId) {
    params.append('parentCommentId', filters.parentCommentId);
  }

  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }

  if (filters?.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }

  const res = await api.get(
    `/projects/${projectId}/comments?${params.toString()}`
  );
  return res.data;
};

/**
 * Create a new comment
 */
export const createComment = async (
  projectId: string,
  data: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  const res = await api.post(`/projects/${projectId}/comments`, data);
  return res.data;
};

/**
 * Update an existing comment
 */
export const updateComment = async (
  projectId: string,
  commentId: string,
  data: UpdateCommentRequest
): Promise<UpdateCommentResponse> => {
  const res = await api.put(
    `/projects/${projectId}/comments/${commentId}`,
    data
  );
  return res.data;
};

/**
 * Delete a comment
 */
export const deleteComment = async (
  projectId: string,
  commentId: string
): Promise<DeleteCommentResponse> => {
  const res = await api.delete(`/projects/${projectId}/comments/${commentId}`);
  return res.data;
};

/**
 * Report a comment
 */
export const reportComment = async (
  projectId: string,
  commentId: string,
  data: ReportCommentRequest
): Promise<ReportCommentResponse> => {
  const res = await api.post(
    `/projects/${projectId}/comments/${commentId}/report`,
    data
  );
  return res.data;
};
