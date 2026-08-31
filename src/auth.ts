import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";
import type { UserRole } from "@/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "arjunanazril486@gmail.com";
const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

function isAdminEmail(email: string | null | undefined) {
  return normalizeEmail(email) === normalizeEmail(ADMIN_EMAIL);
}

async function syncAdminRole(userId: string | undefined, email: string | null | undefined) {
  if (!db || !userId || !isAdminEmail(email)) return;
  await db.update(users).set({ role: "ADMIN", updatedAt: new Date() }).where(eq(users.id, userId));
}

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
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: adapter ? "database" : "jwt" },
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      await syncAdminRole(user.id, user.email);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = isAdminEmail(user.email) ? "ADMIN" : "USER";
      }
      return token;
    },
    async session({ session, token, user }) {
      const id = user?.id ?? token.sub;
      const email = session.user.email;
      let role: UserRole = token.role === "ADMIN" ? "ADMIN" : "USER";

      if (isAdminEmail(email)) {
        role = "ADMIN";
      }

      if (db && id) {
        const existing = await db.query.users.findFirst({ where: eq(users.id, id) });
        if (existing) {
          role = isAdminEmail(existing.email) ? "ADMIN" : existing.role;
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
  events: {
    async createUser({ user }) {
      await syncAdminRole(user.id, user.email);
    },
  },
});
