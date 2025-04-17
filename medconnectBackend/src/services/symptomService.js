const { MongoClient, ObjectId } = require('mongodb');

async function createSymptomRecord(symptomData) {
    const client = new MongoClient(process.env.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true
      });
      
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
    const client = new MongoClient(process.env.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true
      });
      
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