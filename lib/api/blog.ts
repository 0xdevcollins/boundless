import api from './api';
import {
  getRelatedPosts as getRelatedPostsData,
  BlogPost as DataBlogPost,
} from '@/lib/data/blog';
import {
  BlogPost,
  BlogCategory,
  BlogTag,
  GetBlogPostsRequest,
  GetBlogPostsResponse,
  GetRelatedPostsRequest,
  GetCategoriesResponse,
  GetTagsResponse,
  SearchBlogPostsRequest,
  SearchBlogPostsResponse,
  BlogApiError,
} from '@/types/blog';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  path: string;
}

/**
 * Convert data layer BlogPost to API layer BlogPost
 */
const convertDataBlogPost = (dataPost: DataBlogPost): BlogPost => ({
  ...dataPost,
  id: dataPost.id.toString(),
  publishedAt: dataPost.date, // Map date to publishedAt
});

/**
 * Get paginated blog posts with filtering and sorting
 */
export const getBlogPosts = async (
  params: GetBlogPostsRequest = {}
): Promise<GetBlogPostsResponse> => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sort = 'latest',
      tags,
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    if (category) {
      queryParams.append('category', category);
    }

    if (search) {
      queryParams.append('search', search);
    }

    if (tags && tags.length > 0) {
      queryParams.append('tags', tags.join(','));
    }

    const response = await api.get<ApiResponse<GetBlogPostsResponse>>(
      `/blog/posts?${queryParams.toString()}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch blog posts: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Get a single blog post by slug
 */
export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  try {
    const response = await api.get<ApiResponse<BlogPost>>(
      `/blog/posts/${slug}`
    );
    return response.data.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      throw new Error(`Blog post with slug "${slug}" not found`);
    }
    throw new Error(
      `Failed to fetch blog post: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Get related blog posts for a specific post
 */
export const getRelatedPosts = async (
  slug: string,
  params: GetRelatedPostsRequest = {}
): Promise<BlogPost[]> => {
  try {
    const { limit = 3 } = params;

    // Use the data layer function instead of making an HTTP request
    const dataPosts = await getRelatedPostsData(slug, limit);
    return dataPosts.map(convertDataBlogPost);
  } catch (error) {
    throw new Error(
      `Failed to fetch related posts: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Get all blog categories with post counts
 */
export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const response =
      await api.get<ApiResponse<GetCategoriesResponse>>('/blog/categories');

    return response.data.data.categories;
  } catch (error) {
    throw new Error(
      `Failed to fetch blog categories: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Get all blog tags with post counts
 */
export const getBlogTags = async (): Promise<BlogTag[]> => {
  try {
    const response = await api.get<ApiResponse<GetTagsResponse>>('/blog/tags');

    return response.data.data.tags;
  } catch (error) {
    throw new Error(
      `Failed to fetch blog tags: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Search blog posts with full-text search
 */
export const searchBlogPosts = async (
  params: SearchBlogPostsRequest
): Promise<SearchBlogPostsResponse> => {
  try {
    const { q, page = 1, limit = 12, category, tags } = params;

    if (!q || q.trim().length === 0) {
      throw new Error('Search query is required');
    }

    const queryParams = new URLSearchParams({
      q: q.trim(),
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category) {
      queryParams.append('category', category);
    }

    if (tags && tags.length > 0) {
      queryParams.append('tags', tags.join(','));
    }

    const response = await api.get<ApiResponse<SearchBlogPostsResponse>>(
      `/blog/search?${queryParams.toString()}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error(
      `Failed to search blog posts: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

/**
 * Utility function to build query parameters for blog requests
 */
export const buildBlogQueryParams = (
  params: Record<string, unknown>
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(','));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return queryParams.toString();
};

/**
 * Utility function to validate blog post slug
 */
export const validateBlogSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
};

/**
 * Utility function to sanitize search query
 */
export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().replace(/[<>]/g, '').substring(0, 100);
};

/**
 * Error handling utilities
 */
export const handleBlogApiError = (error: unknown): BlogApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
      code: 'INTERNAL_ERROR',
    };
  }

  return {
    message: 'An unknown error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR',
  };
};

/**
 * Check if an error is a blog API error
 */
export const isBlogApiError = (error: unknown): error is BlogApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error
  );
};
