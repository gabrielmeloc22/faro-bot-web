import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../services/mongodb";

interface reqProps extends NextApiRequest {
  body: {
    discordId: string;
    bio: string;
    allowCantada: boolean;
  };
}

export default async function handler(req: reqProps, res: NextApiResponse) {
  if (req.method !== "POST") res.status(400).end();
  const { bio, allowCantada, discordId } = req.body;

  const collection = database.collection("users");

  try {
    await collection.findOneAndUpdate({ discordId }, { $set: { bio, allowCantada } });
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
}
