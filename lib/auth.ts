import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // connects to db and tries to find an existing user to determine outcome of signIn (credentials)
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        // handling possible outcomes
        if (!user) throw new Error("Wrong Email");
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!passwordMatch) throw new Error("Wrong Password");

        // returning user and successful authentication flow
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectDB();
        // Handles when user uses google provider
        if (account?.provider === "google") {
          let existingUser = await User.findOne({ email: user.email });

          // if user doesn't exist, create a record on db
          if (!existingUser) {
            existingUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              isOAuth: true,
            });
          }

          // returning true and successful authentication flow
          return true;
        }
        // Handles when user uses other providers (to be determined)

        return true;
      } catch (e) {
        console.log("error(auth.tsx_line-67", e);
        return false;
      }
    },

    async jwt({ token, user, trigger }) {
      /* 
      This is triggered when a user is authenticated and determines if there is a 
      plaid connection. It ensures sub is equivalent to mongoDB id.
      */
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email }).select(
          "plaidLinked"
        );
        token.sub = dbUser._id.toString();
        token.plaidLinked = dbUser?.plaidLinked || false;
      }

      /* 
      This is triggered if the token is updated. It changes the status of plaidLinked
      */
      if (trigger === "update") {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.plaidLinked = dbUser.plaidLinked;
        }
      }
      return token;
    },

    async session({ session, token }) {
      /* 
      Ensures that the session has important information about the session. This is 
      used by middleware to determine if user is authorized to be present in 
      authenticated pages
      */
      return {
        ...session,
        plaidLinked: token.plaidLinked,
        userID: token.sub,
      };
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
