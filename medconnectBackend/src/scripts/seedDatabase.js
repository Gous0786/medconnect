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
        name: "Dr. Emily Chen",
        specialty: "endocrinology",
        location: "Bangalore",
        fee: 1800,
        qualifications: ["MBBS", "MD", "DM Endocrinology"],
        experience: 14,
        timing: "Tue-Sat: 11:00 AM - 3:00 PM",
        hospital: "Manipal Hospitals",
        rating: 4.7,
        totalPatients: 4500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Amit Sharma",
        specialty: "nephrology",
        location: "Chennai",
        fee: 2200,
        qualifications: ["MBBS", "MD", "DM Nephrology"],
        experience: 16,
        timing: "Mon-Fri: 9:30 AM - 4:30 PM",
        hospital: "AIIMS",
        rating: 4.9,
        totalPatients: 5500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Priya Malhotra",
        specialty: "cardiology",
        location: "Pune",
        fee: 2500,
        qualifications: ["MBBS", "MD", "DM Cardiology"],
        experience: 18,
        timing: "Mon-Sat: 8:00 AM - 6:00 PM",
        hospital: "Narayana Health",
        rating: 4.8,
        totalPatients: 6500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Michael Rodrigues",
        specialty: "neurology",
        location: "Kolkata",
        fee: 2300,
        qualifications: ["MBBS", "MD", "DM Neurology"],
        experience: 17,
        timing: "Tue-Sat: 10:00 AM - 5:00 PM",
        hospital: "Medica Superspecialty Hospital",
        rating: 4.7,
        totalPatients: 4800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Ananya Reddy",
        specialty: "oncology",
        location: "Hyderabad",
        fee: 3000,
        qualifications: ["MBBS", "MD", "DM Oncology"],
        experience: 20,
        timing: "Mon-Fri: 9:00 AM - 4:00 PM",
        hospital: "Apollo Cancer Hospitals",
        rating: 4.9,
        totalPatients: 5200,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Rahul Khanna",
        specialty: "general surgery",
        location: "Delhi",
        fee: 2000,
        qualifications: ["MBBS", "MS General Surgery"],
        experience: 15,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Max Super Speciality Hospital",
        rating: 4.6,
        totalPatients: 5700,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Anjali Desai",
        specialty: "general medicine",
        location: "Ahmedabad",
        fee: 1600,
        qualifications: ["MBBS", "MD General Medicine"],
        experience: 13,
        timing: "Tue-Sat: 10:30 AM - 4:30 PM",
        hospital: "Zydus Hospitals",
        rating: 4.7,
        totalPatients: 6200,
        isAvailable: true
    }
    ,
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
    },
    // Cardiology
    {
        _id: new ObjectId(),
        name: "Dr. Vikram Sharma",
        specialty: "cardiology",
        location: "New Delhi",
        fee: 2500,
        qualifications: ["MBBS", "MD", "DM Cardiology"],
        experience: 16,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Max Super Speciality Hospital",
        rating: 4.9,
        totalPatients: 6800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Anita Desai",
        specialty: "cardiology",
        location: "Mumbai",
        fee: 2200,
        qualifications: ["MBBS", "MD", "DNB Cardiology", "FACC"],
        experience: 12,
        timing: "Mon-Sat: 10:00 AM - 4:00 PM",
        hospital: "Kokilaben Dhirubhai Ambani Hospital",
        rating: 4.7,
        totalPatients: 5200,
        isAvailable: true
    },
    
    // Neurology
    {
        _id: new ObjectId(),
        name: "Dr. Sunil Narayan",
        specialty: "neurology",
        location: "Bangalore",
        fee: 2300,
        qualifications: ["MBBS", "MD", "DM Neurology"],
        experience: 14,
        timing: "Tue-Sun: 10:00 AM - 6:00 PM",
        hospital: "Narayana Hrudayalaya",
        rating: 4.8,
        totalPatients: 5800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Leela Menon",
        specialty: "neurology",
        location: "Chennai",
        fee: 2100,
        qualifications: ["MBBS", "MD", "DM Neurology", "Fellowship in Stroke Medicine"],
        experience: 11,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Apollo Hospitals",
        rating: 4.6,
        totalPatients: 4900,
        isAvailable: true
    },
    
    // Orthopedics
    {
        _id: new ObjectId(),
        name: "Dr. Harpreet Singh",
        specialty: "orthopedics",
        location: "Chandigarh",
        fee: 1800,
        qualifications: ["MBBS", "MS Orthopedics", "Fellowship in Joint Replacement"],
        experience: 18,
        timing: "Mon-Sat: 9:00 AM - 3:00 PM",
        hospital: "PGIMER",
        rating: 4.9,
        totalPatients: 7200,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Farhan Ahmed",
        specialty: "orthopedics",
        location: "Hyderabad",
        fee: 1700,
        qualifications: ["MBBS", "DNB Orthopedics"],
        experience: 9,
        timing: "Mon-Fri: 5:00 PM - 9:00 PM",
        hospital: "Care Hospitals",
        rating: 4.5,
        totalPatients: 3900,
        isAvailable: true
    },
    
    // Dermatology
    {
        _id: new ObjectId(),
        name: "Dr. Shalini Kapoor",
        specialty: "dermatology",
        location: "New Delhi",
        fee: 1600,
        qualifications: ["MBBS", "MD Dermatology"],
        experience: 10,
        timing: "Mon-Wed-Fri: 11:00 AM - 7:00 PM",
        hospital: "Skin & Aesthetic Clinic",
        rating: 4.8,
        totalPatients: 8500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Vivek Malhotra",
        specialty: "dermatology",
        location: "Mumbai",
        fee: 1900,
        qualifications: ["MBBS", "DVD", "FAAD"],
        experience: 15,
        timing: "Tue-Thu-Sat: 10:00 AM - 6:00 PM",
        hospital: "Bombay Skin Clinic",
        rating: 4.9,
        totalPatients: 9200,
        isAvailable: true
    },
    
    // Ophthalmology
    {
        _id: new ObjectId(),
        name: "Dr. Kiran Rao",
        specialty: "ophthalmology",
        location: "Bangalore",
        fee: 1400,
        qualifications: ["MBBS", "MS Ophthalmology", "Fellowship in Cornea"],
        experience: 12,
        timing: "Mon-Sat: 9:00 AM - 5:00 PM",
        hospital: "Narayana Nethralaya",
        rating: 4.7,
        totalPatients: 6100,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Thomas Kurian",
        specialty: "ophthalmology",
        location: "Kochi",
        fee: 1300,
        qualifications: ["MBBS", "DO", "DNB Ophthalmology"],
        experience: 20,
        timing: "Mon-Fri: 10:00 AM - 4:00 PM",
        hospital: "Lisie Hospital",
        rating: 4.8,
        totalPatients: 12000,
        isAvailable: true
    },
    
    // ENT (Otolaryngology)
    {
        _id: new ObjectId(),
        name: "Dr. Neha Sharma",
        specialty: "ent",
        location: "Pune",
        fee: 1500,
        qualifications: ["MBBS", "MS ENT"],
        experience: 8,
        timing: "Mon-Fri: 10:00 AM - 6:00 PM",
        hospital: "Ruby Hall Clinic",
        rating: 4.6,
        totalPatients: 4800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Mahesh Nair",
        specialty: "ent",
        location: "Chennai",
        fee: 1600,
        qualifications: ["MBBS", "DLO", "DNB Otorhinolaryngology"],
        experience: 14,
        timing: "Mon-Sat: 9:00 AM - 3:00 PM",
        hospital: "Chennai ENT Hospital",
        rating: 4.7,
        totalPatients: 5600,
        isAvailable: true
    },
    
    // Pulmonology
    {
        _id: new ObjectId(),
        name: "Dr. Aditi Joshi",
        specialty: "pulmonology",
        location: "New Delhi",
        fee: 1800,
        qualifications: ["MBBS", "MD", "DM Pulmonary Medicine"],
        experience: 11,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Sir Ganga Ram Hospital",
        rating: 4.7,
        totalPatients: 5100,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Sanjay Gupta",
        specialty: "pulmonology",
        location: "Lucknow",
        fee: 1600,
        qualifications: ["MBBS", "MD Chest Medicine", "Fellowship in Interventional Pulmonology"],
        experience: 16,
        timing: "Mon-Sat: 10:00 AM - 4:00 PM",
        hospital: "SGPGI",
        rating: 4.8,
        totalPatients: 6700,
        isAvailable: true
    },
    
    // Psychiatry
    {
        _id: new ObjectId(),
        name: "Dr. Maya Srinivasan",
        specialty: "psychiatry",
        location: "Bangalore",
        fee: 2000,
        qualifications: ["MBBS", "MD Psychiatry"],
        experience: 9,
        timing: "Mon-Wed-Fri: 11:00 AM - 7:00 PM",
        hospital: "NIMHANS",
        rating: 4.9,
        totalPatients: 3800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Arjun Mathur",
        specialty: "psychiatry",
        location: "Mumbai",
        fee: 2200,
        qualifications: ["MBBS", "DPM", "MRCPsych"],
        experience: 12,
        timing: "Tue-Thu-Sat: 10:00 AM - 6:00 PM",
        hospital: "Mind Temple Clinic",
        rating: 4.8,
        totalPatients: 4300,
        isAvailable: true
    },
    
    // Gynecology
    {
        _id: new ObjectId(),
        name: "Dr. Ritu Khanna",
        specialty: "gynecology",
        location: "New Delhi",
        fee: 1900,
        qualifications: ["MBBS", "MD Obstetrics & Gynecology"],
        experience: 18,
        timing: "Mon-Sat: 10:00 AM - 2:00 PM",
        hospital: "Fortis La Femme",
        rating: 4.9,
        totalPatients: 11000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Lakshmi Rajagopal",
        specialty: "gynecology",
        location: "Chennai",
        fee: 1700,
        qualifications: ["MBBS", "DGO", "DNB Obstetrics & Gynecology"],
        experience: 14,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Apollo Cradle",
        rating: 4.8,
        totalPatients: 9800,
        isAvailable: true
    },
    
    // Pediatrics
    {
        _id: new ObjectId(),
        name: "Dr. Zoya Khan",
        specialty: "pediatrics",
        location: "Mumbai",
        fee: 1500,
        qualifications: ["MBBS", "DCH", "DNB Pediatrics"],
        experience: 10,
        timing: "Mon-Sat: 9:00 AM - 2:00 PM",
        hospital: "Surya Children's Hospital",
        rating: 4.7,
        totalPatients: 8200,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Vikrant Singh",
        specialty: "pediatrics",
        location: "Jaipur",
        fee: 1300,
        qualifications: ["MBBS", "MD Pediatrics", "Fellowship in Pediatric Neurology"],
        experience: 12,
        timing: "Mon-Fri: 10:00 AM - 6:00 PM",
        hospital: "JK Lon Hospital",
        rating: 4.6,
        totalPatients: 7500,
        isAvailable: true
    },
    
    // Urology
    {
        _id: new ObjectId(),
        name: "Dr. Rohit Mehta",
        specialty: "urology",
        location: "Delhi",
        fee: 2100,
        qualifications: ["MBBS", "MS", "MCh Urology"],
        experience: 15,
        timing: "Mon-Fri: 9:00 AM - 5:00 PM",
        hospital: "Medanta Hospital",
        rating: 4.8,
        totalPatients: 6300,
        isAvailable: true
    },
    // General Medicine
    {
        _id: new ObjectId(),
        name: "Dr. Anjali Verma",
        specialty: "general medicine",
        location: "Delhi",
        fee: 1200,
        qualifications: ["MBBS", "MD General Medicine"],
        experience: 10,
        timing: "Mon-Sat: 9:00 AM - 5:00 PM",
        hospital: "Apollo Hospital",
        rating: 4.5,
        totalPatients: 3000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Ramesh Kumar",
        specialty: "general medicine",
        location: "Mumbai",
        fee: 1500,
        qualifications: ["MBBS", "DNB General Medicine"],
        experience: 12,
        timing: "Mon-Fri: 10:00 AM - 6:00 PM",
        hospital: "Fortis Hospital",
        rating: 4.6,
        totalPatients: 4000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Priya Singh",
        specialty: "general medicine",
        location: "Bangalore",
        fee: 1300,
        qualifications: ["MBBS", "MD General Medicine"],
        experience: 8,
        timing: "Mon-Sun: 11:00 AM - 7:00 PM",
        hospital: "Manipal Hospital",
        rating: 4.7,
        totalPatients: 2500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Mohan Rao",
        specialty: "general medicine",
        location: "Hyderabad",
        fee: 1400,
        qualifications: ["MBBS", "MD General Medicine"],
        experience: 15,
        timing: "Mon-Sat: 9:00 AM - 4:00 PM",
        hospital: "KIMS Hospital",
        rating: 4.8,
        totalPatients: 3500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Neha Sharma",
        specialty: "general medicine",
        location: "Chennai",
        fee: 1600,
        qualifications: ["MBBS", "DNB General Medicine"],
        experience: 9,
        timing: "Mon-Fri: 10:00 AM - 5:00 PM",
        hospital: "Apollo Hospitals",
        rating: 4.5,
        totalPatients: 2800,
        isAvailable: true
    },
    // General Practice
    {
        _id: new ObjectId(),
        name: "Dr. Aditi Sharma",
        specialty: "general practice",
        location: "Delhi",
        fee: 1000,
        qualifications: ["MBBS", "MD General Practice"],
        experience: 8,
        timing: "Mon-Sat: 9:00 AM - 5:00 PM",
        hospital: "City Health Clinic",
        rating: 4.5,
        totalPatients: 1500,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Ravi Mehta",
        specialty: "general practice",
        location: "Mumbai",
        fee: 1200,
        qualifications: ["MBBS", "DNB General Practice"],
        experience: 10,
        timing: "Mon-Fri: 10:00 AM - 6:00 PM",
        hospital: "Health First Clinic",
        rating: 4.6,
        totalPatients: 2000,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Priya Nair",
        specialty: "general practice",
        location: "Bangalore",
        fee: 1100,
        qualifications: ["MBBS", "MD General Practice"],
        experience: 7,
        timing: "Mon-Sun: 11:00 AM - 7:00 PM",
        hospital: "Bangalore General Hospital",
        rating: 4.4,
        totalPatients: 1800,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Sunil Gupta",
        specialty: "general practice",
        location: "Hyderabad",
        fee: 1300,
        qualifications: ["MBBS", "DNB General Practice"],
        experience: 12,
        timing: "Mon-Sat: 9:00 AM - 4:00 PM",
        hospital: "Hyderabad Health Center",
        rating: 4.7,
        totalPatients: 2200,
        isAvailable: true
    },
    {
        _id: new ObjectId(),
        name: "Dr. Neha Joshi",
        specialty: "general practice",
        location: "Chennai",
        fee: 1250,
        qualifications: ["MBBS", "MD General Practice"],
        experience: 9,
        timing: "Mon-Fri: 10:00 AM - 5:00 PM",
        hospital: "Apollo General Clinic",
        rating: 4.5,
        totalPatients: 1600,
        isAvailable: true
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        const client = new MongoClient(process.env.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true
          });
          
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