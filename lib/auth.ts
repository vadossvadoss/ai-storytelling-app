import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getApiBaseUrl } from "./api-config";
import { ensureAuthEnv } from "./auth-env";

ensureAuthEnv();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`[auth] Missing required env: ${name}`);
  }
  return value ?? "";
}

async function exchangeGoogleForExpressJwt(
  email: string,
  name: string,
  googleId: string
): Promise<{ token: string; user: { id: string; email: string; name: string | null } } | null> {
  const url = `${getApiBaseUrl()}/api/auth/google`;
  console.log("[auth] POST /api/auth/google →", url, { email, name, googleId });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, googleId }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("[auth] Express /api/auth/google failed:", res.status, text);
      return null;
    }

    const data = JSON.parse(text) as {
      token: string;
      user: { id: string; email: string; name: string | null };
    };
    console.log("[auth] Express /api/auth/google OK — userId:", data.user.id);
    return data;
  } catch (error) {
    console.error("[auth] Express /api/auth/google error:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  secret: requireEnv("NEXTAUTH_SECRET"),
  providers: [
    GoogleProvider({
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        console.log("[auth jwt] Google sign-in — exchanging for Express JWT", {
          email: profile.email,
          providerAccountId: account.providerAccountId,
        });

        const expressAuth = await exchangeGoogleForExpressJwt(
          profile.email,
          profile.name ?? profile.email.split("@")[0] ?? "User",
          account.providerAccountId
        );

        if (expressAuth) {
          token.expressToken = expressAuth.token;
          token.expressUser = expressAuth.user;
          console.log("[auth jwt] expressToken saved on JWT for user:", expressAuth.user.id);
        } else {
          console.error("[auth jwt] expressToken NOT set — Express exchange failed");
        }
      }

      console.log("[auth jwt] returning token, has expressToken:", Boolean(token.expressToken));
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

      console.log("[auth session] built session:", {
        userId: session.user?.id,
        email: session.user?.email,
        hasExpressToken: Boolean(session.expressToken),
        expressUserId: session.expressUser?.id,
      });

      return session;
    },
  },
};
