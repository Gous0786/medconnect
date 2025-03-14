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

## Setup & Installation
For detailed installation instructions, please refer to [INSTALLATION.md](./INSTALLATION.md)

## Usage Instructions

### For Patients:
1. Visit the homepage and click "Describe Symptoms"
2. Speak or type your symptoms in your preferred language
3. Optionally upload any medical reports you have
4. Review the list of recommended specialists
5. Filter by location, fees, or reviews
6. Book an appointment with your chosen doctor

### For Doctors:
1. Click "Add Your Profile" on the homepage
2. Fill in your professional details including specialties, hospital affiliation, and location
3. Submit your profile for verification
4. Once verified, patients matching your specialty will be able to find you

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
[Coming Soon] A short demo showcasing the MedConnect prototype in action.
