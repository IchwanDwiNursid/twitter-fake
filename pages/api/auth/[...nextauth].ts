import NextAuth from "next-auth/next";
import argon2 from "argon2";
import CredentialsProviders from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials ");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await argon2.verify(
          user.hashPassword,
          credentials.password
        );

        if (!isCorrectPassword) {
          throw new Error("Email Or Password Wrong");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
