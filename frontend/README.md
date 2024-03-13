# Project Documentation

## Overview

This project is a web application built with Next.js, focusing on task management. It includes features such as user authentication, task editing, and displaying alerts. The application is structured to promote modularity and ease of development with a clear separation of concerns among components, services, and utility functions.

## Project Structure

The project is organized as follows:

- **README.md:** This file, containing documentation for the project.
- **app:** Contains the core frontend logic, structured into components and services.
  - **components:** Reusable UI components, each with its styling.
    - **alert, app_bar, edit_task, login, register, task:** UI components with their TypeScript files and CSS styles.
  - **services:** Contains services for API calls and Axios configuration.
  - **types:** TypeScript interfaces and types for responses, tasks, and users.
  - **globals.css:** Global CSS styles.
  - **layout.tsx:** The main layout component for the application.
- **pages:** Next.js pages, including middleware for authentication and entry points for login and registration.
- **public:** Static assets like images and icons.
- **utils:** Utility functions and constants.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

To build the application for production, run:

```bash
npm run build
```

Then, to start the production server, use:

```bash
npm start
```

## Usage

The application supports user registration, login, and task management. Users can add, edit, and delete tasks after logging in. Each component in the `app/components` directory corresponds to a specific feature or UI element of the application.
