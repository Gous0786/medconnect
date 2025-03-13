const { MongoClient, ObjectId } = require('mongodb');

async function createSymptomRecord(symptomData) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('medconnect');

    try {
        const result = await db.collection('symptoms').insertOne({
            ...symptomData,
            createdAt: new Date(),
            status: 'pending'
        });

        return {
            _id: result.insertedId,
            ...symptomData
        };
    } finally {
        await client.close();
    }
}

async function getSymptomById(symptomId) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('medconnect');

    try {
        return await db.collection('symptoms').findOne({
            _id: new ObjectId(symptomId)
        });
    } finally {
        await client.close();
    }
}

module.exports = { createSymptomRecord, getSymptomById }; 