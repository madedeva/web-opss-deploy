import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await getUserByEmail(credentials.email);

          if (!user) {
            throw new Error("No user found with the email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            authorAccess: user.authorAccess,
            reviewerAccess: user.reviewerAccess
          };
        } catch (error) {
          console.error(error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signout",
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roleId = user.roleId;
        token.authorAccess = user.authorAccess;
        token.reviewerAccess = user.reviewerAccess;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.roleId = token.roleId;
      session.user.authorAccess = token.authorAccess;
      session.user.reviewerAccess = token.reviewerAccess;
      return session;
    },
  },
});

async function getUserByEmail(email) {
  const mockUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (mockUser && mockUser.email) {
    return mockUser;
  }
  return null;
}

export { handler as GET, handler as POST };
