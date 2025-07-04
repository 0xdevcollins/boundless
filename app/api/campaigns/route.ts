import { z } from 'zod';
import { NextResponse } from 'next/server';

export const campaignSchema = z.object({
  fundingGoal: z.string().min(2, 'Funding goal must be at least 1'),
  deadline: z.date().refine((date) => date > new Date(), {
    message: 'Deadline must be in the future',
  }),
  milestones: z
    .array(
      z.object({
        title: z.string().min(2, 'Milestone title required'),
        description: z.string().min(2, 'Milestone description'),
      }),
    )
    .min(1, 'At least one milestone required'),
});

console.log({ route: 'Campaign gets to route.ts' });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedData = campaignSchema.parse({
      fundingGoal: body.fundingGoal,
      deadline: new Date(body.deadline),
      milestones: body.milestones,
    });

    console.log('Validated Campaign Data:', parsedData);

    return NextResponse.json({ message: 'Campaign created successfully', data: parsedData }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Unhandled error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
