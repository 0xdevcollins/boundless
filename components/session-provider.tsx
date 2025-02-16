'use client'

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { Session } from "next-auth"

type Props = {
  children: React.ReactNode
  session?: Session | null
}

export function SessionProvider({ children, session }: Props) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}
