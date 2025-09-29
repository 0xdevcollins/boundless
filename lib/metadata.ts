import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface BlogPostMetadata extends PageMetadata {
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  category?: string;
}

// Base metadata configuration
const baseMetadata = {
  siteName: 'Boundless',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://boundlessfi.xyz',
  defaultOgImage: '/og-image-placeholder.png',
  defaultDescription:
    'Validate, fund, and grow your project with milestone-based support on Stellar.',
};

// Page-specific metadata
export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'Boundless - Ideas Made Boundless',
    description:
      'Validate, fund, and grow your project with milestone-based support on Stellar.',
    keywords: [
      'crowdfunding',
      'stellar',
      'blockchain',
      'projects',
      'funding',
      'milestones',
    ],
    ogImage:
      'https://res.cloudinary.com/danuy5rqb/image/upload/v1759143589/bondless-og-image_jufgnu.png',
  },
  about: {
    title: 'About Us - Boundless',
    description:
      'Learn about Boundless and our mission to make ideas boundless through milestone-based funding on Stellar.',
    keywords: ['about', 'mission', 'team', 'vision', 'boundless'],
    ogImage: '/about-og.png',
  },
  projects: {
    title: 'Projects - Boundless',
    description:
      'Discover innovative projects and campaigns on Boundless. Support creators and bring ideas to life.',
    keywords: [
      'projects',
      'campaigns',
      'crowdfunding',
      'creators',
      'innovation',
    ],
    ogImage: '/campaign-pics.png',
  },
  grants: {
    title: 'Grants - Boundless',
    description:
      'Apply for grants and funding opportunities on Boundless. Turn your ideas into reality.',
    keywords: ['grants', 'funding', 'opportunities', 'apply', 'support'],
    ogImage: '/grants-og.png',
  },
  hackathons: {
    title: 'Hackathons - Boundless',
    description:
      'Join exciting hackathons and coding challenges on Boundless. Build, innovate, and win.',
    keywords: [
      'hackathons',
      'coding',
      'challenges',
      'innovation',
      'competition',
    ],
    ogImage: '/hackathons-og.png',
  },
  contact: {
    title: 'Contact Us - Boundless',
    description:
      "Get in touch with the Boundless team. We're here to help with your questions and feedback.",
    keywords: ['contact', 'support', 'help', 'feedback', 'questions'],
    ogImage: '/contact-og.png',
  },
  privacy: {
    title: 'Privacy Policy - Boundless',
    description:
      'Learn about how Boundless protects your privacy and handles your personal information.',
    keywords: ['privacy', 'policy', 'data protection', 'personal information'],
    ogImage: '/privacy-og.png',
  },
  terms: {
    title: 'Terms of Service - Boundless',
    description:
      'Read the terms and conditions for using Boundless services and platform.',
    keywords: ['terms', 'service', 'conditions', 'agreement', 'legal'],
    ogImage: '/terms-og.png',
  },
  disclaimer: {
    title: 'Disclaimer - Boundless',
    description:
      'Important disclaimers and legal information about using the Boundless platform.',
    keywords: ['disclaimer', 'legal', 'information', 'terms'],
    ogImage: '/disclaimer-og.png',
  },
  codeOfConduct: {
    title: 'Code of Conduct - Boundless',
    description:
      'Our community guidelines and code of conduct for maintaining a respectful environment.',
    keywords: [
      'code of conduct',
      'community',
      'guidelines',
      'respect',
      'behavior',
    ],
    ogImage: '/conduct-og.png',
  },
  waitlist: {
    title: 'Join Waitlist - Boundless',
    description:
      'Join the Boundless waitlist and be among the first to experience the future of project funding.',
    keywords: ['waitlist', 'early access', 'beta', 'signup', 'exclusive'],
    ogImage: '/waitlist-og.png',
  },
  blog: {
    title: 'Blog - Boundless',
    description:
      'Read the latest insights, updates, and stories from the Boundless community.',
    keywords: ['blog', 'insights', 'updates', 'community', 'news', 'articles'],
    ogImage: '/blog-og.png',
  },
};

// Blog metadata template
export const blogMetadata: Record<string, BlogPostMetadata> = {
  default: {
    title: 'Blog - Boundless',
    description:
      'Read the latest insights, updates, and stories from the Boundless community.',
    keywords: ['blog', 'insights', 'updates', 'community', 'news'],
    ogImage: '/blog-og.png',
    category: 'general',
  },
};

// Generate metadata for a specific page
export function generatePageMetadata(
  pageKey: string,
  customMetadata?: Partial<PageMetadata>
): Metadata {
  const pageMeta = pageMetadata[pageKey] || pageMetadata.home;
  const finalMetadata = { ...pageMeta, ...customMetadata };

  return {
    title: finalMetadata.title,
    description: finalMetadata.description,
    keywords: finalMetadata.keywords?.join(', '),
    openGraph: {
      title: finalMetadata.title,
      description: finalMetadata.description,
      type: 'website',
      url: `${baseMetadata.siteUrl}/${pageKey === 'home' ? '' : pageKey}`,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: finalMetadata.ogImage || baseMetadata.defaultOgImage,
          width: 1200,
          height: 630,
          alt: finalMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalMetadata.title,
      description: finalMetadata.description,
      images: [finalMetadata.ogImage || baseMetadata.defaultOgImage],
    },
    alternates: {
      canonical:
        finalMetadata.canonical ||
        `${baseMetadata.siteUrl}/${pageKey === 'home' ? '' : pageKey}`,
    },
  };
}

// Generate metadata for blog posts
export function generateBlogMetadata(
  post: BlogPostMetadata,
  slug: string
): Metadata {
  const blogMeta = blogMetadata.default;
  const finalMetadata = { ...blogMeta, ...post };

  return {
    title: finalMetadata.title,
    description: finalMetadata.description,
    keywords: finalMetadata.keywords?.join(', '),
    authors: finalMetadata.author
      ? [{ name: finalMetadata.author }]
      : undefined,
    openGraph: {
      title: finalMetadata.title,
      description: finalMetadata.description,
      type: 'article',
      url: `${baseMetadata.siteUrl}/blog/${slug}`,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: finalMetadata.ogImage || baseMetadata.defaultOgImage,
          width: 1200,
          height: 630,
          alt: finalMetadata.title,
        },
      ],
      publishedTime: finalMetadata.publishedTime,
      modifiedTime: finalMetadata.modifiedTime,
      tags: finalMetadata.tags,
      section: finalMetadata.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalMetadata.title,
      description: finalMetadata.description,
      images: [finalMetadata.ogImage || baseMetadata.defaultOgImage],
    },
    alternates: {
      canonical:
        finalMetadata.canonical || `${baseMetadata.siteUrl}/blog/${slug}`,
    },
  };
}

// Generate metadata for individual blog posts
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  image: string;
  author: { name: string };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}): Metadata {
  const title = post.seo?.metaTitle || `${post.title} | Boundless Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  const keywords = post.seo?.keywords || post.tags;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseMetadata.siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
    alternates: {
      canonical: `${baseMetadata.siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

// Generate sitemap data
export function generateSitemapData() {
  const pages = Object.keys(pageMetadata).map(page => ({
    url: `${baseMetadata.siteUrl}/${page === 'home' ? '' : page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === 'home' ? 1 : 0.8,
  }));

  return pages;
}
