import { MetadataRoute } from 'next';
import { generateSitemapData } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = generateSitemapData();

  // Add blog posts to sitemap (in a real app, you'd fetch these from your CMS/database)
  const blogPosts = [
    {
      url: 'https://boundlessfi.xyz/blog/getting-started-with-boundless',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://boundlessfi.xyz/blog/milestone-based-funding-guide',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://boundlessfi.xyz/blog/stellar-blockchain-benefits',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [...basePages, ...blogPosts];
}
