Job Board Application
A full-stack MERN application (using MySQL instead of MongoDB) for job seekers and employers, built with React + Vite + TailwindCSS for the frontend and Node.js + Express + Sequelize for the backend.
Features

User authentication with JWT and refresh tokens
Role-based access (Job Seeker and Employer)
Job posting, editing, and deletion (Employer only)
Job search and filtering with pagination
Job application submission with resume upload (Job Seeker only)
User profile management
Responsive UI with TailwindCSS
Error handling and toast notifications

Prerequisites

Node.js (v16 or higher)
MySQL server
Git (optional)

Setup Instructions
Backend

Navigate to the server directory:cd server


Install dependencies:npm install


Create a .env file in server/ with the following:PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=job_board
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key


Create the MySQL database:CREATE DATABASE job_board;


Create an uploads folder in server/:mkdir uploads


Start the backend:npm run dev



Frontend

Navigate to the client directory:cd client


Install dependencies:npm install


Create a .env file in client/ with the following:VITE_API_URL=http://localhost:5000/api


Start the frontend:npm run dev



Running the Application

Backend runs on http://localhost:5000
Frontend runs on http://localhost:5173
Access the app at http://localhost:5173

Folder Structure
job-board/
├── client/                       # Frontend (React + Vite + TailwindCSS)
├── server/                       # Backend (Node.js + Express + MySQL)
├── README.md

Technologies Used

Frontend: React, Vite, TailwindCSS, React Router, Axios, React Toastify
Backend: Node.js, Express, MySQL, Sequelize, JWT, Multer
Others: ES Modules, Environment Variables

Notes

Ensure MySQL is running and credentials are correct.
Place a favicon and logo in client/public/ and client/src/assets/.
Only PDF resumes are allowed for uploads (max 5MB).
