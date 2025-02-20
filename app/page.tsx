import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth.config";

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/projects/12")
  }
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">Welcome to Homepage</h1>
        <Link href="/projects/12">
          <Button>View Dashboard</Button>
        </Link>
      </main>
    </div>
  );
}
