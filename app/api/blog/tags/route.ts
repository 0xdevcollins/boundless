import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/data/blog';

export async function GET() {
  try {
    const allPosts = await getAllBlogPosts();

    const tagMap = new Map<string, number>();

    allPosts.forEach(post => {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });

    const tags = Array.from(tagMap.entries()).map(([name, postCount]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: `Posts tagged with ${name}`,
      postCount,
      color: '#A7F950',
    }));

    return NextResponse.json({
      success: true,
      data: {
        tags,
      },
      message: 'Tags fetched successfully',
      timestamp: new Date().toISOString(),
      path: '/api/blog/tags',
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tags',
        timestamp: new Date().toISOString(),
        path: '/api/blog/tags',
      },
      { status: 500 }
    );
  }
}
