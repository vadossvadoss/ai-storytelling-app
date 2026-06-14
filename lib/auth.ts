import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function exchangeGoogleForExpressJwt(
  email: string,
  name: string,
  googleId: string
): Promise<{ token: string; user: { id: string; email: string; name: string | null } } | null> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, googleId }),
    });

    if (!res.ok) {
      console.error("[auth] Express /api/auth/google failed:", res.status, await res.text());
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("[auth] Express /api/auth/google error:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const expressAuth = await exchangeGoogleForExpressJwt(
          profile.email,
          profile.name ?? profile.email.split("@")[0] ?? "User",
          account.providerAccountId
        );

        if (expressAuth) {
          token.expressToken = expressAuth.token;
          token.expressUser = expressAuth.user;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.expressToken && typeof token.expressToken === "string") {
        session.expressToken = token.expressToken;
      }

      if (token.expressUser && typeof token.expressUser === "object") {
        session.expressUser = token.expressUser as {
          id: string;
          email: string;
          name: string | null;
        };
      }

      return session;
    },
  },
};
