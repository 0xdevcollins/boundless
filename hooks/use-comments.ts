'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ProjectComment,
  CreateCommentRequest,
  UpdateCommentRequest,
  ReportCommentRequest,
  UseCommentsOptions,
  UseCommentsReturn,
} from '@/types/comment';
import {
  getComments,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  reportComment as reportCommentApi,
} from '@/lib/api/comment';

// Hook for fetching comments
export const useComments = (options: UseCommentsOptions): UseCommentsReturn => {
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!options.enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getComments(
        options.projectId,
        options.page || 1,
        options.limit || 10,
        {
          parentCommentId: options.parentCommentId,
          sortBy: options.sortBy || 'createdAt',
          sortOrder: options.sortOrder || 'desc',
        }
      );

      setComments(response.data.comments);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  }, [
    options.projectId,
    options.page,
    options.limit,
    options.parentCommentId,
    options.sortBy,
    options.sortOrder,
    options.enabled,
  ]);

  const loadMore = useCallback(async () => {
    if (pagination.hasNext && !loading) {
      const nextPage = pagination.currentPage + 1;
      setLoading(true);
      setError(null);

      try {
        const response = await getComments(
          options.projectId,
          nextPage,
          options.limit || 10,
          {
            parentCommentId: options.parentCommentId,
            sortBy: options.sortBy || 'createdAt',
            sortOrder: options.sortOrder || 'desc',
          }
        );

        setComments(prev => [...prev, ...response.data.comments]);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load more comments'
        );
      } finally {
        setLoading(false);
      }
    }
  }, [
    options.projectId,
    options.limit,
    options.parentCommentId,
    options.sortBy,
    options.sortOrder,
    pagination.hasNext,
    pagination.currentPage,
    loading,
  ]);

  // Fetch comments on mount and when dependencies change
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!options.enabled) return;

    const interval = setInterval(() => {
      fetchComments();
    }, 5000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchComments, options.enabled]);

  const refetch = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    pagination,
    loading,
    error,
    refetch,
    loadMore,
    pausePolling: () => {}, // Simplified - no pause functionality
    resumePolling: () => {}, // Simplified - no resume functionality
    isPolling: !!options.enabled, // Always polling when enabled
  };
};

// Simple hook for comment management
export const useCommentManagement = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(
    async (data: CreateCommentRequest) => {
      setLoading(true);
      setError(null);
      try {
        const response = await createCommentApi(projectId, data);
        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to create comment'
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  const updateComment = useCallback(
    async (commentId: string, data: UpdateCommentRequest) => {
      setLoading(true);
      setError(null);
      try {
        const response = await updateCommentApi(projectId, commentId, data);
        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update comment'
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await deleteCommentApi(projectId, commentId);
        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to delete comment'
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  const reportComment = useCallback(
    async (commentId: string, data: ReportCommentRequest) => {
      setLoading(true);
      setError(null);
      try {
        const response = await reportCommentApi(projectId, commentId, data);
        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to report comment'
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  return {
    createComment,
    updateComment,
    deleteComment,
    reportComment,
    loading,
    error,
  };
};
