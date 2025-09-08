# Dynamic Metadata & SEO System

This document explains how to use the new dynamic metadata and SEO system for the Boundless project.

## Overview

The system provides dynamic metadata generation for different pages and blog functionality, ensuring optimal SEO performance across the entire application.

## Features

- **Dynamic Page Metadata**: Each page gets unique, SEO-optimized metadata
- **Blog Support**: Specialized metadata handling for blog posts
- **Structured Data**: JSON-LD structured data for better search engine understanding
- **Sitemap Generation**: Automatic sitemap creation
- **Robots.txt**: Proper crawler control
- **Open Graph & Twitter Cards**: Social media optimization

## File Structure

```
lib/
├── metadata.ts              # Core metadata configuration and generation
├── structured-data.ts       # JSON-LD structured data utilities
app/
├── sitemap.ts              # Dynamic sitemap generation
├── robots.ts               # Robots.txt configuration
└── (landing)/
    ├── layout.tsx          # Landing layout with home page metadata
    ├── about/page.tsx      # About page with dynamic metadata
    ├── projects/page.tsx   # Projects page with dynamic metadata
    ├── blog/
    │   ├── page.tsx        # Blog listing with dynamic metadata
    │   └── [slug]/page.tsx # Individual blog posts with dynamic metadata
    └── ...                 # Other pages with dynamic metadata
components/
└── waitlist/
    └── WaitlistForm.tsx    # Client Component for interactive form
```

## Usage

### Basic Page Metadata

For any landing page, simply import and use the `generatePageMetadata` function:

```tsx
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return <div>About Page Content</div>;
};

export default AboutPage;
```

### Available Page Keys

The system supports these predefined page keys:

- `home` - Homepage
- `about` - About page
- `projects` - Projects page
- `grants` - Grants page
- `hackathons` - Hackathons page
- `contact` - Contact page
- `privacy` - Privacy policy
- `terms` - Terms of service
- `disclaimer` - Disclaimer
- `codeOfConduct` - Code of conduct
- `waitlist` - Waitlist page
- `blog` - Blog listing page

### Custom Page Metadata

You can override or extend the default metadata:

```tsx
export const metadata: Metadata = generatePageMetadata('about', {
  title: 'Custom About Title',
  description: 'Custom description for this specific about page',
  keywords: ['custom', 'keywords'],
  ogImage: '/custom-og-image.png',
});
```

### Blog Post Metadata

For blog posts, use the `generateBlogMetadata` function:

```tsx
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug);

  return generateBlogMetadata(
    {
      title: post.title,
      description: post.description,
      author: post.author,
      publishedTime: post.publishedAt,
      tags: post.tags,
      category: post.category,
    },
    params.slug
  );
}
```

### Handling Client Components with Metadata

When you need both metadata and client-side interactivity, use **component composition**:

1. **Keep the page as a Server Component** for metadata generation
2. **Create a separate Client Component** for interactive features
3. **Import the Client Component** into the Server Component page

**Example - Waitlist Page:**

```tsx
// app/(landing)/waitlist/page.tsx (Server Component)
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import WaitlistForm from '@/components/waitlist/WaitlistForm';

export const metadata: Metadata = generatePageMetadata('waitlist');

export default function WaitlistPage() {
  return <WaitlistForm />;
}
```

```tsx
// components/waitlist/WaitlistForm.tsx (Client Component)
'use client';

export default function WaitlistForm() {
  // All your interactive logic, GSAP animations, form handling
  return <div>Interactive Form Content</div>;
}
```

**Why This Approach?**

- ✅ **Metadata works correctly** - Server Component can export metadata
- ✅ **Interactivity preserved** - Client Component handles all client-side features
- ✅ **No layout nesting** - Clean, maintainable structure
- ✅ **Follows Next.js best practices** - Proper separation of concerns
- ✅ **Better performance** - Only interactive parts are client-side

### Adding New Pages

To add metadata for a new page:

1. **Add to `pageMetadata` in `lib/metadata.ts`:**

```tsx
export const pageMetadata: Record<string, PageMetadata> = {
  // ... existing pages
  newPage: {
    title: 'New Page - Boundless',
    description: 'Description for the new page',
    keywords: ['new', 'page', 'keywords'],
    ogImage: '/new-page-og.png',
  },
};
```

2. **Use in your page component:**

```tsx
export const metadata: Metadata = generatePageMetadata('newPage');
```

### Structured Data

The system automatically includes structured data for:

- **Organization**: Company information and contact details
- **Website**: Search functionality and site information
- **Blog Posts**: Article metadata for better search results

### Environment Variables

Set these environment variables for production:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## SEO Best Practices

### 1. Unique Titles and Descriptions

Each page has unique, descriptive titles and meta descriptions.

### 2. Proper Open Graph Tags

Social media sharing is optimized with proper Open Graph tags.

### 3. Twitter Cards

Twitter sharing includes large image cards for better engagement.

### 4. Canonical URLs

Prevents duplicate content issues with proper canonical URLs.

### 5. Structured Data

JSON-LD structured data helps search engines understand your content.

### 6. Sitemap

Automatic sitemap generation for better search engine indexing.

### 7. Robots.txt

Proper crawler control for better SEO performance.

## Blog Integration

The system is designed to work seamlessly with blog functionality:

- **Dynamic Blog Post Metadata**: Each blog post gets unique metadata
- **Author Information**: Proper author attribution for blog posts
- **Publishing Dates**: Publication and modification dates for better SEO
- **Tags and Categories**: Proper categorization for search engines
- **Article Schema**: Blog posts use Article schema markup

## Performance Considerations

- Metadata is generated at build time for static pages
- Blog post metadata is generated dynamically
- Structured data is included in the HTML head
- No client-side JavaScript required for metadata
- Client Components are only loaded where needed

## Troubleshooting

### Common Issues

1. **Metadata not updating**: Ensure you're using the correct page key
2. **Structured data errors**: Check the JSON-LD syntax in browser dev tools
3. **Sitemap not generating**: Verify the `generateSitemapData` function is working
4. **Build errors with 'use client'**: Use component composition instead of multiple layouts

### Debugging

Use browser dev tools to inspect:

- Page title and meta tags
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)

## Future Enhancements

- **CMS Integration**: Connect with headless CMS for dynamic content
- **Analytics Integration**: Track metadata performance
- **A/B Testing**: Test different metadata variations
- **Internationalization**: Multi-language metadata support
- **Dynamic OG Images**: Generate custom Open Graph images

## Support

For questions or issues with the metadata system, refer to:

- This documentation
- The metadata configuration files
- Next.js metadata documentation
- Schema.org structured data guidelines
