import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
    // Immediately set content type to JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!uri) {
        return res.status(500).json({
            error: "Server misconfiguration",
            details: "MONGODB_URI environment variable is missing"
        });
    } // <- ADD THIS MISSING CLOSING BRACE

    const client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
    });

    try {
        await client.connect();
        const db = client.db("visitor_counter");
        const visits = db.collection("visits");
        
        const result = await visits.findOneAndUpdate(
            { _id: "total_visits" },
            { $inc: { count: 1 } },
            { returnDocument: 'after', upsert: true }
        );

        // CHANGE THIS: Use result.count instead of result.value.count
        return res.status(200).json({ count: result.count });

    } catch (error) {
        console.error("MongoDB Error:", error);
        return res.status(500).json({
            error: "Database operation failed",
            details: error.message
        });
    } finally {
        await client.close().catch(console.error);
    }
}
