import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.DATABASE_URL as string);
export const database = mongoClient.db(process.env.DATABASE_NAME as string);
