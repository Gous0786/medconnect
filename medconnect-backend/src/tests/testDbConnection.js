const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB.');
        
        const db = client.db('medconnect');
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        const doctorCount = await db.collection('doctors').countDocuments();
        console.log('Number of doctors in database:', doctorCount);
        
        await client.close();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

testConnection(); 