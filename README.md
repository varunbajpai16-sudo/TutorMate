# 🎓 TutorMate – Find the Right Tutor Near You

TutorMate is a full-stack MERN application that helps students and parents discover qualified tutors nearby. It provides role-based authentication, location-based tutor search, AI-powered assistance, and a modern responsive interface.

## 🚀 Live Demo

🌐 Live: https://mentor-owl.vercel.app/

📂 GitHub: https://github.com/varunbajpai16-sudo/TutorMate

---

## ✨ Features

### 👨‍🏫 Teacher Features
- Google Authentication
- Create and manage teaching profile
- Add subjects, classes, fees, experience, and education
- Set teaching mode (Online/Offline)
- Location-based visibility

### 👨‍🎓 Student Features
- Google Login
- Find tutors nearby
- Search tutors by subject
- View teacher profiles
- AI-powered educational assistant

### 👨‍👩‍👧 Parent Features
- Register children
- Search tutors based on child requirements
- Compare tutors by experience and fees

### 🤖 AI Integration
- AI-powered chatbot using OpenAI
- Instant academic assistance
- Learning guidance
- Question answering

### 📍 Location-Based Search
- MongoDB GeoSpatial Queries
- Find tutors within a selected radius
- Fast nearby tutor discovery

### 🔐 Authentication
- Google OAuth Login
- JWT Authentication
- Secure Protected Routes
- Role-Based Access Control

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Google OAuth
- Cloudinary

## AI
- OpenAI API

## Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

# 📂 Folder Structure

```
TutorMate
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

> Add screenshots here

- Home Page
- Teacher Dashboard
- Student Dashboard
- Tutor Search
- AI Chatbot

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/varunbajpai16-sudo/TutorMate.git
```

```bash
cd TutorMate
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_EXPIRY=10d

GOOGLE_CLIENT_ID=your_google_client_id

OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run Locally

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 🧠 Future Improvements

- Tutor Booking System
- Real-time Chat
- Video Calling
- Online Payment Integration
- Teacher Verification
- Reviews & Ratings
- Push Notifications
- AI Tutor Recommendation System

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Varun Bajpai**

GitHub: https://github.com/varunbajpai16-sudo

LinkedIn: *(Add your LinkedIn profile)*

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It motivates me to build more open-source projects.

---

## 📜 License

This project is licensed under the MIT License.
