# Project Documentation

## Overview

This project is structured to facilitate a clean architecture, separating concerns into distinct layers, including presentation, domain, data, and infrastructure. It is designed for a task management system, with features for user authentication and task management.

## Project Structure

The project is organized as follows:

- **babel.config.js:** Configuration file for Babel, used to compile TypeScript to JavaScript.
- **package-lock.json & package.json:** These files manage project dependencies and scripts.
- **src:** This directory contains the source code, further organized into subdirectories:
  - **app.ts:** The entry point for the application.
  - **config.ts:** Configuration settings for the application.
  - **data:** Contains models and repositories for data management.
    - **models:** Sequelize models for tasks and users.
    - **repositories:** Implementations of the repository interfaces.
  - **domain:** Contains business logic, entities, and interfaces.
    - **entities:** Business models.
    - **interfaces:** Repository interfaces for abstraction.
    - **use_cases:** Application-specific business rules.
  - **infrastructure:** Technical details that support the application.
    - **database:** Database configuration and initialization.
    - **middlewares:** Express middlewares for authentication, error handling, and validation.
  - **presentation:** Web API controllers.
  - **swagger.ts & swagger_config.ts:** Swagger documentation setup.
- **tests:** Contains unit tests for services.
- **tsconfig.json:** TypeScript compiler configuration file.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- SQL database (configured in `src/infrastructure/database/db.ts`)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Configure the database settings in `src/infrastructure/database/db.ts`.
4. Start the application:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

### Running Tests

To run the unit tests, execute:

```bash
npm test
```

or

```bash
yarn test
```

## Usage

After starting the application, it will be accessible via HTTP. The API endpoints are defined under `src/presentation/controllers` and include authentication and task management functionalities.
