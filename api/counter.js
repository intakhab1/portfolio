import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  // CORS headers — allow your site
  res.setHeader('Access-Control-Allow-Origin', 'https://home.iitk.ac.in');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    // Drivers often return { value: doc } for findOneAndUpdate; Mongoose returns doc directly.
    const doc = result?.value || result;
    const count = doc?.count ?? 0;

    return res.status(200).json({ count });
  } catch (err) {
    console.error('MongoDB Error:', err);
    return res.status(500).json({ error: 'Failed to update counter' });
  } finally {
    try { await client.close(); } catch {}
  }
}
