# TodoList-MERN
MERN Stack Todo List Application
Welcome to the MERN Stack Todo List application! This full-stack application allows users to sign up by activating their email and then log in to perform CRUD operations on their todos.

Features
Strong Backend=> User authentication with email activation
Create, Read, Update, and Delete (CRUD) operations on todos
Search functionality to filter todos
Responsive design for a seamless user experience

Technologies Used
MongoDB: Database for storing user information and todos.
Express.js: Backend framework for handling server-side logic and API routes.
React: Frontend library for building the user interface.
Node.js: JavaScript runtime for executing server-side code.
JWT (JSON Web Tokens): Used for secure user authentication.
React-Bootstrap: UI framework for styling and components.
Material-UI Icons: For adding search icon.
Toastify: Displaying notifications to users.
Axios: HTTP client for making API requests.
js-cookie: Handling cookies for user authentication.

Prerequisites
Make sure you have the following installed on your machine:

Node.js
MongoDB (Make sure MongoDB server is running)

Getting Started

Clone the repository:
git clone <repository-url>
cd <project-folder>


Install dependencies:
cd client && npm install
cd ../server && npm install
Set up environment variables:

Create a .env file in the server folder and configure the following variables:

env
REACT_APP_API=http://localhost:3001/api
MONGODB_URI=your-mongodb-connection-string
SECRET_KEY=your-secret-key
Run the application:

In the server folder:
npm start

In the client folder:
npm start

The application should be accessible at http://localhost:3000.

Usage
Open your browser and go to http://localhost:3000.
Sign up for a new account and activate your email.
Log in to access the dashboard.
Add, update, or delete todos as needed.
Use the search bar to filter todos based on title, content, labels, or dates.

Troubleshooting
If you encounter issues, make sure MongoDB is running, and the connection string is correctly set in the .env file.
Ensure all dependencies are installed by running npm install in both the client and server folders.

Enjoy using the MERN Stack Todo List application!
