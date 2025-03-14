# MedConnect

MedConnect is a full-stack application consisting of a backend and a frontend. This README provides instructions for setting up both parts of the application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Common Installation Instructions](#common-installation-instructions)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (for the backend)

## Common Installation Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Gous0786/medconnect.git
   cd medconnect
   ```

2. **Install Dependencies**:
   You will need to install dependencies for both the backend and frontend. Follow the instructions in their respective sections below.

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
   Create a `.env` file in the `medconnect-backend` directory and add your environment variables. For example:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Backend**:
   You can start the backend server using:
   ```bash
   npm run dev
   ```

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

## Additional Information

- **Testing**: 
  - For the backend, you can run tests using:
    ```bash
    npm test
    ```
  - For the frontend, you can run tests using:
    ```bash
    npm test
    ```

- **Seeding the Database**: 
  If you need to seed the database, you can run:
  ```bash
  npm run seed
  ```

## Conclusion

You should now have both the backend and frontend of the MedConnect application set up and running. If you encounter any issues, please check the respective package documentation or reach out for help.