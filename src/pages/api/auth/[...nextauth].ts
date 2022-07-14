import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { createUser } from "./_lib/createUser";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      try {
        await createUser(profile);
      } catch (err) {
        console.error(err);
      }
      return true;
    },
    async jwt({ token, profile }) {
      profile && (token.userProfile = profile);
      return token;
    },
    async session({ token, session }) {
      session.userProfile = token.userProfile;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
