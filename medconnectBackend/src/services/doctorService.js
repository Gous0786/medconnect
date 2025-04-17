const { MongoClient } = require('mongodb');

async function findDoctors(specialties) {
    try {
        console.log('Finding doctors for specialties:', specialties);
        
        const client = new MongoClient(process.env.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true
          });
          
        const db = client.db();

        // Find doctors that match any of the specialties (case-insensitive)
        const doctors = await db.collection('doctors').find({
            specialty: { 
                $in: specialties.map(s => new RegExp(s, 'i')) 
            }
        }).toArray();

        console.log(`Found ${doctors.length} matching doctors`);

        // Close the connection
        await client.close();

        // Return formatted doctor data
        return doctors.map(doctor => ({
            id: doctor._id,
            name: doctor.name,
            specialty: doctor.specialty,
            location: doctor.location,
            fee: doctor.fee,
            qualifications: doctor.qualifications,
            experience: doctor.experience,
            languages: doctor.languages,
            timing: doctor.timing,
            hospital: doctor.hospital,
            rating: doctor.rating,
            totalPatients: doctor.totalPatients,
            isAvailable: doctor.isAvailable
        }));
    } catch (error) {
        console.error('Error finding doctors:', error);
        throw error;
    }
}

// Function to create a new doctor record
async function createDoctorRecord(doctorData) {
    const client = new MongoClient(process.env.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true
      });
      
    const db = client.db('medconnect');

    try {
        const result = await db.collection('doctors').insertOne({
            ...doctorData,
            createdAt: new Date(),
            isAvailable: true
        });

        return {
            _id: result.insertedId,
            ...doctorData
        };
    } finally {
        await client.close();
    }
}

module.exports = { createDoctorRecord, findDoctors };