import { authOptions } from "@/lib/auth.config";
import {
  notifyNewVote,
  notifyProjectValidated,
  notifyVoteMilestone,
} from "@/lib/notifications/project";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

const VOTE_THRESHOLDS = [10, 25, 50, 100];
  try {
	const url = new URL(request.url);
	const pathParts = url.pathname.split("/");
	const id = pathParts[pathParts.length - 1];
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.id) {
	  return NextResponse.json(
		{ error: "You must be logged in to vote" },
		{ status: 401 },
	  );
	}

	const userId = session.user.id;
	const projectId = id;
	const { type } = await request.json(); // type: 'UPVOTE' | 'DOWNVOTE'
	if (!type || (type !== 'UPVOTE' && type !== 'DOWNVOTE')) {
	  return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
	}

	// Check if project exists
	const project = await prisma.project.findUnique({
	  where: { id: projectId },
	  include: {
		user: {
		  select: { id: true, name: true },
		},
	  },
	});

	if (!project) {
	  return NextResponse.json({ error: "Project not found" }, { status: 404 });
	}

	// Check if user has already voted
	const existingVote = await prisma.vote.findUnique({
	  where: {
		projectId_userId: {
		  projectId,
		  userId,
		},
	  },
	});

	if (existingVote) {
	  // If the vote type is the same, remove the vote (toggle)
	  if (existingVote.type === type) {
		await prisma.vote.delete({
		  where: { id: existingVote.id },
		});
	  } else {
		// Otherwise, update the vote type
		await prisma.vote.update({
		  where: { id: existingVote.id },
		  data: { type },
		});
	  }
	} else {
	  // Create a new vote
	  await prisma.vote.create({
		data: {
		  project: { connect: { id: projectId } },
		  user: { connect: { id: userId } },
		  type,
		},
	  });
	}

	// Get updated vote counts
	const upvotes = await prisma.vote.count({ where: { projectId, type: 'UPVOTE' } });
	const downvotes = await prisma.vote.count({ where: { projectId, type: 'DOWNVOTE' } });
	const count = upvotes + downvotes;

	// Notify project creator about the new vote (only for upvotes)
	if (type === 'UPVOTE' && project.user.id !== userId) {
	  const voter = await prisma.user.findUnique({
		where: { id: userId },
		select: { name: true },
	  });

	  await notifyNewVote({
		projectId,
		projectTitle: project.title,
		userId: project.user.id,
		voterName: voter?.name || "Someone",
		voteCount: upvotes,
	  });
	}

	// Check if a vote threshold has been reached (upvotes only)
	for (const threshold of VOTE_THRESHOLDS) {
	  if (upvotes === threshold) {
		await notifyVoteMilestone({
		  projectId,
		  projectTitle: project.title,
		  userId: project.user.id,
		  threshold,
		});

		// If the project reaches a significant upvote count and is still pending validation,
		// automatically validate it (optional feature)
		if (threshold >= 50 && project.ideaValidation === "PENDING") {
		  await prisma.project.update({
			where: { id: projectId },
			data: { ideaValidation: "VALIDATED" },
		  });

		  // Notify about automatic validation
		  await notifyProjectValidated({
			projectId,
			projectTitle: project.title,
			userId: project.user.id,
			voteCount: threshold,
		  });
		}
	  }
	}

	return NextResponse.json({ success: true, voted: true, upvotes, downvotes, count });
  } catch (error) {
	console.error("Error voting for project:", error);
	return NextResponse.json(
	  { error: "Failed to register vote" },
	  { status: 500 },
	);
  }
	}
}

export async function GET(request: NextRequest) {
  try {
	const url = new URL(request.url);
	const pathParts = url.pathname.split("/");
	const id = pathParts[pathParts.length - 1];
	const projectId = id;

	// Get upvote and downvote counts
	const upvotes = await prisma.vote.count({ where: { projectId, type: 'UPVOTE' } });
	const downvotes = await prisma.vote.count({ where: { projectId, type: 'DOWNVOTE' } });
	const count = upvotes + downvotes;
	const votePercentage = count > 0 ? Math.round((upvotes / count) * 100) : 0;

	// Check if current user has voted and what type
	const session = await getServerSession(authOptions);
	let userVoteType: 'UPVOTE' | 'DOWNVOTE' | null = null;

	if (session?.user?.id) {
	  const vote = await prisma.vote.findUnique({
		where: {
		  projectId_userId: {
			projectId,
			userId: session.user.id,
		  },
		},
	  });
	  userVoteType = vote?.type ?? null;
	}

	return NextResponse.json({ upvotes, downvotes, count, votePercentage, userVoteType });
  } catch (error) {
	console.error("Error getting vote data:", error);
	return NextResponse.json(
	  { error: "Failed to get vote data" },
	  { status: 500 },
	);
  }
}
