# Role-Based Access Control (RBAC) System

Soorya Narayanan  
Email: thesooryanarayanan@gmail.com

---

## Introduction

### Project Overview
The **Role-Based Access Control (RBAC)** system is designed to manage user permissions based on their roles. It consists of three main roles: **Admin**, **Manager**, and **Employee**. Each role has different levels of access and control over the system's functionality.

- **Admin**: Full control over users, tasks, and permissions.
- **Manager**: Can assign tasks and manage employee progress.
- **Employee**: Can update task statuses.

### Project Link
[Live Project](https://rbac-client-ho7b.onrender.com)  
(Note: The server takes 50 seconds to start due to the hosting platform.)

### Hosting Platform
Render (render.com)

### GitHub Link
[GitHub Repository](https://github.com/thesoorya/Role-Based-Access-Control-System)

---

## Purpose
The system ensures secure access to sensitive data and actions based on user roles. Admins have full access, Managers can assign tasks, and Employees can update task statuses.

---

## Project Architecture

### Overall Structure
The system is a web-based application consisting of both frontend and backend components.

- **Frontend**: Built with **React.js**, handling user interface and interaction.
- **Backend**: **Node.js** with **Express.js** for API endpoints, and **MongoDB** for storing user and task data.

---

## Frontend Development

### Technologies Used

- **React.js**: Used to create a dynamic and responsive UI for the application.
- **React Router**: Used for navigation between different views such as the login page, dashboards, and task assignment pages.
- **Axios**: Used to make HTTP requests to the backend API.
- **React Context API**: Used for global state management, such as storing user data and authentication status.
- **CSS**: Used for styling the frontend, including responsive design for different screen sizes.

### Key Features Implemented

- **Role-based routing**: Based on the user’s role (Admin, Manager, or Employee), users are redirected to their respective dashboards.
- **Login & Authentication**: Admin can create accounts, users can log in, and their sessions are stored in local storage for persistence.
- **Protected Routes**: Only authenticated users with the correct roles can access specific routes (e.g., Admin dashboard, Manager dashboard).
- **Toast Notifications**: Using the **react-hot-toast** library to notify users about actions such as successful login or errors.

### How It Works

#### Login Flow
1. The user logs in by submitting their credentials via the login page.
2. On successful authentication, a JWT token is saved in the local storage, and the user’s role is fetched from the backend.
3. The user is redirected to their dashboard based on their role (Admin, Manager, or Employee).

#### Role-Based Redirection
- Upon login, based on the user role, the system redirects to the appropriate dashboard.
- Admins can manage users, Managers can assign tasks, and Employees can update task statuses.

---

## Backend Development

### Technologies Used

- **Node.js & Express.js**: Used to create the API for handling requests like login, fetching user data, creating tasks, etc.
- **MongoDB**: Database for storing user and task data.
- **JWT Authentication**: Used for securing API endpoints, ensuring that only authenticated users can access them.
- **Mongoose**: ORM used to interact with MongoDB.
- **Axios (on the client-side)**: Used to make requests from the frontend to the backend.

### Key Features Implemented:

#### User Authentication:
- **Signup**: Admins can create an account.
- **Login**: Authenticated using JWT. On successful login, the backend returns a token, which is used for subsequent requests to secure routes.
- **Logout**: Clears the session by removing the JWT token.

#### Role Management:
- Each user is assigned a role (Admin, Manager, Employee) during signup.
- Admin can create, edit, and delete users, including role assignment.
- Managers can assign tasks to employees and monitor their progress.

#### Task Management:
- Managers can assign tasks to employees. Employees can update the task status.
- Admin can view all users and tasks.

#### Middleware for Role-Based Access Control:
- **Protect Routes**: Only users with the required roles can access specific routes (Admin, Manager, Employee).
- **JWT Verification Middleware**: Ensures that every request to protected routes has a valid JWT token.

### How It Works

#### Role-based Access:
- Role-based middleware is applied to routes to ensure that only the appropriate user roles can access certain resources.
- Admin users have access to all routes, Managers can access only Manager-related routes, and Employees can only interact with task-related endpoints.

---

## Challenges Faced:

- **Server Connectivity Delays**: Dealt with potential delay in server response from the hosting platform by implementing proper loading states and feedback to the user.
- **Role-based Redirection**: Ensuring that users are redirected to their respective dashboards based on their roles.
- **JWT Authentication**: Managing token-based authentication and securely storing tokens on the client side.

---

## API’s

### Authentication Routes

#### POST
- `/auth/signup` (Create user)
- `/auth/login` (Login)
- `/auth/logout` (Logout)

#### GET
- `/auth/me` (Get logged-in user details)

### Task Routes

#### POST
- `/tasks/` (Create task)

#### GET
- `/tasks/gettasks` (Get all tasks)
- `/tasks/getusertasks/:userId` (Get tasks for a specific user)
- `/tasks/:id` (Get a single task by ID)

#### PUT
- `/tasks/:id` (Edit task by ID)

#### DELETE
- `/tasks/:id` (Delete task by ID)

### User Routes

#### GET
- `/users/getusers` (Get all users)
- `/users/getbyrole/:role` (Get users by role)
- `/users/:id` (Get single user by ID)

#### PUT
- `/users/:id` (Edit user by ID)

#### DELETE
- `/users/:id` (Delete user by ID)

---

## Conclusion

In this project, I successfully implemented a **Role-Based Access Control (RBAC)** system with a clean separation of concerns between the frontend and backend. The system is flexible, allowing easy role management and task assignments. The architecture is designed to be scalable, enabling the addition of more roles or features in the future.

### Skills Gained:
- Web development using **React.js** and **Node.js**.
- Authentication and authorization using **JWT**.
- Working with **MongoDB** and **Mongoose**.
- Implementing secure and role-based access control.

---

## Credentials:

### Admin:
- Email: johndoe@admin.com  
- Password: password

### Manager:
- Email: jamesdoe@manager.com, gokul@manager.com  
- Password: password

### Employee:
- Email: janedoe@employee.com, soorya@employee.com  
- Password: password

---

Thank you for reviewing this project!
