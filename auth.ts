import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// N'instancie pas PrismaClient directement ici si possible,
// ou alors assure-toi qu'il n'est jamais appelé par le middleware.
const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // Ce callback permet d'ajouter l'ID au token et à la session
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }, // IMPORTANT : Utilise JWT pour le middleware
});
