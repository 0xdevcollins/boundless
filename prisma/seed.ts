import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const notificationTypes = [
  {
    title: 'Project Created',
    description: 'Your project has been successfully created and is pending validation.',
  },
  {
    title: 'Project Validated',
    description: 'Congratulations! Your project has been validated by our team.',
  },
  {
    title: 'New Contribution',
    description: 'Your project received a new contribution of 2 ETH.',
  },
  {
    title: 'Project Milestone',
    description: 'Your project has reached 50% of its funding goal!',
  },
  {
    title: 'Team Member Added',
    description: 'A new team member has been added to your project.',
  },
  {
    title: 'Comment Received',
    description: 'Someone commented on your project.',
  },
  {
    title: 'Vote Received',
    description: 'Your project received a new vote.',
  },
];

async function main() {
  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    if (users.length === 0) {
      console.log('No users found. Please seed users first.');
      return;
    }

    console.log(`Found ${users.length} users. Creating notifications...`);

    // Create notifications for each user
    for (const user of users) {
      // Create 5-10 random notifications for each user
      const numNotifications = Math.floor(Math.random() * 5) + 5; // Random number between 5-10

      for (let i = 0; i < numNotifications; i++) {
        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const isRead = Math.random() > 0.5; // 50% chance of being read
        const hoursAgo = Math.floor(Math.random() * 72); // Random time between 0-72 hours ago

        await prisma.notification.create({
          data: {
            userId: user.id,
            title: randomType.title,
            description: randomType.description,
            timestamp: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
            isRead,
          },
        });
      }
    }

    console.log("Successfully seeded notifications!");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
      where: { email: "admin@boundless.com" },
      update: {},
      create: {
        email: "admin@boundless.com",
        name: "Admin User",
        password: adminPassword,
        role: "ADMIN",
        username: "admin",
        bio: "Administrator of Boundless",
      },
    });

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 12);
    const user = await prisma.user.upsert({
      where: { email: "user@boundless.com" },
      update: {},
      create: {
        email: "user@boundless.com",
        name: "Regular User",
        password: userPassword,
        role: "USER",
        username: "user",
        bio: "A regular user on Boundless",
      },
    });

    // Create categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: "technology" },
        update: {},
        create: {
          name: "Technology",
          slug: "technology",
          description: "Latest news and updates from the tech world",
        },
      }),
      prisma.category.upsert({
        where: { slug: "blockchain" },
        update: {},
        create: {
          name: "Blockchain",
          slug: "blockchain",
          description: "Everything about blockchain technology and cryptocurrencies",
        },
      }),
      prisma.category.upsert({
        where: { slug: "development" },
        update: {},
        create: {
          name: "Development",
          slug: "development",
          description: "Software development tips, tricks, and tutorials",
        },
      }),
    ]);

    // Create tags
    const tags = await Promise.all([
      prisma.tag.upsert({
        where: { slug: "web3" },
        update: {},
        create: {
          name: "Web3",
          slug: "web3",
        },
      }),
      prisma.tag.upsert({
        where: { slug: "ai" },
        update: {},
        create: {
          name: "Artificial Intelligence",
          slug: "ai",
        },
      }),
      prisma.tag.upsert({
        where: { slug: "react" },
        update: {},
        create: {
          name: "React",
          slug: "react",
        },
      }),
      prisma.tag.upsert({
        where: { slug: "nextjs" },
        update: {},
        create: {
          name: "Next.js",
          slug: "nextjs",
        },
      }),
    ]);

    // Create blog posts
    const posts = [
      {
        title: "Getting Started with Web3 Development",
        slug: "getting-started-with-web3-development",
        content: `# Getting Started with Web3 Development

Web3 development is revolutionizing the way we build applications. In this comprehensive guide, we'll explore the fundamentals of Web3 development and how to get started.

## What is Web3?

Web3 represents the next generation of the internet, where applications are decentralized and powered by blockchain technology. This new paradigm enables:

- Decentralized data storage
- Transparent transactions
- User-owned data
- Smart contracts

## Getting Started

To begin your Web3 development journey, you'll need to:

1. Learn the basics of blockchain technology
2. Understand smart contracts
3. Choose a blockchain platform
4. Set up your development environment

## Development Tools

Some essential tools for Web3 development include:

- MetaMask for wallet integration
- Hardhat for smart contract development
- Web3.js or Ethers.js for blockchain interaction
- IPFS for decentralized storage

## Next Steps

Stay tuned for more detailed tutorials on Web3 development, including:

- Smart contract development
- DApp architecture
- Security best practices
- Testing and deployment`,
        excerpt: "A comprehensive guide to getting started with Web3 development, covering the basics of blockchain technology and essential development tools.",
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categories[1].id, // Blockchain category
        tags: {
          connect: [
            { id: tags[0].id }, // Web3
            { id: tags[2].id }, // React
          ],
        },
      },
      {
        title: "Building Modern Web Applications with Next.js",
        slug: "building-modern-web-applications-with-nextjs",
        content: `# Building Modern Web Applications with Next.js

Next.js has become one of the most popular frameworks for building modern web applications. Let's explore why it's so powerful and how to leverage its features.

## Why Next.js?

Next.js offers several advantages for web development:

- Server-side rendering
- Static site generation
- API routes
- File-based routing
- Built-in optimizations

## Key Features

### 1. Server-Side Rendering

Next.js enables server-side rendering out of the box, improving:

- Initial page load performance
- SEO
- User experience

### 2. API Routes

Create API endpoints within your Next.js application:

\`\`\`typescript
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
\`\`\`

### 3. Image Optimization

Next.js provides automatic image optimization:

\`\`\`jsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={300}
    />
  )
}
\`\`\`

## Best Practices

1. Use TypeScript for type safety
2. Implement proper error handling
3. Optimize for performance
4. Follow the file-based routing convention

## Conclusion

Next.js is a powerful framework that simplifies modern web development. Its features make it an excellent choice for building scalable applications.`,
        excerpt: "Learn how to build modern web applications with Next.js, exploring its key features and best practices for optimal performance and developer experience.",
        published: true,
        publishedAt: new Date(),
        authorId: user.id,
        categoryId: categories[2].id, // Development category
        tags: {
          connect: [
            { id: tags[2].id }, // React
            { id: tags[3].id }, // Next.js
          ],
        },
      },
      {
        title: "The Future of AI in Web Development",
        slug: "future-of-ai-in-web-development",
        content: `# The Future of AI in Web Development

Artificial Intelligence is transforming web development in unprecedented ways. Let's explore how AI is shaping the future of web development.

## Current Applications

AI is already being used in web development for:

- Code generation
- Bug detection
- Performance optimization
- User experience personalization

## Emerging Trends

### 1. AI-Powered Development Tools

Modern development tools are incorporating AI to:

- Suggest code completions
- Detect potential bugs
- Optimize performance
- Generate documentation

### 2. Intelligent User Interfaces

AI enables more intuitive user interfaces through:

- Natural language processing
- Predictive analytics
- Personalized content delivery
- Adaptive layouts

### 3. Automated Testing

AI is revolutionizing testing with:

- Automated test generation
- Bug prediction
- Performance analysis
- Security vulnerability detection

## Future Implications

The integration of AI in web development will lead to:

1. Faster development cycles
2. More reliable applications
3. Better user experiences
4. Reduced development costs

## Conclusion

AI is not just a trend in web development; it's becoming an essential tool for building modern web applications. As AI technology continues to evolve, we can expect even more innovative applications in web development.`,
        excerpt: "Explore how Artificial Intelligence is transforming web development and what the future holds for AI-powered development tools and applications.",
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categories[0].id, // Technology category
        tags: {
          connect: [{ id: tags[1].id }], // AI tag
        },
      },
    ];

    for (const post of posts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      });
    }

    console.log("Database has been seeded. 🌱");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
