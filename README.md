Full Stack Project - ASP.NET Core Web API & React

This project consists of:

    Backend: ASP.NET Core Web API (uses an in-memory database)

    Frontend: React
    

Prerequisites
-------------

Before running the project, ensure you have the following installed:

.NET SDK

Node.js & npm



    Running the Project:

    	1. Start the Backend (ASP.NET Core Web API)
    
            Navigate to the Server directory
    
            Restore dependencies
    
            Run the application:
    
            API will be available at: http://localhost:5203/api/JobApplication/
    
    
    	2. Start the Frontend (React with Vite)
    
            Navigate to the Client directory
    
            Install dependencies
    
            Start the development server
    
            Frontend will be available at: http://localhost:5173/
            

API Configuration (If Needed)

The API uses an in-memory database, meaning data will be lost when the backend restarts.

Update appsettings.json in Server if you need to configure endpoints.



Additional Notes
----------------

Ensure the backend is running before starting the frontend.

If there are any CORS issues, update Program.cs in the Server to allow the frontend URL.
