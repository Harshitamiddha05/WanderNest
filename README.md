# WanderNest

WanderNest is an AI-powered review intelligence platform designed for homestay and eco-tourism businesses.

## Overview

The platform helps property owners analyze guest reviews using AI to understand customer sentiment, identify recurring themes, and generate professional responses.

## Features

* Sentiment Analysis
* Theme Detection
* AI Response Generation
* Review Analytics Dashboard
* Responsive User Interface

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### Planned Backend & AI Integration

* Node.js
* Express.js
* MongoDB Atlas
* LLM Integration

## Project Structure

app/
components/
public/


## Pages

* Home
* About
* Dashboard
* Login

## Internship Module

AI-Assisted Full Stack Web Development

### Week 2 Deliverables

* Responsive Navbar
* Hero Section
* Reusable Card Component
* Footer Component
* About Page
* Dashboard Page
* Login Page
* Responsive Design using Tailwind CSS

## Run Locally

npm install
npm run dev

Open Browser and Visit:

http://localhost:3000

## Backend Setup

### Navigate to backend

cd backend

### Install dependencies

npm install

### Create environment file

Create a `.env` file inside the backend folder.

Example:

PORT=5000

### Start backend server

npm run dev

Backend runs on:

http://localhost:5000


### Frontend

From the project root:

npm install
npm run dev

Frontend runs on:

http://localhost:3000

### MongoDB Integration
- Connected the Express.js backend to MongoDB Atlas using Mongoose.
- Configured environment variables for secure database connectivity.
- Created a Review schema with field validation.

### CRUD Operations
- Implemented Create, Read, Update, Delete, and Search APIs for reviews.
- Added proper error handling and validation.

### API Testing
- Verified all REST API endpoints using Postman.
- Confirmed successful interaction with MongoDB Atlas.

### Frontend Integration
- Connected the Next.js frontend to the backend API using Axios.
- Displayed live review data fetched from MongoDB Atlas.
- Successfully verified end-to-end frontend and backend communication.