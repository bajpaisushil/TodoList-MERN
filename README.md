# TodoList-MERN
MERN Stack Todo List Application
Welcome to the MERN Stack Todo List application! This full-stack application allows users to sign up by activating their email and then log in to perform CRUD operations on their todos.

Features:
1. Strong Backend=> User authentication with email activation
2. Create, Read, Update, and Delete (CRUD) operations on todos
3. Search functionality to filter todos
4. Responsive design for a seamless user experience

Technologies Used:
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

Prerequisites:
Make sure you have the following installed on your machine:

Node.js
MongoDB (Make sure MongoDB server is running)

Getting Started

Clone the repository:
git clone https://github.com/bajpaisushil/TodoList-MERN.git
cd <project-folder>

Install dependencies:
cd client && npm install
cd ../server && npm install

Set up environment variables:
Create a .env file in the server folder and configure the following variables:
REACT_APP_API=http://localhost:3001/api
MONGODB_URI=your-mongodb-connection-string
SECRET_KEY=your-secret-key

Run the application:
In the server folder:
npm start

In the client folder:
npm start

The application should be accessible at http://localhost:3000.

Usage:
1. Open your browser and go to http://localhost:3000.
2. Sign up for a new account and activate your email.
3. Log in to access the dashboard.
4. Add, update, or delete todos as needed.
5. Use the search bar to filter todos based on title, content, labels, or dates.

Troubleshooting:
- If you encounter issues, make sure MongoDB is running, and the connection string is correctly set in the .env file.
- Ensure all dependencies are installed by running npm install in both the client and server folders.

Enjoy using the MERN Stack Todo List application!

1. Signup Page
   ![signup-page](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/1f206e4f-893e-4bc2-86d1-d377f1ea59ee)

2. Check your entered e-mail
   ![Screenshot 2023-12-05 093149](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/e9e4b846-a972-4b1d-9cb6-f10056c6fee2)

3. Activate Account
   ![Screenshot 2023-12-05 093200](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/5ec43693-af3c-452e-9cb2-493c721ea341)

4. Dashboard
   ![Screenshot 2023-12-05 092926](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/8b4075b0-0c61-4e06-9460-87032cce83bb)

5. Create a Todo
   ![Screenshot 2023-12-05 093002](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/48de2125-7d4a-4625-95af-e391e3dcd643)

6. Update a Todo
   ![Screenshot 2023-12-05 093011](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/abf3269d-24e0-471f-8eb8-e7b0836fcb3c)

7. Delete a Todo
   ![Screenshot 2023-12-05 093021](https://github.com/bajpaisushil/TodoList-MERN/assets/111970311/2d60efa6-7e73-47bf-9683-b0b3ed8bf046)
