const { MongoClient } = require('mongodb');
const { findDoctors, createDoctorRecord } = require('../../services/doctorService');

// Mock MongoDB
jest.mock('mongodb');

describe('Doctor Service', () => {
  // Mock data
  const mockDoctors = [
    {
      _id: 'doc1',
      name: 'Dr. Smith',
      specialty: 'Cardiology',
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
    },
    {
      _id: 'doc2',
      name: 'Dr. Johnson',
      specialty: 'Neurology',
      location: 'Boston',
      fee: 200,
      qualifications: ['MD'],
      experience: 15,
      languages: ['English'],
      timing: '10 AM - 6 PM',
      hospital: 'Boston Medical',
      rating: 4.5,
      totalPatients: 900,
      isAvailable: true
    }
  ];

  // Mock MongoDB implementation
  let mockCollection;
  let mockDb;
  let mockClient;
  let mockConnect;
  
  beforeEach(() => {
    mockCollection = {
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue(mockDoctors),
      insertOne: jest.fn().mockResolvedValue({ insertedId: 'new-doc-id' })
    };

    mockDb = {
      collection: jest.fn().mockReturnValue(mockCollection)
    };

    mockClient = {
      db: jest.fn().mockReturnValue(mockDb),
      close: jest.fn().mockResolvedValue(undefined)
    };

    mockConnect = jest.fn().mockResolvedValue(mockClient);
    MongoClient.connect = mockConnect;

    // Set environment variable
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findDoctors', () => {
    it('should connect to MongoDB and find doctors by specialties', async () => {
      const specialties = ['cardiology', 'neurology'];
      const result = await findDoctors(specialties);

      // Verify MongoDB interactions
      expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
      expect(mockClient.db).toHaveBeenCalled();
      expect(mockDb.collection).toHaveBeenCalledWith('doctors');
      expect(mockCollection.find).toHaveBeenCalledWith({
        specialty: { 
          $in: expect.arrayContaining([
            expect.any(RegExp),
            expect.any(RegExp)
          ])
        }
      });
      expect(mockClient.close).toHaveBeenCalled();

      // Verify returned data format
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'doc1',
        name: 'Dr. Smith',
        specialty: 'Cardiology',
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
      });
    });

    it('should handle errors during database operations', async () => {
      MongoClient.connect.mockRejectedValue(new Error('Connection failed'));
      
      await expect(findDoctors(['cardiology'])).rejects.toThrow('Connection failed');
    });
  });

  describe('createDoctorRecord', () => {
    it('should create a new doctor record', async () => {
      const doctorData = {
        name: 'Dr. Stevens',
        specialty: 'Dermatology',
        location: 'Chicago',
        fee: 175,
        qualifications: ['MD'],
        experience: 8,
        languages: ['English', 'French'],
        timing: '8 AM - 4 PM',
        hospital: 'Chicago Medical',
        rating: 4.7,
        totalPatients: 800
      };

      const result = await createDoctorRecord(doctorData);

      // Verify MongoDB interactions
      expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
      expect(mockClient.db).toHaveBeenCalledWith('medconnect');
      expect(mockDb.collection).toHaveBeenCalledWith('doctors');
      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        ...doctorData,
        createdAt: expect.any(Date),
        isAvailable: true // This remains as is
      });
      expect(mockClient.close).toHaveBeenCalled();

      // Verify returned data
      expect(result).toEqual({
        _id: 'new-doc-id',
        ...doctorData
      });
    });

    it('should close the connection even when an error occurs', async () => {
      mockCollection.insertOne.mockRejectedValue(new Error('Insert failed'));

      await expect(createDoctorRecord({})).rejects.toThrow('Insert failed');
      expect(mockClient.close).toHaveBeenCalled();
    });
  });
});