# Employee Management Portal

A simple React web application for managing departments and employees.
Backend services: https://github.com/MariaLiu20/WebAPI

## Overview

This app demonstrates a frontend built with React, React Router, and React Bootstrap, connected to a backend Web API for CRUD operations.

### Features

- Department management
  - View department list
  - Add new departments
  - Edit existing departments
  - Delete departments
- Employee management
  - View employee list
  - Add new employees
  - Edit existing employees
  - Delete employees
- Responsive UI with modals for add/edit flows
- API integration using `fetch`

## Project structure

- `src/App.js` – main router and page layout
- `src/components/Department.jsx` – department list and actions
- `src/components/Employee.jsx` – employee list and actions
- `src/components/AddDepModal.jsx` / `EditDepModal.jsx` – department modals
- `src/components/AddEmpModal.jsx` / `EditEmpModal.jsx` – employee modals
- `src/components/NavBar.jsx` – navigation bar

## Quick start

Install dependencies:

```bash
npm install
```

Start the app in development mode:

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm start` — start the development server
- `npm test` — run tests
- `npm run build` — build the app for production

## Notes

- The app expects a backend API at `https://localhost:7067/api/Department` and `https://localhost:7067/api/Employee`.
- Employee and department forms submit JSON payloads to the API.
- The app uses React Router for navigation and React Bootstrap for UI components.
