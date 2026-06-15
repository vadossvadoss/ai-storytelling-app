"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isHydrated } = useAuthStore();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (!isHydrated || sessionStatus === "loading") return;

    if (!token && sessionStatus !== "authenticated") {
      router.replace("/login");
    }
  }, [isHydrated, token, sessionStatus, router]);

  if (!isHydrated || sessionStatus === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // NextAuth authenticated — ExpressAuthSync may still be writing the JWT
  if (!token && sessionStatus === "authenticated") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
