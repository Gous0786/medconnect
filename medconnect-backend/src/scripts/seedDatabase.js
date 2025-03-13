require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const doctors = [
    {
        _id: new ObjectId(),
        name: "Dr. Sarah Johnson",
        specialty: "gastroenterology",
        location: "New Delhi",
        fee: 1500,
        qualifications: ["MBBS", "MD", "DM Gastroenterology"],
        experience: 12,
        timing: "Mon-Fri: 10:00 AM - 4:00 PM",
        hospital: "Apollo Hospitals",
        rating: 4.8,
        totalPatients: 5000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Rajesh Kumar",
        specialty: "hepatology",
        location: "Mumbai",
        fee: 2000,
        qualifications: ["MBBS", "MD", "DM Hepatology"],
        experience: 15,
        timing: "Mon-Sat: 9:00 AM - 5:00 PM",
        hospital: "Fortis Hospital",
        rating: 4.9,
        totalPatients: 6000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Priya Patel",
        specialty: "internal medicine",
        location: "Bangalore",
        fee: 1200,
        qualifications: ["MBBS", "MD Internal Medicine"],
        experience: 8,
        timing: "Tue-Sun: 11:00 AM - 7:00 PM",
        hospital: "Manipal Hospital",
        rating: 4.7,
        totalPatients: 4000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Amit Shah",
        specialty: "gastroenterology",
        location: "Chennai",
        fee: 1800,
        qualifications: ["MBBS", "MD", "DNB Gastroenterology"],
        experience: 10,
        timing: "Mon-Fri: 9:00 AM - 6:00 PM",
        hospital: "Global Hospitals",
        rating: 4.6,
        totalPatients: 4500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Meera Reddy",
        specialty: "hepatology",
        location: "Hyderabad",
        fee: 1700,
        qualifications: ["MBBS", "MD", "DM Hepatology"],
        experience: 14,
        timing: "Mon-Sat: 10:00 AM - 5:00 PM",
        hospital: "KIMS Hospital",
        rating: 4.8,
        totalPatients: 5500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. John Abraham",
        specialty: "internal medicine",
        location: "Kolkata",
        fee: 1300,
        qualifications: ["MBBS", "MD Internal Medicine", "FCCP"],
        experience: 9,
        timing: "Mon-Fri: 11:00 AM - 8:00 PM",
        hospital: "Ruby General Hospital",
        rating: 4.5,
        totalPatients: 3500,
        isAvailable: true
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        // Drop existing doctors collection
        console.log('Dropping existing doctors collection...');
        await db.collection('doctors').drop().catch(() => {
            console.log('No existing doctors collection to drop');
        });

        // Insert new doctors
        console.log('Inserting new doctors...');
        const result = await db.collection('doctors').insertMany(doctors);
        console.log(`Successfully inserted ${result.insertedCount} doctors`);

        // Create indexes
        console.log('Creating indexes...');
        await db.collection('doctors').createIndex({ specialty: 1 });
        await db.collection('doctors').createIndex({ location: 1 });
        await db.collection('doctors').createIndex({ isAvailable: 1 });

        console.log('Database seeding completed successfully');
        await client.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedDatabase(); 