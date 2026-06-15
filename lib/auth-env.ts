/**
 * On Vercel, a copied NEXTAUTH_URL=http://localhost:3000 breaks OAuth callbacks.
 * Prefer the deployment / production host when localhost is configured.
 */
export function ensureAuthEnv(): void {
  if (!process.env.VERCEL) return;

  const current = process.env.NEXTAUTH_URL?.replace(/\/$/, "");
  const isLocalhost =
    !current || /localhost|127\.0\.0\.1/.test(current);

  if (!isLocalhost) return;

  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

  if (!host) return;

  process.env.NEXTAUTH_URL = host.startsWith("http")
    ? host
    : `https://${host}`;

  console.info("[auth-env] NEXTAUTH_URL set from Vercel host:", process.env.NEXTAUTH_URL);
}
