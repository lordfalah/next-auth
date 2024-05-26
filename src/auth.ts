import NextAuth from "next-auth";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import type { Adapter } from "next-auth/adapters";
import { getUserByEmail, getUserById } from "@/data/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return false;

      const existingUser = await getUserById(user?.id as string);
      if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },

    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token.email);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },

    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
