import { NextResponse } from "next/server";
import { getDashboardOverview } from '@/lib/api/dashboard';

export async function GET() {
	try {
		const data = await getDashboardOverview();
		return NextResponse.json(data);
	} catch {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
