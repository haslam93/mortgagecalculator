# OptimalBlue Bank App

A 3-tier mortgage application with a React frontend, Node.js Express backend, and SQLite database.

## Structure

- `client/`: React application (Vite + Tailwind CSS)
- `server/`: Node.js Express API + SQLite

## Prerequisites

- Node.js (v18+ recommended)

## Setup

1.  Install dependencies:
    ```bash
    cd server && npm install
    cd ../client && npm install
    ```

## Running the App

You can run the full app using the VS Code Task "Run App".

Or manually:

1.  Start the server:
    ```bash
    cd server
    npm run dev
    ```
    Server runs on http://localhost:3001

2.  Start the client:
    ```bash
    cd client
    npm run dev
    ```
    Client runs on http://localhost:5173

## Features

- View current mortgage rates (seeded in DB)
- Calculate monthly mortgage payments
