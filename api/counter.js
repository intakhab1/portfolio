import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  console.log("Attempting to connect to MongoDB...");
  
  if (!uri) {
    console.error("MONGODB_URI is undefined!");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const client = new MongoClient(uri);
  
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully.");

    const db = client.db("visitor_counter");
    const visits = db.collection("visits");

    console.log("Updating counter...");
    const result = await visits.findOneAndUpdate(
      { _id: "total_visits" },
      { $inc: { count: 1 } },
      { returnDocument: 'after', upsert: true }
    );

    console.log("Result:", result);
    res.status(200).json({ count: result.value.count });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({ 
      error: "Database operation failed",
      details: error.message 
    });
  } finally {
    await client.close();
  }
}