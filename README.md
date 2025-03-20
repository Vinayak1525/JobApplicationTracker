Full Stack Project - ASP.NET Core Web API & React

This project consists of:

    Backend: ASP.NET Core Web API (uses an in-memory database)

    Frontend: React.js, Axios, CSS
    

Prerequisites
-------------

Before running the project, ensure you have the following installed:

.NET SDK
Node.js & npm
Axios for API Calls

    Clone Repository and run the server:
    
        1. git clone https://github.com/Vinayak1525/JobApplicationTracker.git
        2. cd JobApplicationTracker
        3. cd JobApplicationTrackerServer
        4. dotnet run -- project JobApplicationTrackerTracker.csproj
        5. Use the url for the server: http://localhost:5203/api/JobApplication
    
    Open Swagger UI:
    
        1. Once the application is running, open Swagger UI via the url: 
            http://localhost:5203/swagger/index.html
        
    Running the front-end:
    
        (Assuming you have already run the git clone command)
        1. cd JobApplicationTracker
        2. cd JobApplicationTrackerClient
        3. npm install
        4. npm start
        5. Frontend will be available at: http://localhost:5173/
    

You can build the server project using the command:
    dotnet build JobApplicationTrackerServer.csproj


            

API Configuration (If Needed)

The API uses an in-memory database, meaning data will be lost when the backend restarts.

Update appsettings.json in Server if you need to configure endpoints.



Additional Notes
----------------

Ensure the backend is running before starting the frontend.

If there are any CORS issues, update Program.cs in the Server to allow the frontend URL.
