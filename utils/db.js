import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; 
const options = {};

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, options);
  cachedClient = client;

  return client;
}