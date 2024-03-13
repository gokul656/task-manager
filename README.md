# Project Documentation

This documentation provides an overview and setup instructions for two distinct parts of a task management system: a backend service and a frontend application. The system is designed to facilitate user authentication and task management functionalities.

## Backend Service

### Overview

The backend service is structured to follow a clean architecture, separating concerns into distinct layers, including presentation, domain, data, and infrastructure. It is built to support features for user authentication and task management.

### Project Structure

The backend project is organized to include configurations, source code (`src`), and tests. Key directories include models and repositories for data management, business logic within the domain, technical implementations in the infrastructure, and web API controllers for presentation.

### Getting Started

- Ensure Node.js is installed.
- Install project dependencies with `npm install` or `yarn install`.
- Configure the database in `src/infrastructure/database/db.ts`.
- Start the application with `npm start` or `yarn start`.
- Run tests with `npm test` or `yarn test`.

## Frontend Application

### Overview

The frontend application is a web interface built with Next.js, focusing on task management. It features user authentication, task editing, and alert displays, promoting modularity and ease of development.

### Project Structure

The frontend project includes components, services, and utilities. It utilizes Next.js pages for routing and includes static assets in the `public` directory. Components are organized by feature, each with its TypeScript and CSS files.

### Getting Started

- Node.js and npm are required.
- Clone the repository and install dependencies via `npm install`.
- Start the development server with `npm run dev`.
- Build for production with `npm run build` and start the server with `npm start`.

## Usage

Both the backend and frontend parts support user registration, login, and task management functionalities. The frontend communicates with the backend through defined API endpoints to offer a complete user experience.
