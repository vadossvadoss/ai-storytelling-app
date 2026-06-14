const LOCAL_API = "http://localhost:4000";

/** Default production backend (Railway) */
export const PRODUCTION_API =
  "https://ai-storytelling-backend-production.up.railway.app";

export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_API;
  }

  return LOCAL_API;
}
