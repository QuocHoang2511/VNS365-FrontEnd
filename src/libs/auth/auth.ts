import CredentialsProvider from "next-auth/providers/credentials";

import { Session, NextAuthOptions, DefaultSession, User } from "next-auth";
import axios from "axios";
import { IUserLoginRes } from "../types/user";
export type SessionUser = Session["user"];

declare module "next-auth" {
  interface Session {
    user: IUserLoginRes &
      DefaultSession["user"] & {
        address: string;
        phone_number: string;
        role: string;
        id: number;
      };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          const res = await axios.post<IUserLoginRes>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data) {
            return res.data as any;
          }
          return null;
        } catch (e: any) {
          console.log("e", e);
          return e?.data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const _user = user as unknown as IUserLoginRes;

      const isSignIn = trigger === "signIn";
      if (user && isSignIn) {
        return {
          ...token,
          id: _user.user.id,
          name: _user.user.name,
          email: _user.user.email,
          address: _user.user.address,
          phone_number: _user.user.phone_number,
          accessToken: _user?.accessToken,
          refreshToken: _user?.refreshToken,
          role: _user.user.role,
        };
      }

      if (trigger === "update") {
        console.log("update", { token, user, trigger, session });

        console.log("============================");

        console.log({
          ...(token?.user as Record<string, unknown>),
          ...session,
        });

        // return {
        //   ...token,
        //   name: _user.user.name,
        //   email: _user.user.email,
        //   address: _user.user.address,
        //   phone_number: _user.user.phone_number,
        //   accessToken: _user?.accessToken,
        //   refreshToken: _user?.refreshToken,
        //   role: _user.user.role,
        // };

        token.user = {
          ...(token?.user as Record<string, unknown>),
          ...session,
        };
      }

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;

      session.user.address = token.address as string;
      session.user.phone_number = token.phone_number as string;
      session.user.role = token.role as string;
      session.user.id = token.id as number;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};
