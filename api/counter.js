import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (!uri) {
    return res.status(500).json({ error: 'MONGODB_URI is missing' });
  }

  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db('visitor_counter');
    const visits = db.collection('visits');

    const result = await visits.findOneAndUpdate(
      { _id: 'total_visits' },
      { $inc: { count: 1 } },
      { returnDocument: 'after', upsert: true }
    );

    // In modern drivers, result is the updated document directly
    // If your driver returns an object wrapper, adjust accordingly.
    const doc = result?.value || result; // supports both styles[25][15]
    return res.status(200).json({ count: doc?.count ?? 0 });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return res.status(500).json({ error: 'Failed to update counter' });
  } finally {
    try { await client.close(); } catch {}
  }
}
