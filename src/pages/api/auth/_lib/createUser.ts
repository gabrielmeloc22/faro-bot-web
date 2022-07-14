import { Profile } from "next-auth";
import { DiscordProfile } from "next-auth/providers/discord";
import { database } from "../../../../services/mongodb";

export async function createUser(profile: Profile) {
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
}
