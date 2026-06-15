import NextAuth from "next-auth";
import { ensureAuthEnv } from "@/lib/auth-env";
import { authOptions } from "@/lib/auth";

ensureAuthEnv();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
