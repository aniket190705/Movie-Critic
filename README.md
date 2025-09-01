#  Movie Review Platform

A **full-stack Movie Review** Platform built with MERN stack (MongoDB, Express, React, Node.js). Users can register/login, browse movies, add reviews, and maintain a personal watchlist.

## 🚀 Live Demo

🔗 **Try it here:** [Movie Review Platform Demo](https://movie-critic-henna.vercel.app/)  


## 📑 Table of Contents
- [Setup & Installation](#-setup--installation)
- [API Documentation](#-api-documentation)
- [Database Setup](#-database-setup)
- [Environment Variables](#-environment-variables)
- [Design Decisions & Notes](#-design-decisions--notes)
- [License](#-license)

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/aniket190705/Movie-Critic.git
cd Movie-Critic
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs at: http://localhost:5000

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

## 📖 API Documentation
### 🔐 Authentication
POST /api/auth/register → Register a new user

POST /api/auth/login → Login & receive JWT
### 🎥 Movies
GET /api/movies → List all movies (supports filters: genre, year, rating)

GET /api/movies/:id → Fetch details for a specific movie (includes reviews)

POST /api/movies/:id/reviews → Submit a review (requires authentication)

POST /api/movies → Add a new movie (placeholder, not implemented)
### 👤 Users
GET /api/users/:id → Get user profile + reviews

PUT /api/users/:id → Update user profile (self only)

GET /api/users/:id/watchlist → Get user watchlist

POST /api/users/:id/watchlist → Add a movie to watchlist

DELETE /api/users/:id/watchlist/:movieId → Remove movie from watchlist

### 🗄️ Database Setup

Database: **MongoDB**

Collections:

- users

- movies

- reviews

### Seed Data

Seed the database with at least 10 popular Hollywood and Indian movies.

### Movie Document Example:

```bash
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": 2010,
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
  "synopsis": "A thief who enters dreams to steal secrets is offered a chance at redemption.",
  "posterUrl": "https://example.com/inception.jpg"
}
```

## 🔧 Environment Variables
### Backend (backend/.env)
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
### Frontend (frontend/.env)
```bash
VITE_API_BASE=http://localhost:5000/api
```
## 📝 Design Decisions & Notes
- **Authentication**: Implemented with JWT; token persists to maintain login state across refreshes.

- **Frontend Routing**: React Router is used for navigation, with a custom 404 page for undefined routes.

- **Validation**: Reviews require a valid star rating before submission.

- **Watchlist**: Stored per user, allowing add/remove functionality.

- **Scalability**: Code structured to allow future addition of features such as admin panel, comments, or likes/dislikes.

- **Styling**: TailwindCSS for a responsive, modern UI.


## 📄 License

This project is licensed under the MIT License.
##
