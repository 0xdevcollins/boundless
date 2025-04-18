import { PrismaClient } from "@prisma/client";

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
  } catch (error) {
    console.error("Error seeding notifications:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main(); 
