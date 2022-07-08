import NextAuth from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import { database } from "../../../services/mongodb";

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
        const discordProfile = profile as DiscordProfile;
        const collection = database.collection("users");
        const user = await collection.findOne({ discordId: discordProfile.id });

        if (!user) {
          await collection.insertOne({
            name: discordProfile.username,
            discordId: discordProfile.id,
            bio: "",
            allowCantada: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      } catch (err) {
        console.log(err);
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
});
