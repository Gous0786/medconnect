const { MongoClient, ObjectId } = require('mongodb');
const { createSymptomRecord, getSymptomById } = require('../../services/symptomService');

// Mock MongoDB
jest.mock('mongodb');

describe('Symptom Service', () => {
  // Mock data
  const mockSymptomData = {
    userId: 'user123',
    description: 'Severe headache and dizziness',
    duration: '3 days',
    severity: 'high'
  };

  const mockSymptomRecord = {
    _id: new ObjectId('symptom123'), 
    userId: 'user123',
    description: 'Severe headache and dizziness',
    duration: '3 days',
    severity: 'high',
    createdAt: new Date('2024-04-01'),
    status: 'pending'
  };

  // Mock MongoDB implementation
  let mockCollection;
  let mockDb;
  let mockClient;

  beforeEach(() => {
    // Reset mock implementation for each test
    jest.clearAllMocks();

    // Mock MongoDB collection methods
    mockCollection = {
      insertOne: jest.fn().mockResolvedValue({ insertedId: 'symptom123' }),
      findOne: jest.fn().mockResolvedValue(mockSymptomRecord)
    };

    mockDb = {
      collection: jest.fn().mockReturnValue(mockCollection)
    };

    mockClient = {
      db: jest.fn().mockReturnValue(mockDb),
      close: jest.fn().mockResolvedValue(undefined)
    };

    MongoClient.connect = jest.fn().mockResolvedValue(mockClient);

    // Mock ObjectId to return a valid ObjectId
    ObjectId.mockImplementation((id) => {
      return { _id: id }; // Return an object with _id property
    });

    // Set environment variable
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
  });

  describe('createSymptomRecord', () => {
    it('should create a new symptom record', async () => {
      const result = await createSymptomRecord(mockSymptomData);

      // Verify MongoDB interactions
      expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
      expect(mockClient.db).toHaveBeenCalledWith('medconnect');
      expect(mockDb.collection).toHaveBeenCalledWith('symptoms');
      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        ...mockSymptomData,
        createdAt: expect.any(Date),
        status: 'pending'
      });
      expect(mockClient.close).toHaveBeenCalled();

      // Verify returned data
      expect(result).toEqual({
        _id: 'symptom123',
        ...mockSymptomData
      });
    });

    it('should handle database errors', async () => {
      mockCollection.insertOne.mockRejectedValue(new Error('Insert failed'));

      await expect(createSymptomRecord(mockSymptomData)).rejects.toThrow('Insert failed');
      expect(mockClient.close).toHaveBeenCalled();
    });

    it('should handle connection errors', async () => {
      MongoClient.connect.mockRejectedValue(new Error('Connection failed'));
      
      await expect(createSymptomRecord(mockSymptomData)).rejects.toThrow('Connection failed');
    });
  });

  describe('getSymptomById', () => {
    it('should retrieve a symptom record by id', async () => {
      const symptomId = 'symptom123'; 
      const result = await getSymptomById(symptomId);

      // Verify MongoDB interactions
      expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI);
      expect(mockClient.db).toHaveBeenCalledWith('medconnect');
      expect(mockDb.collection).toHaveBeenCalledWith('symptoms');
      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId(symptomId) 
      });
      expect(mockClient.close).toHaveBeenCalled();

      // Verify returned data
      expect(result).toEqual(mockSymptomRecord);
    });

    it('should return null when no symptom is found', async () => {
      mockCollection.findOne.mockResolvedValue(null);
      
      const result = await getSymptomById('nonexistent');
      
      expect(result).toBeNull();
      expect(mockClient.close).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      mockCollection.findOne.mockRejectedValue(new Error('Find failed'));

      await expect(getSymptomById('symptom123')).rejects.toThrow('Find failed');
      expect(mockClient.close).toHaveBeenCalled();
    });
  });
});