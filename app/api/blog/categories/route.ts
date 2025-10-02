import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/data/blog';

export async function GET() {
  try {
    const allPosts = await getAllBlogPosts();

    const categoryMap = new Map<string, number>();

    allPosts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    const categories = Array.from(categoryMap.entries()).map(
      ([name, postCount]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: `Posts in ${name} category`,
        postCount,
        color: '#A7F950',
        icon: '📁',
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        categories,
      },
      message: 'Categories fetched successfully',
      timestamp: new Date().toISOString(),
      path: '/api/blog/categories',
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        timestamp: new Date().toISOString(),
        path: '/api/blog/categories',
      },
      { status: 500 }
    );
  }
}
