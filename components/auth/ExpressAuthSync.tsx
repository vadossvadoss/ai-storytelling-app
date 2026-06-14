"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/lib/auth-store";

/** Syncs Express JWT from NextAuth session into Zustand after Google login */
export function ExpressAuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session?.expressToken || !session?.expressUser) return;

    // Avoid re-writing if already synced
    if (token === session.expressToken) return;

    setAuth(session.expressUser, session.expressToken);
  }, [session, status, setAuth, token]);

  return <>{children}</>;
}
