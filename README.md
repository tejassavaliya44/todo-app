# Todo App APIs

The system allows users register an account and manage their todos.

## Technology Stack

- **Node.js** for handling API requests and background processing.
- **Express.js**: Web framework for creating APIs.
- **MongoDB** for storing data.

## Getting Started

1. Clone the repository

2. Set Environment Variables

   - Make sure to configure the .env file with necessary environment variables as per .env.sample file

3. Start the project

   - npm start

4. Accessing the services:
   - Backend: Running on **http://localhost:${PORT}$**

## Project Structure

1. **`controllers/`**: Contains the logic for registering and logging user in, perform CRUD on Todos and list todos for specific date.

2. **`middlewares/`**: Contains middlewares to effectively handle application errors and validate API request structure and tokens.

3. **`models/`**: This directory contains mongoose schemas for todo and users.

4. **`routes/`**: Defines the API routes for authentication and todos.

5. **`services/`**: This directory contains the logic to establish connection with mongoDB database, schedule and send reminder mail to user.

6. **`utils/`**: Contains app constants and API validations.

7. **`.env.sample`**: The `.env.sample` file contains names of environment variables required to configure the backend.

8. **`README.md`**: This file itself, containing the documentation of the project structure, setup instructions, and usage details.

## API Endpoints

Base EndPoint: **"http://localhost:${PORT}$/api"**

1. **/authentication/signup** - register user

   method: POST

   **Payload** :

   ```
   {
        "username": "xyz",
        "email": "xyz@gmail.com",
        "password": "abc123"
   }
   ```

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": {userData}
   }
   ```

2. **/authentication/login** - user login

   method: POST

   **Payload** :

   ```
   {
        "username": "xyz",
        "password": "abc123"
   }
   ```

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": {...userData, token}
   }
   ```

3. **/todo/create** - creates a todo and schedules an email reminder

   method: POST
   header: {Authorization: Bearer ${token}}

   **Payload** :

   ```
   {
        "title": "todo title",
        "description": "description",
        "due_date": "2025-03-07",
        "reminder_time": "2025-03-07T18:30:00.835Z"
   }
   ```

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": {todoData}
   }
   ```

4. **/todo/:${todoId}** - get todo

   method: GET
   header: {Authorization: Bearer ${token}}

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": {todoData}
   }
   ```

5. **/todo/:${todoId}** - update todo details

   method: PATCH
   header: {Authorization: Bearer ${token}}

   **Payload** :

   ```
   {
        "title": "updated title"
   }
   ```

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": {
        ...todoData,
        "title": "updated title"
        }
   }
   ```

6. **/todo/:${todoId}** - remove todo

   method: DELETE
   header: {Authorization: Bearer ${token}}

   **Succesful Response** :

   ```
   {
       "message": "success message"
   }
   ```

7. **/todo/status/complete/:${todoId}** - mark todo as completed

   method: PATCH
   header: {Authorization: Bearer ${token}}

   **Succesful Response** :

   ```
   {
       "message": "success message",
        "data": {todoData}
   }
   ```

8. **/todo/status/pending/:${todoId}** - unmark todo from completed

   method: PATCH
   header: {Authorization: Bearer ${token}}

   **Succesful Response** :

   ```
   {
       "message": "success message",
        "data": {todoData}
   }
   ```

9. **/todo/list** - get todo list for particular date

   method: POST
   header: {Authorization: Bearer ${token}}

   **Payload** :

   ```
   {
        "due_date": "2025-07-02"
   }
   ```

   **Succesful Response** :

   ```
   {
       "message": "success message",
       "data": [
            { todoData }
        ]
   }
   ```

## Contributing

- Fork the repository and clone it to your local machine.
- Create a new branch for your changes.
- Make your changes and ensure they are working correctly by running tests (if any).
- Submit a pull request with a clear description of the changes you made.
