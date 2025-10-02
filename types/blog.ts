export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
  icon: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
}

export interface GetBlogPostsRequest {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'popular';
  tags?: string[];
}

export interface GetRelatedPostsRequest {
  limit?: number;
}

export interface SearchBlogPostsRequest {
  q: string;
  page?: number;
  limit?: number;
  category?: string;
  tags?: string[];
}

export interface GetBlogPostsResponse {
  posts: BlogPost[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface GetBlogPostResponse {
  post: BlogPost;
}

export interface GetRelatedPostsResponse {
  posts: BlogPost[];
}

export interface GetCategoriesResponse {
  categories: BlogCategory[];
}

export interface GetTagsResponse {
  tags: BlogTag[];
}

export interface SearchBlogPostsResponse {
  posts: BlogPost[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
  query: string;
}

export interface BlogApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}
