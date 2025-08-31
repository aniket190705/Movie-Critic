🎬 Movie Review Platform

A full-stack Movie Review Platform built with MERN stack (MongoDB, Express, React, Node.js).
Users can register/login, browse movies, add reviews, and maintain a personal watchlist.

✨ Features

🔑 User Authentication (Register & Login with JWT)

🎥 Movie Listing Page with search & filters (genre, year, rating)

⭐ Movie Detail Page with average rating, synopsis, and reviews

📝 Submit Reviews with star ratings

🎞️ User Watchlist (Add/Remove movies)

👤 User Profile Page (Review history + Watchlist)

⚡ Protected Routes (only logged-in users can post reviews or watchlist movies)

🚫 404 Page for invalid routes

🛠️ Tech Stack

Frontend: React + Tailwind CSS

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Authentication: JWT (JSON Web Token)

🚀 Getting Started

Follow these steps to run the project locally.

1. Clone the Repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Backend Setup
cd backend
npm install

Create a .env file inside backend/ with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start the backend server:

npm start

Backend will run at: http://localhost:5000


3. Frontend Setup
cd ../frontend
npm install

Create a .env file inside frontend/ with:

VITE_API_BASE=http://localhost:5000/api


Start the frontend:

npm run dev

Frontend will run at: http://localhost:5173


4. Open in Browser

Visit http://localhost:5173
 to use the app 🎉

📸 Screenshots (add later)

Home Page

Movie Detail Page

Profile Page

📂 Project Structure
Movie-Review-Platform/
├── backend/         # Node.js + Express + MongoDB backend
├── frontend/        # React + Tailwind frontend
└── README.md        # Project documentation

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.

✅ Just replace <your-username> and <repo-name> with your actual GitHub repo details.
