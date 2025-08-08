import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://amirint190:yDCqmdcdYDOw0Lxe@cluster0.mhck2tu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("visitor_counter");
  const visits = db.collection("visits");

  // Increment and return count
  const result = await visits.findOneAndUpdate(
    { _id: "total_visits" },
    { $inc: { count: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  res.status(200).json({ count: result.value.count });
}