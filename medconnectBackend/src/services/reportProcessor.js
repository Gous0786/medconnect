const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function processReport(description, reportFiles, language) {
    try {
        let medicalContent = `Patient Description: ${description}`;
        // Process each report file
        if (reportFiles && reportFiles.length > 0) {
            for (const file of reportFiles) {
                console.log('Processing file:', {
                    name: file.originalname,
                    type: file.mimetype,
                    size: file.size
                });

                let reportContent;
                if (file.mimetype === 'application/pdf') {
                    try {
                        const dataBuffer = fs.readFileSync(file.path);
                        const pdfData = await pdfParse(dataBuffer);
                        reportContent = pdfData.text;
                        
                        if (!reportContent || reportContent.trim().length === 0) {
                            console.warn(`Warning: No text content extracted from PDF ${file.originalname}`);
                            continue;
                        }
                    } catch (pdfError) {
                        console.error(`Error parsing PDF ${file.originalname}:`, pdfError);
                        continue;
                    }
                } else if (file.mimetype.startsWith('image/')) {
                    reportContent = `Image Content from ${file.originalname}`;
                } else {
                    reportContent = fs.readFileSync(file.path, 'utf-8');
                }

                reportContent = cleanReportContent(reportContent);
                if (reportContent.trim()) {
                    medicalContent += `\n\nMedical Report (${file.originalname}):\n${reportContent}`;
                }

                // Cleanup: Delete the uploaded file after processing
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${file.originalname}:`, err);
                    } else {
                        console.log(`Successfully deleted file ${file.originalname}`);
                    }
                });
            }
        }

        console.log('Sending request to Gemini API');

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Create content in the correct format
        const prompt = {
            contents: [{
                parts: [{
                    text: `Act as a medical specialist. Your task is to analyze the following patient information and identify the most relevant medical specialties that should be consulted.

Patient Information:
${medicalContent}

Instructions:
1. Analyze the symptoms and medical reports
2. Identify the most relevant medical specialties
3. Provide your response ONLY as a comma-separated list of specialties in lowercase
4. Do not include any other text or explanations

Example response format:
cardiology, neurology, endocrinology`
                }]
            }]
        };

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log('Gemini API Response:', response.text());

        const specialties = parseSpecialties(response.text());
        console.log('Parsed Specialties:', specialties);
        return specialties;
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            status: error?.status,
            errorDetails: error?.errorDetails,
            stack: error.stack
        });
        throw error;
    }
}

function cleanReportContent(content) {
    return content
        // Remove any non-printable characters
        .replace(/[^\x20-\x7E\n]/g, '')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove multiple newlines
        .replace(/\n+/g, '\n')
        // Trim extra whitespace
        .trim();
}

function parseSpecialties(aiResponse) {
    // Simple parsing 
    const specialties = aiResponse.toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    return specialties;
}

module.exports = { processReport }; 