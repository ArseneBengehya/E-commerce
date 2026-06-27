import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// C'est ici que tu corriges l'erreur 'AdapterUser & User'
declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
  }
}