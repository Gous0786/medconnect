# MedConnect Installation Guide

This guide provides detailed instructions for setting up the MedConnect application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (for the backend)

## Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Gous0786/medconnect.git
   cd medconnect
   ```

## Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd medconnect-backend
   ```

2. **Install Backend Dependencies**:
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `medconnect-backend` directory and add your environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Backend**:
   You can start the backend server using:
   ```bash
   npm run dev
   ```
   The server should start on port 5000 (or the port specified in your .env file).

## Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd medconnect-frontend
   ```

2. **Install Frontend Dependencies**:
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   You can start the frontend application using:
   ```bash
   npm start
   ```
   The application should open on port 5001(by default) or the port specified in .env file

## Verifying the Installation

To verify that everything is working correctly:

1. The frontend should be accessible at: http://localhost:3000
2. The backend API should be accessible at: http://localhost:5000/api

You can test the API by sending a GET request to http://localhost:5000/api/doctors

## Troubleshooting

### Common Issues and Solutions:

1. **MongoDB Connection Errors**:
   - Ensure MongoDB is running on your machine
   - Verify your connection string in the .env file
   - Check network settings if using a remote MongoDB instance

2. **Port Already in Use**:
   - Change the PORT value in your .env file
   - Find and terminate the process using the port

3. **Missing Dependencies**:
   - Run `npm install` again in both directories
   - Check package.json files for consistency

4. **CORS Issues**:
   - Ensure the frontend URL is included in the allowed origins in server.js its port 5001 for frontend and 5000  for backend by the way

## Additional Setup Options

### Seeding the Database
If you need to seed the database with sample data, you can run:
```bash
npm run seed
```
This will populate your MongoDB with sample doctors and specialties for testing.

### Running Tests
- For the backend:
  ```bash
  npm test
  ```
- For the frontend:
  ```bash
  npm test
  ```
