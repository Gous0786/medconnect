
require('dotenv').config();

// debug logging
console.log('Environment variables loaded:', {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_URI?.substring(0, 20) + '...', // starting part of uri;>
});

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { processReport } = require('./services/reportProcessor');
const { createSymptomRecord } = require('./services/symptomService');
const { MongoClient } = require('mongodb');
const { createDoctorRecord, findDoctors } = require('./services/doctorService');

const app = express();
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept PDFs and images
        if (file.mimetype === 'application/pdf' || 
            file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and image files are allowed'));
        }
    }
});

// Cors config
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5001'],
    credentials: true
}));


app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

const validateSymptomRequest = (req, res, next) => {
    if (!req.body.symptomDescription) {
        return res.status(400).json({
            success: false,
            message: 'Symptom description is required'
        });
    }
    next();
};

//symptom api 
app.post('/api/symptoms', 
    upload.array('medicalReports'),
    validateSymptomRequest,
    async (req, res, next) => {
    try {
        const { symptomDescription, language } = req.body;
        const reportFiles = req.files || [];

        // Process the medical reports and description using Gemini API
        const specialties = await processReport(symptomDescription, reportFiles, language);
        console.log('Identified specialties:', specialties);

        // Find doctors based on specialties
        const doctors = await findDoctors(specialties);
        console.log(`Found ${doctors.length} matching doctors`);

        // Create a new symptom record in database
        const symptomRecord = await createSymptomRecord({
            description: symptomDescription,
            language,
            specialties,
            files: reportFiles.map(file => file.filename)
        });

        // Send response with all relevant data
        res.json({
            success: true,
            data: {
                recordId: symptomRecord._id,
                specialties,
                doctors,
                message: doctors.length > 0 
                    ? `Found ${doctors.length} matching doctors across ${specialties.length} specialties`
                    : 'No matching doctors found for the identified specialties'
            }
        });
    } catch (error) {
        next(error);
    }
});

//  route for adding a doctor
app.post('/api/doctors', async (req, res, next) => {
    try {
        const doctorData = req.body;

        // Validate incoming data 
        if (!doctorData.name || !doctorData.specialty || !doctorData.hospital || !doctorData.location) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create a new doctor record in the database
        const newDoctor = await createDoctorRecord(doctorData);

        res.status(201).json({
            success: true,
            message: 'Doctor profile added successfully',
            data: newDoctor
        });
    } catch (error) {
        next(error);
    }
});

// route for fetching doctors
app.get('/api/doctors', async (req, res, next) => {
    try {
        const specialties = req.query.specialties ? req.query.specialties.split(',') : []; // Split specialties into an array
        console.log('Received specialties for doctor search:', specialties); // Log the received specialties

        const doctors = await findDoctors(specialties); // Call the findDoctors function with the specialties
        
        console.log('Doctors found:', doctors); // Log the doctors found
        
        res.json({
            success: true,
            data: doctors,
            total: doctors.length,
            message: `Found ${doctors.length} doctors matching your criteria`
        });
    } catch (error) {
        next(error);
    }
});

//error handling middleware after all routes
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

const startServer = async () => {
    try {
        // Test MongoDB connection before starting server
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        await client.close();
        console.log('MongoDB connection successful');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 
module.exports=app;
