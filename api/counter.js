import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Store this in Vercel's env vars

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db("visitor_counter");
    const visits = db.collection("visits");

    // Increment counter (or create if it doesn't exist)
    const result = await visits.findOneAndUpdate(
      { _id: "total_visits" },
      { $inc: { count: 1 } },
      { 
        returnDocument: 'after',
        upsert: true // Creates the document if missing
      }
    );

    res.status(200).json({ count: result.value.count });
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: "Failed to update counter" });
  } finally {
    await client.close(); // Always close the connection
  }
}