import type { DefaultSession } from "next-auth"
import type { Role } from "@prisma/client"

declare module "next-auth" {
  interface User {
    role: Role
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: Role
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
  }
}

