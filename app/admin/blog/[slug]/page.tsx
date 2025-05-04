import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogEditor } from '@/components/admin/BlogEditor';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${slug}`);
  const post = await response.json();

  const previousMetadata = (await parent).openGraph?.images || [];

  if (!post) {
    return {
      title: 'Post Not Found | Boundless Admin',
    };
  }

  return {
    title: `Edit ${post.title} | Boundless Admin`,
    description: 'Edit blog post.',
    openGraph: {
      images: [...previousMetadata, post.featuredImage],
    },
  };
}

export default async function EditBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${slug}`);
  const post = await response.json();

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
        <p className="text-muted-foreground">Edit and update the blog post.</p>
      </div>
      <BlogEditor post={post} />
    </main>
  );
}
