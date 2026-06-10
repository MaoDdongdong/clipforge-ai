import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
      credits: number;
      preferredLanguage: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    credits: number;
    preferredLanguage: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    credits: number;
    preferredLanguage: string;
  }
}