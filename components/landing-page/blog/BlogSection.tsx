import { getAllBlogPosts } from '@/lib/data/blog';
import BlogSectionClient from './BlogSectionClient';

const BlogSection = async () => {
  const posts = await getAllBlogPosts();

  return <BlogSectionClient posts={posts} />;
};

export default BlogSection;
