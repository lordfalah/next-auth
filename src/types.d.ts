import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRole;
  }
}
