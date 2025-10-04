import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostsStreaming } from '@/lib/data/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'latest';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    const result = await getBlogPostsStreaming(page, limit);

    let filteredPosts = result.posts;

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (tags && tags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        tags.some(tag => post.tags.includes(tag))
      );
    }

    if (sort === 'latest') {
      filteredPosts.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sort === 'oldest') {
      filteredPosts.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        posts: filteredPosts,
      },
      message: 'Blog posts fetched successfully',
      timestamp: new Date().toISOString(),
      path: '/api/blog/posts',
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
        timestamp: new Date().toISOString(),
        path: '/api/blog/posts',
      },
      { status: 500 }
    );
  }
}
