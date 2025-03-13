const { MongoClient, ObjectId } = require('mongodb');

// Remove the entire findDoctors function

// Function to create a new doctor record
async function createDoctorRecord(doctorData) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('medconnect');

    try {
        const result = await db.collection('doctors').insertOne({
            ...doctorData,
            createdAt: new Date(),
            isAvailable: doctorData.isAvailable || false // Default to false if not provided
        });

        return {
            _id: result.insertedId,
            ...doctorData
        };
    } finally {
        await client.close();
    }
}

module.exports = { createDoctorRecord }; // Export the new function 