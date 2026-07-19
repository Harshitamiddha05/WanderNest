# 🌿 WanderNest

WanderNest is an AI-powered review intelligence platform designed for homestay and eco-tourism businesses. The platform enables property owners to analyze customer reviews, understand guest sentiment, identify recurring themes, manage reviews, and securely authenticate users through JWT-based authentication.

---

# 📌 Project Overview

WanderNest helps eco-tourism businesses make data-driven decisions by leveraging AI and modern web technologies. The platform provides review management, sentiment analysis, authentication, and an interactive dashboard to improve customer experience.

---

# 🚀 Features

## Review Management

- Create Reviews
- View All Reviews
- View Review by ID
- Update Reviews
- Delete Reviews
- Search Reviews

## AI Features

- AI-powered Guest Review Analysis
- Sentiment Analysis
- Confidence Score Generation
- Theme Detection (Positive & Negative)
- AI-generated Review Summary
- Business Recommendations
- Review Analytics Dashboard

## Authentication & Security

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected API Routes
- Duplicate Email Validation
- Invalid Login Handling

## User Interface

- Responsive Design
- Modern Dashboard
- Mobile Friendly
- Dark Mode Support (if enabled)

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Hugging Face Inference API

## Development Tools

- Git
- GitHub
- Postman
- MongoDB Compass / MongoDB Atlas

---

# 📂 Project Structure

```
WanderNest
│
├── app
├── components
├── public
│
├── backend
|   ├── config
|   ├── controllers
|   ├── middleware
|   ├── models
|   ├── routes
|   ├── services
|   ├── server.js
|   └── package.json
│
├── README.md
└── package.json
```

---

# 📄 Pages

- Home
- About
- Dashboard
- Login
- Reviews

---

# 🔗 API Endpoints

## Authentication APIs

| Method | Endpoint | Description |
|----------|----------------------|-------------------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Protected Profile Route |

---

## Review APIs

| Method | Endpoint | Description |
|----------|---------------------------|----------------|
| GET | /api/reviews | Get All Reviews |
| GET | /api/reviews/:id | Get Review by ID |
| POST | /api/reviews | Create Review |
| PUT | /api/reviews/:id | Update Review |
| DELETE | /api/reviews/:id | Delete Review |
| GET | /api/reviews/search?q= | Search Reviews |

---

## AI APIs

| Method | Endpoint | Description |
|----------|---------------------------------|-------------------------------------------|
| POST | /api/ai/review-analysis | Analyze a guest review using Hugging Face AI |

Example Request

```json
{
  "review": "The room was clean and spacious. Staff were friendly but the WiFi was slow."
}
```

Example Response

```json
{
  "success": true,
  "data": {
    "sentiment": "Positive",
    "confidence": "90%",
    "summary": "Guests appreciated the cleanliness and staff, but reported slow WiFi.",
    "positive_themes": [
      "Cleanliness",
      "Friendly Staff"
    ],
    "negative_themes": [
      "Slow WiFi"
    ],
    "business_suggestions": [
      "Improve internet connectivity.",
      "Maintain current service quality."
    ]
  }
}
```
# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Harshitamiddha05/WanderNest.git
```

## Navigate

```bash
cd WanderNest
```

---

# ▶ Frontend Setup

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# ▶ Backend Setup

Navigate

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
HF_API_KEY=<your_huggingface_api_key>
```

Run Backend

```bash
npm run dev
```

Backend:

```
http://localhost:5000
```

---

# 🗄 Database

MongoDB is used to store:

- User Accounts
- Reviews
- Authentication Data

Mongoose is used for schema definition and validation.

---

# 🔐 Authentication Flow

1. User Registration
2. Password hashed using bcrypt
3. User Login
4. JWT Token Generated
5. Protected Routes verified using JWT middleware

---

# 🧪 API Testing

All APIs were tested using Postman.

Verified APIs include:

- User Registration
- User Login
- Protected Route
- Create Review
- Get Reviews
- Update Review
- Delete Review
- Search Reviews
- AI Review Analysis Endpoint

---

# 📚 Internship Progress

## Week 2

- Responsive UI
- Navbar
- Hero Section
- Footer
- Dashboard
- About Page

## Week 5

- MongoDB Integration
- Mongoose Models
- CRUD APIs
- Search API
- Frontend-Backend Integration
- Postman Testing

## Week 6

- User Authentication
- JWT Implementation
- Password Hashing (bcrypt)
- Protected Routes
- Authentication Middleware
- Secure Login & Registration

---
## Week 7

- Integrated Hugging Face AI API
- Implemented AI-powered Guest Review Analyzer
- Added Sentiment Analysis
- Added Confidence Score Generation
- Added Theme Detection
- Added AI-generated Review Summary
- Added Business Recommendations
- Connected AI Backend with Next.js Frontend
- Implemented Loading and Error Handling
- Tested AI APIs using Postman

# 👩‍💻 Author

**Harshita Middha**

AI-Assisted Full Stack Web Development Internship

TBI-GEU

---

# ⭐ Future Enhancements

- Google OAuth Login
- GitHub OAuth Login
- Batch Review Analysis
- Multilingual Review Analysis
- AI-generated Reply Suggestions
- Advanced Analytics Dashboard
- Review Trend Visualization
- Email Verification
- Password Reset
- Role-Based Authorization
