# Starweb Integrated Platform

This is the complete source code for the Starweb Platform, containing the Server, Sales Tool, Admin Tool, and Customer Portal.

## Directory Structure
- `server/`: Node.js + Express Backend with MongoDB, Socket.io, and Auth.
- `sales-tool/`: React + Tailwind CSS Frontend for Public Lead Intake.
- `admin-tool/`: React + Tailwind CSS Frontend for Internal Operations (CRM, Projects).
- `customer-portal/`: React + Tailwind CSS Mobile-First Frontend for Client Interaction.

## Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

## Setup & Run

### 1. Server
```bash
cd server
npm install
# Create a .env file with MONGO_URI and JWT_SECRET if needed
npm start
```
Runs on `http://localhost:5000`

### 2. Sales Tool
```bash
cd sales-tool
npm install
npm run dev
```
Runs on `http://localhost:5173` (default)

### 3. Admin Tool
```bash
cd admin-tool
npm install
npm run dev
```
Runs on `http://localhost:5174` (default)

### 4. Customer Portal
```bash
cd customer-portal
npm install
npm run dev
```
Runs on `http://localhost:5175` (default)

## Features Implemented
- **Auth**: JWT-based authentication with Role-Based Access Control (RBAC).
- **Real-time Chat**: Socket.io integration in Server and Customer Portal.
- **CRM**: Lead management and conversion in Admin Tool.
- **Project Management**: Project tracking and status updates.
- **Mobile-First**: Customer portal designed for mobile usage.
