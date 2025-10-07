'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ProjectComment,
  CreateCommentRequest,
  UpdateCommentRequest,
  ReportCommentRequest,
  CreateCommentResponse,
  UpdateCommentResponse,
  DeleteCommentResponse,
  ReportCommentResponse,
  UseCommentsOptions,
  UseCommentsReturn,
  UseCreateCommentReturn,
  UseUpdateCommentReturn,
  UseDeleteCommentReturn,
  UseReportCommentReturn,
} from '@/types/comment';
import {
  getComments,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  reportComment as reportCommentApi,
} from '@/lib/api/comment';

// Cache for comments to avoid duplicate requests
const commentsCache = new Map<
  string,
  { data: { comments: ProjectComment[]; pagination: any }; timestamp: number }
>();
const CACHE_DURATION = 30000; // 30 seconds

// Function to invalidate cache for a specific project
export const invalidateCommentsCache = (projectId: string) => {
  const keysToDelete: string[] = [];
  for (const key of commentsCache.keys()) {
    if (key.startsWith(projectId)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(key => commentsCache.delete(key));
};

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
  const [hasInitialized, setHasInitialized] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestRef = useRef<string>('');

  const fetchComments = useCallback(
    async (forceRefresh = false) => {
      if (!options.enabled) return;

      // Create cache key
      const cacheKey = `${options.projectId}-${options.page || 1}-${options.limit || 10}-${options.parentCommentId || 'root'}-${options.sortBy || 'createdAt'}-${options.sortOrder || 'desc'}`;

      // Check if we have a recent request for the same parameters
      if (lastRequestRef.current === cacheKey && !forceRefresh) {
        return;
      }

      // Check cache first
      const cached = commentsCache.get(cacheKey);
      if (
        cached &&
        !forceRefresh &&
        Date.now() - cached.timestamp < CACHE_DURATION
      ) {
        setComments(cached.data.comments);
        setPagination(cached.data.pagination);
        return;
      }

      // Clear any existing debounce timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Debounce the request
      debounceTimeoutRef.current = setTimeout(async () => {
        setLoading(true);
        setError(null);
        lastRequestRef.current = cacheKey;

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

          // Cache the response
          commentsCache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
          });

          setComments(response.data.comments);
          setPagination(response.data.pagination);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Failed to fetch comments'
          );
        } finally {
          setLoading(false);
        }
      }, 300); // 300ms debounce
    },
    [
      options.projectId,
      options.page,
      options.limit,
      options.parentCommentId,
      options.sortBy,
      options.sortOrder,
      options.enabled,
    ]
  );

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

  // Only fetch on initial mount and when key dependencies change
  useEffect(() => {
    if (!hasInitialized && options.enabled) {
      fetchComments(true); // Force refresh on initial load
      setHasInitialized(true);
    }
  }, [options.enabled, hasInitialized, fetchComments]);

  // Refetch when key parameters change (but not on every render)
  useEffect(() => {
    if (hasInitialized) {
      fetchComments(true); // Force refresh when parameters change
    }
  }, [
    options.projectId,
    options.parentCommentId,
    options.sortBy,
    options.sortOrder,
    hasInitialized,
    fetchComments,
  ]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const refetch = useCallback(() => {
    fetchComments(true); // Force refresh
  }, [fetchComments]);

  return {
    comments,
    pagination,
    loading,
    error,
    refetch,
    loadMore,
  };
};

// Hook for creating comments
export const useCreateComment = (): UseCreateCommentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(
    async (data: CreateCommentRequest): Promise<CreateCommentResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Note: projectId should be passed from the component using this hook
        const response = await createCommentApi('', data); // This will be overridden in useCommentManagement
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create comment';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    createComment,
    loading,
    error,
  };
};

// Hook for updating comments
export const useUpdateComment = (): UseUpdateCommentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = useCallback(
    async (
      commentId: string,
      data: UpdateCommentRequest
    ): Promise<UpdateCommentResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Note: projectId should be passed from the component using this hook
        const response = await updateCommentApi('', commentId, data); // This will be overridden in useCommentManagement
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update comment';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    updateComment,
    loading,
    error,
  };
};

// Hook for deleting comments
export const useDeleteComment = (): UseDeleteCommentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = useCallback(
    async (commentId: string): Promise<DeleteCommentResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Note: projectId should be passed from the component using this hook
        const response = await deleteCommentApi('', commentId); // This will be overridden in useCommentManagement
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete comment';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    deleteComment,
    loading,
    error,
  };
};

// Hook for reporting comments
export const useReportComment = (): UseReportCommentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportComment = useCallback(
    async (
      commentId: string,
      data: ReportCommentRequest
    ): Promise<ReportCommentResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Note: projectId should be passed from the component using this hook
        const response = await reportCommentApi('', commentId, data); // This will be overridden in useCommentManagement
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to report comment';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    reportComment,
    loading,
    error,
  };
};

// Utility hook for comment management
export const useCommentManagement = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(
    async (data: CreateCommentRequest) => {
      setLoading(true);
      setError(null);

      try {
        const response = await createCommentApi(projectId, data);
        // Invalidate cache after creating a comment
        invalidateCommentsCache(projectId);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create comment';
        setError(errorMessage);
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
        // Invalidate cache after updating a comment
        invalidateCommentsCache(projectId);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update comment';
        setError(errorMessage);
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
        // Invalidate cache after deleting a comment
        invalidateCommentsCache(projectId);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete comment';
        setError(errorMessage);
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
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to report comment';
        setError(errorMessage);
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
