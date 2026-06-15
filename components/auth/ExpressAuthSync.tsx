"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { googleAuth } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

/** Syncs Express JWT from NextAuth session into Zustand after Google login */
export function ExpressAuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const syncingRef = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;

    console.log("[ExpressAuthSync] authenticated session:", {
      email: session.user.email,
      hasExpressToken: Boolean(session.expressToken),
      hasExpressUser: Boolean(session.expressUser),
      zustandToken: Boolean(token),
    });

    async function sync() {
      if (syncingRef.current) return;
      if (!session) return;
      syncingRef.current = true;

      try {
        // Fast path: Express JWT already in NextAuth session (server jwt callback)
        if (session && session.expressToken && session.expressUser) {
          if (token !== session.expressToken) {
            console.log("[ExpressAuthSync] syncing expressToken from session → Zustand");
            setAuth(session.expressUser, session.expressToken);
          } else {
            console.log("[ExpressAuthSync] Zustand already has expressToken");
          }
          return;
        }

        // Fallback: server jwt callback failed — call Express from browser
        const email = session.user?.email;
        if (!email) {
          console.error("[ExpressAuthSync] no email in session — cannot sync");
          return;
        }

        console.log("[ExpressAuthSync] no expressToken in session — client fallback POST /api/auth/google");
        const { token: expressToken, user } = await googleAuth(
          email,
          session.user?.name ?? email.split("@")[0] ?? "User",
          session.user?.id ?? email
        );

        console.log("[ExpressAuthSync] client fallback OK — saving to Zustand, userId:", user.id);
        setAuth(user, expressToken);
      } catch (err) {
        console.error("[ExpressAuthSync] sync failed:", err);
      } finally {
        syncingRef.current = false;
      }
    }

    sync();
  }, [session, status, setAuth, token]);

  return <>{children}</>;
}
