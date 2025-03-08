import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const password = await hash("adminpassword", 12);
	const admin = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			email: "admin@example.com",
			name: "Admin",
			password,
			role: "ADMIN",
		},
	});
	console.log({ admin });

	// Seed Projects
	const projects = await Promise.all([
		prisma.project.create({
			data: {
				userId: "cm7y4qb140007rqxnx1zfd8pb",
				title: "Eco-Friendly Water Purifier",
				description:
					"A sustainable water purification system for developing countries.",
				fundingGoal: 50000,
				category: "Environment",
				bannerUrl:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345548/project_images/uq7sf4tjkckc62mgohic.avif",
				profileUrl:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345550/project_images/arnuhsp5cct8js56zq01.png",
				ideaValidation: "PENDING",
			},
		}),
		prisma.project.create({
			data: {
				userId: "cm7y4qb140007rqxnx1zfd8pb",
				title: "AI-Powered Education Platform",
				description:
					"An adaptive learning platform using artificial intelligence.",
				fundingGoal: 75000,
				category: "Education",
				bannerUrl:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345548/project_images/uq7sf4tjkckc62mgohic.avif",
				profileUrl:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345550/project_images/arnuhsp5cct8js56zq01.png",
				ideaValidation: "VALIDATED",
			},
		}),
	]);
	console.log({ projects });

	// Seed TeamMembers
	const teamMembers = await Promise.all([
		prisma.teamMember.create({
			data: {
				fullName: "John Doe",
				role: "Project Lead",
				bio: "Experienced environmental engineer with a passion for clean water.",
				profileImage:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345550/project_images/arnuhsp5cct8js56zq01.png",
				github: "johndoe",
				twitter: "johndoe_eco",
				linkedin: "johndoe-eco",
				projectId: projects[0].id,
			},
		}),
		prisma.teamMember.create({
			data: {
				fullName: "Jane Smith",
				role: "AI Specialist",
				bio: "Machine learning expert with a focus on educational technology.",
				profileImage:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345550/project_images/arnuhsp5cct8js56zq01.png",
				github: "janesmith",
				twitter: "janesmith_ai",
				linkedin: "janesmith-ai",
				projectId: projects[1].id,
			},
		}),
		prisma.teamMember.create({
			data: {
				fullName: "Alex Johnson",
				role: "UX Designer",
				bio: "User experience designer with a knack for creating intuitive interfaces.",
				profileImage:
					"https://res.cloudinary.com/dmsphf4d3/image/upload/v1741345550/project_images/arnuhsp5cct8js56zq01.png",
				github: "alexj",
				twitter: "alexj_design",
				linkedin: "alexjohnson-ux",
				projectId: projects[1].id,
			},
		}),
	]);
	console.log({ teamMembers });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
