import { NextResponse } from "next/server";
import { googleAuth } from "@/lib/api/auth";
import { z } from "zod";

const googleSchema = z.object({
  token: z.string().min(1, "Google token is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = googleSchema.parse(body);
    const apiRes = await googleAuth({ token });
    return NextResponse.json(apiRes, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    if (typeof error === "object" && error !== null && "message" in error) {
      return NextResponse.json({ message: String((error as { message: unknown }).message) }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

