import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const notificationTypes = [
  {
    title: "Project Created",
    description: "Your project has been successfully created and is pending validation.",
  },
  {
    title: "Project Validated",
    description: "Congratulations! Your project has been validated by our team.",
  },
  {
    title: "New Contribution",
    description: "Your project received a new contribution of 2 ETH.",
  },
  {
    title: "Project Milestone",
    description: "Your project has reached 50% of its funding goal!",
  },
  {
    title: "Team Member Added",
    description: "A new team member has been added to your project.",
  },
  {
    title: "Comment Received",
    description: "Someone commented on your project.",
  },
  {
    title: "Vote Received",
    description: "Your project received a new vote.",
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
      console.log("No users found. Please seed users first.");
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
      where: { email: "admin@boundlessfi.xyz" },
      update: {},
      create: {
        email: "admin@boundlessfi.xyz",
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
      where: { email: "user@boundlessfi.xyz" },
      update: {},
      create: {
        email: "user@boundlessfi.xyz",
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
        where: { slug: "blockchain" },
        update: {},
        create: {
          name: "Blockchain",
          slug: "blockchain",
          description: "Articles about blockchain technology and its applications.",
        },
      }),
      prisma.category.upsert({
        where: { slug: "crowdfunding" },
        update: {},
        create: {
          name: "Crowdfunding",
          slug: "crowdfunding",
          description: "Articles about crowdfunding and fundraising.",
        },
      }),
      prisma.category.upsert({
        where: { slug: "technology" },
        update: {},
        create: {
          name: "Technology",
          slug: "technology",
          description: "General technology articles and updates.",
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
        where: { slug: "defi" },
        update: {},
        create: {
          name: "DeFi",
          slug: "defi",
        },
      }),
      prisma.tag.upsert({
        where: { slug: "nft" },
        update: {},
        create: {
          name: "NFT",
          slug: "nft",
        },
      }),
      prisma.tag.upsert({
        where: { slug: "startup" },
        update: {},
        create: {
          name: "Startup",
          slug: "startup",
        },
      }),
    ]);

    // Create blog posts
    const posts = await Promise.all([
      prisma.post.upsert({
        where: { slug: "introduction-to-blockchain" },
        update: {},
        create: {
          title: "Introduction to Blockchain Technology",
          slug: "introduction-to-blockchain",
          content: `# Introduction to Blockchain Technology

Blockchain technology has revolutionized the way we think about data storage and transfer. At its core, a blockchain is a distributed ledger that records transactions across multiple computers in a way that ensures security, transparency, and immutability.

## Key Features

- **Decentralization**: No single entity controls the network
- **Transparency**: All transactions are visible to network participants
- **Security**: Cryptographic techniques ensure data integrity
- **Immutability**: Once recorded, data cannot be altered

## Applications

Blockchain technology has found applications in various fields:
- Cryptocurrencies
- Supply chain management
- Smart contracts
- Digital identity
- Voting systems

The potential of blockchain technology is vast, and we're only beginning to scratch the surface of its capabilities.`,
          excerpt: "A comprehensive introduction to blockchain technology, its key features, and applications.",
          featuredImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
          published: true,
          publishedAt: new Date(),
          authorId: admin.id,
          categoryId: categories[0].id,
          tags: {
            connect: [tags[0], tags[1]],
          },
        },
      }),
      prisma.post.upsert({
        where: { slug: "the-future-of-crowdfunding" },
        update: {},
        create: {
          title: "The Future of Crowdfunding",
          slug: "the-future-of-crowdfunding",
          content: `# The Future of Crowdfunding

Crowdfunding has transformed the way projects and businesses raise capital. With the advent of blockchain technology, we're witnessing the next evolution of crowdfunding platforms.

## Traditional vs. Blockchain-based Crowdfunding

Traditional crowdfunding platforms have limitations:
- High fees
- Centralized control
- Limited transparency
- Geographic restrictions

Blockchain-based crowdfunding offers solutions:
- Lower fees through smart contracts
- Decentralized governance
- Transparent fund allocation
- Global accessibility

## Emerging Trends

1. **Tokenization of Assets**: Projects can issue digital tokens representing ownership or rewards
2. **Smart Contract Automation**: Automated fund distribution based on predefined conditions
3. **Community Governance**: Token holders can participate in project decisions
4. **Cross-border Funding**: Global access to investment opportunities

The future of crowdfunding is bright, with blockchain technology enabling more efficient, transparent, and inclusive fundraising mechanisms.`,
          excerpt: "Exploring how blockchain technology is revolutionizing the crowdfunding landscape.",
          featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          published: true,
          publishedAt: new Date(),
          authorId: admin.id,
          categoryId: categories[1].id,
          tags: {
            connect: [tags[2], tags[3]],
          },
        },
      }),
    ]);

    // Create sample comments
    await Promise.all([
      prisma.postComment.create({
        data: {
          content: "Great introduction to blockchain! Looking forward to more articles.",
          postId: posts[0].id,
          authorId: admin.id,
        },
      }),
      prisma.postComment.create({
        data: {
          content: "The future of crowdfunding looks promising with blockchain technology.",
          postId: posts[1].id,
          authorId: admin.id,
        },
      }),
    ]);

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
