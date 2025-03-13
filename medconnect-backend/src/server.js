// Load .env configuration first, before other imports
require('dotenv').config();

// Add debug logging
console.log('Environment variables loaded:', {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_URI?.substring(0, 20) + '...', // Only show start of URI for security
    hasDeepseekKey: !!process.env.DEEPSEEK_API_KEY
});

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { processReport } = require('./services/reportProcessor');
const { createSymptomRecord } = require('./services/symptomService');
const { MongoClient } = require('mongodb');
const { createDoctorRecord } = require('./services/doctorService');

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

// Update CORS configuration to allow multiple origins
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5001'],
    credentials: true
}));

// Or use a function to handle origins dynamically
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001'];
        // Check if origin is in allowed list or if it's undefined (non-browser requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Add request validation middleware
const validateSymptomRequest = (req, res, next) => {
    if (!req.body.symptomDescription) {
        return res.status(400).json({
            success: false,
            message: 'Symptom description is required'
        });
    }
    next();
};

// Update route with validation
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
                message: specialties.length > 0 
                    ? `Identified ${specialties.length} specialties`
                    : 'No specialties identified'
            }
        });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
});

// Add new route for adding a doctor
app.post('/api/doctors', async (req, res, next) => {
    try {
        const doctorData = req.body;

        // Validate incoming data (you can add more validation as needed)
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

// Add error handling middleware after all routes
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// Move server startup to separate function for better error handling
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