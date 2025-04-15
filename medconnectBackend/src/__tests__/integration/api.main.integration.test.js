const request = require('supertest');
const app = require('../../server'); // Adjust the path to your server file
const symptomService = require('../../services/symptomService');
const doctorService = require('../../services/doctorService');

// Mock the services
jest.mock('../../services/symptomService');
jest.mock('../../services/doctorService');

describe('API Main Integration Tests', () => {
    describe('POST /api/symptoms', () => {
        it('should create a new symptom record and find doctors based on specialties', async () => {
            // Mock the response from createSymptomRecord
            symptomService.createSymptomRecord.mockResolvedValue({
                _id: 'symptom123',
                description: 'Severe headache and dizziness',
                language: 'en',
                specialties: ['neurology'],
                files: []
            });

            // Mock the response from findDoctors
            doctorService.findDoctors.mockResolvedValue([
                {
                    id: 'doc1',
                    name: 'Dr. Smith',
                    specialty: 'Neurology',
                    location: 'New York',
                    fee: 150,
                    qualifications: ['MD', 'PhD'],
                    experience: 10,
                    languages: ['English', 'Spanish'],
                    timing: '9 AM - 5 PM',
                    hospital: 'NYC Medical Center',
                    rating: 4.8,
                    totalPatients: 1200,
                    isAvailable: true
                }
            ]);

            const response = await request(app)
                .post('/api/symptoms')
                .send({
                    symptomDescription: 'Severe headache and dizziness',
                    language: 'en',
                    medicalReports: [] // Assuming no files for this test
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('recordId', 'symptom123');
            expect(response.body.data).toHaveProperty('specialties');
            expect(response.body.data).toHaveProperty('doctors');
            expect(response.body.data.doctors).toHaveLength(1);
            expect(response.body.data.doctors[0]).toHaveProperty('name', 'Dr. Smith');
        });
    });

    describe('POST /api/doctors', () => {
        it('should add a new doctor to the database', async () => {
            const newDoctorData = {
                name: 'Dr. Johnson',
                specialty: 'Cardiology',
                location: 'Boston',
                fee: 200,
                qualifications: ['MD'],
                experience: 15,
                languages: ['English'],
                timing: '10 AM - 6 PM',
                hospital: 'Boston Medical'
            };

            // Mock the response from createDoctorRecord
            doctorService.createDoctorRecord.mockResolvedValue({
                _id: 'doc123',
                ...newDoctorData
            });

            const response = await request(app)
                .post('/api/doctors')
                .send(newDoctorData);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Doctor profile added successfully');
            expect(response.body.data).toHaveProperty('_id', 'doc123');
            expect(response.body.data).toHaveProperty('name', 'Dr. Johnson');
        });

        it('should return an error if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/doctors')
                .send({}); // Sending empty data

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Missing required fields');
        });
    });
});