import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";
import type { UserRole } from "@/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "arjunanazril486@gmail.com";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

const adapter = db
  ? DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    })
  : undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  trustHost: true,
  session: { strategy: adapter ? "database" : "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.email === ADMIN_EMAIL ? "ADMIN" : "USER";
      }
      return token;
    },
    async session({ session, token, user }) {
      const id = user?.id ?? token.sub;
      const email = session.user.email;
      let role: UserRole = token.role === "ADMIN" ? "ADMIN" : "USER";

      if (email && email === ADMIN_EMAIL) {
        role = "ADMIN";
      }

      if (db && id) {
        const existing = await db.query.users.findFirst({ where: eq(users.id, id) });
        if (existing) {
          role = existing.email === ADMIN_EMAIL ? "ADMIN" : existing.role;
          if (existing.role !== role) {
            await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, id));
          }
        }
      }

      session.user.id = id ?? "";
      session.user.role = role;
      return session;
    },
  },
});
