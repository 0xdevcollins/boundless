import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/dashboard/', '/user/'],
    },
    sitemap: 'https://boundlessfi.xyz/sitemap.xml',
  };
}
