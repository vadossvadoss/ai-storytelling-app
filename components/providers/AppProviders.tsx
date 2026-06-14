"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ExpressAuthSync } from "@/components/auth/ExpressAuthSync";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ExpressAuthSync>{children}</ExpressAuthSync>
      </AuthProvider>
    </SessionProvider>
  );
}
