// src/__tests__/unit/reportProcessor.test.js
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { processReport } = require('../../services/reportProcessor');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path'); 

jest.mock('fs');

jest.mock('fs');
jest.mock('pdf-parse');
jest.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockResolvedValue({
                    response: {
                        text: jest.fn().mockReturnValue('cardiology, neurology, endocrinology')
                    }
                })
            })
        }))
    };
});

describe('processReport', () => {
    const fakePdfBuffer = Buffer.from('Fake PDF buffer');
    const fakePdfText = 'This is a fake medical PDF report content.';
    const mockFilePath = path.join(__dirname, 'fake-file.pdf');

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock fs.readFileSync for PDF
        fs.readFileSync.mockImplementation((filePath) => {
            if (filePath.endsWith('.pdf')) return fakePdfBuffer;
            return 'Some other file content';
        });

        // Mock pdfParse to return fake text
        pdfParse.mockResolvedValue({ text: fakePdfText });

        // Mock fs.unlink to always succeed
        fs.unlink.mockImplementation((_, cb) => cb(null));
    });

    it('should return parsed specialties from the Gemini API', async () => {
        const fakeDescription = 'Patient has chest pain and dizziness.';
        const fakeFiles = [
            {
                originalname: 'report1.pdf',
                mimetype: 'application/pdf',
                path: mockFilePath,
                size: 1234
            }
        ];
        const result = await processReport(fakeDescription, fakeFiles, 'en');

        expect(result).toEqual(['cardiology', 'neurology', 'endocrinology']);
        expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath);
        expect(pdfParse).toHaveBeenCalledWith(fakePdfBuffer);
    });

    it('should handle empty file list', async () => {
        const result = await processReport('General checkup', [], 'en');
        expect(result).toEqual(['cardiology', 'neurology', 'endocrinology']);
    });

    it('should skip unsupported file types gracefully', async () => {
        const fakeFiles = [
            {
                originalname: 'notes.txt',
                mimetype: 'text/plain',
                path: 'file.txt',
                size: 100
            }
        ];
        const result = await processReport('Back pain issues', fakeFiles, 'en');
        expect(result).toEqual(['cardiology', 'neurology', 'endocrinology']);
    });

    it('should skip PDF if parsing fails', async () => {
        pdfParse.mockRejectedValueOnce(new Error('Failed to parse PDF'));

        const fakeFiles = [
            {
                originalname: 'corrupted.pdf',
                mimetype: 'application/pdf',
                path: 'corrupted.pdf',
                size: 1000
            }
        ];
        const result = await processReport('Severe headaches', fakeFiles, 'en');
        expect(result).toEqual(['cardiology', 'neurology', 'endocrinology']);
    });
});