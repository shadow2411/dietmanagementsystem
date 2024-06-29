import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
  }

  export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
  } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      //usually not needed, here we are fixing a bug in next auth
      async session({ session, user }: any) {
        if (session && user) {
          session.user.id = user.id;
        }
  
        return session;
      },
    },
  });
  