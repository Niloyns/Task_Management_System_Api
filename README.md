# Task API

This project is a Task API that allows users to create, read, update, and delete task items. It also includes user authentication features.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
    - [Signup](#signup)
    - [Login](#login)
  - [Task Routes](#task-routes)
    - [Create a Task](#create-a-task)
    - [Create Multiple Tasks](#create-multiple-tasks)
    - [Get All Tasks](#get-all-tasks)
    - [Update a Task](#update-a-task)
    - [Delete a Task](#delete-a-task)
    - [Delete Multiple Tasks](#delete-multiple-tasks)
    - [Search Tasks](#search-tasks)
- [Middlewares](#middlewares)
- [Running the Project](#running-the-project)
- [License](#license)

## Features

- User authentication (signup, login)
- Create, read, update, delete task items
- Fetch tasks specific to a user

## Requirements

- Node.js
- Express
- MongoDB
- JWT
- bcrypt
- dotenv
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Niloyns/Task_API
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/taskapi
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

**_User Authentication_**

- `POST /signup` **For Singup/Registation User**
- `POST /login` **For Login User**

**_Task Routes_**

- `POST /task` **Create a new task**
- `POST /task/all` **Create multiple tasks**
- `GET /task` **Get all tasks**
- `GET /task/search` **Search tasks by title `/task/search?task=search`**
- `PUT /task/:id` **Update a task**
- `DELETE /task/:id` **Delete a task**
- `POST /task/deleteMany` **Delete multiple tasks**
- `GET /task/search` **Search tasks**
- `POST /change-password"` **change a user's password**

### Authentication Routes

- **Signup**

  ```http
  POST /signup
  ```

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "message": "User registered successfully"
  }
  ```

- **Login**

  ```http
  POST /login
  ```

  **Request Body:**

  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Task Routes

All task routes require a valid JWT token to be passed in the `Authorization` header.

- **Create a Task**

  ```http
  POST /task
  ```

  **Request Body:**

  ```json
  {
    "title": "New Task",
    "description": "Task description"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Task created successfully"
  }
  ```

- **Create Multiple Tasks**

  ```http
  POST /task/all
  ```

  **Request Body:**

  Ensure your request body is an array of task objects like this:

  ```json
  [
    {
      "title": "Task 1",
      "description": "Description 1"
    },
    {
      "title": "Task 2",
      "description": "Description 2"
    }
  ]
  ```

  **Response:**

  ```json
  {
    "message": "Successfully inserted multiple tasks"
  }
  ```

- **Get All Tasks**

  ```http
  GET /task
  ```

  **Response:**

  ```json
  {
    "tasks": [
      {
        "title": "Task 1",
        "description": "Description 1",
        "user": {
          "name": "John Doe",
          "username": "johndoe"
        }
      },
      {
        "title": "Task 2",
        "description": "Description 2",
        "user": {
          "name": "John Doe",
          "username": "johndoe"
        }
      }
    ]
  }
  ```

- **Update a Task**

  Find the task by ID from the request parameters

  ```http
  PUT /task/:id
  ```

  **Request Body:**

  ```json
  {
    "title": "Updated Task",
    "description": "Updated description"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Task updated successfully"
  }
  ```

- **Delete a Task**

  Find the task by ID from the request parameters

  ```http
  DELETE /task/:id
  ```

  **Response:**

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

- **Delete Multiple Tasks**

  Find the many task by multiple ID from the request parameters

  ```http
  POST /task/deleteMany
  ```

  **Request Body:**

  ```json
  {
    "ids": ["id1", "id2", "id3"]
  }
  ```

  **Response:**

  ```json
  {
    "message": "X tasks deleted"
  }
  ```

- **Change a user's password**

  Expected paramiter in body username, currentpassword, newpassword

  ```http
  POST /task/change-password
  ```

  **Request Body:**

  ```json
  {
    "username": "",
    "currentpassword": "",
    "newpassword": ""
  }
  ```

  **Response:**

  ```json
  {
    "message": "Password changed successfully"
  }
  ```

- **Search Tasks**

  ```http
  GET /task/search?title=searchTerm
  ```

  **Response:**

  - Respond with the found tasks

  ```json
  {
    "tasks": [
      {
        "title": "Searched Task",
        "description": "Description of searched task"
      }
    ]
  }
  ```

## Running the Project

To run the project, ensure that MongoDB is running on your machine, then start the server using:

```bash
npm start
```
