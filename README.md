# MedConnect

## Problem Statement
In India, patients often struggle to find the right medical specialists for their specific health conditions. Language barriers, lack of medical knowledge, and difficulty interpreting medical reports further complicate this process, leading to delays in treatment and potential misdiagnoses.

## Solution Overview
MedConnect is an AI-driven patient-doctor matching platform that helps patients connect with the right medical specialists based on their symptoms and medical reports. 

### Key Technologies:
- **Frontend**: React.js for an interactive user interface
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Integration**: Gemini API for natural language processing of symptoms and medical reports
- **Multilingual Support**: Processing of patient descriptions in 22+ Indian languages

### Key Features:
- Voice chatbot for describing symptoms in multiple Indian languages
- Medical report analysis using AI
- Intelligent doctor matching based on identified specialties
- Easy appointment booking with filtering options

## Packages and Dependencies

### Backend Dependencies
The backend of MedConnect uses the following packages:
- **@google/generative-ai**: For AI functionalities.
- **axios**: For making HTTP requests.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables from a `.env` file.
- **express**: For building the web server.
- **mongodb**: For interacting with the MongoDB database.
- **multer**: For handling file uploads.
- **openai**: For integrating OpenAI's API.
- **pdf-parse**: For parsing PDF files.

### Frontend Dependencies
The frontend of MedConnect uses the following packages:
- **@testing-library/dom**: For testing DOM elements.
- **@testing-library/jest-dom**: For custom Jest matchers.
- **@testing-library/react**: For testing React components.
- **@testing-library/user-event**: For simulating user events.
- **react**: The core library for building user interfaces.
- **react-dom**: For DOM-related rendering.
- **react-router-dom**: For routing in React applications.
- **react-scripts**: For running scripts related to Create React App.
- **web-vitals**: For measuring performance metrics.
- **Web Speech API**: For voice recognition and input of symptoms.

## Setup & Installation
For detailed installation instructions, please refer to [INSTALLATION.md](./INSTALLATION.md)

## Usage Instructions

### For Patients:
1. Visit the homepage and click "Describe Symptoms"
2. Speak or type your symptoms in your preferred language
3. Optionally upload any medical reports you have
4. Review the list of recommended specialists
5. Filter by location, fees, or reviews

### For Doctors:
1. Click "Add Your Profile" on the homepage
2. Fill in your professional details including specialties, hospital affiliation, and location
<<<<<<< HEAD
3. Submit

## Testing Instructions

### Backend Testing

1. **Navigate to the Backend Directory**:
   Make sure you are in the backend directory:
   ```bash
   cd medconnect-backend
   ```

2. **Install Testing Dependencies**:
   Ensure you have Jest and Supertest installed in your backend directory:
   ```bash
   npm install --save-dev jest supertest
   ```

3. **Set Up Environment Variables**:
   Before running the integration tests, make sure to add your Gemini API key to the `.env` file:
   ```plaintext
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. **Run Tests**:
   You can run the tests using the following command:
   ```bash
   npm test
   ```

### Frontend Testing

1. **Navigate to the Frontend Directory**:
   Make sure you are in the frontend directory:
   ```bash
   cd medconnect-frontend
   ```

2. **Install Testing Dependencies**:
   Ensure you have React Testing Library and Jest installed in your frontend directory:
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom
   ```

3. **Run Tests**:
   You can run the tests using the following command:
   ```bash
   npm test
   ```
=======
3. Submit your profile for verification
4. Once verified, patients matching your specialty will be able to find you

>>>>>>> 4e42cce89f8b5fb9a2d3c890641b223ae725e5d3
## API Documentation

### Endpoints

#### 1. Submit Symptoms and Medical Reports
- **URL**: `/api/symptoms`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `symptomDescription` (string, required): Description of symptoms
  - `language` (string, optional): Language of the symptom description
  - `medicalReports` (file array, optional): PDF or image files of medical reports
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "recordId": "string",
      "specialties": ["string"],
      "doctors": [
        {
          "_id": "string",
          "name": "string",
          "specialty": "string",
          "hospital": "string",
          "location": "string"
        }
      ],
      "message": "string"
    }
  }
  ```

#### 2. Add Doctor Profile
- **URL**: `/api/doctors`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "string",
    "specialty": "string",
    "hospital": "string",
    "location": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Doctor profile added successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "specialty": "string",
      "hospital": "string",
      "location": "string"
    }
  }
  ```

#### 3. Get Doctors by Specialty
- **URL**: `/api/doctors`
- **Method**: `GET`
- **Query Parameters**:
  - `specialties` (string, optional): Comma-separated list of medical specialties
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "string",
        "name": "string",
        "specialty": "string",
        "hospital": "string",
        "location": "string"
      }
    ],
    "total": 0,
    "message": "string"
  }
  ```

## Demo Video Link
[Watch the Demo Video](https://youtu.be/5EY6k4h68Wk) - A short demo showcasing the MedConnect prototype in action.
