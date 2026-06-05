import { Suspense } from "react";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="min-h-screen" />}>{children}</Suspense>;
}
