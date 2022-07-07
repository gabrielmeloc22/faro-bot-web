import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../services/mongodb";

interface reqProps extends NextApiRequest {
  body: {
    discordId: string;
  };
}

export default async function handler(req: reqProps, res: NextApiResponse) {
  if (req.method !== "DELETE") res.status(400).end();
  const { discordId } = req.body;

  const collection = database.collection("users");

  try {
    await collection.findOneAndDelete({ discordId });
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
}
