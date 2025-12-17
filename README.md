# 🗨️ Socai-Talk
### *Connect. Chat. Bond. Real-time.*

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![MERN](https://img.shields.io/badge/Stack-MERN-success) ![Socket.io](https://img.shields.io/badge/RealTime-Socket.io-orange) ![Vite](https://img.shields.io/badge/Frontend-Vite-purple)

---

## 🌟 Overview

**Socai-Talk** is a next-generation social chat platform designed for seamless, immersive communication. Built with the robust **MERN Stack** and powered by **Socket.io**, it delivers instant messaging, group interactions, and dynamic user engagement in a visually stunning interface.

Experience the depth of connection with real-time features that make conversations feel alive.

**[🌐 Live Demo](https://social-talk.vercel.app/)**

---

## 🚀 Key Features

### 💬 Immersive Chat Experience
*   **Real-time Messaging**: Instant delivery with `Socket.io` connection.
*   **One-on-One & Group Chats**: Create groups or chat privately. *Just Added!*
*   **Typing Indicators & Online Status**: See when friends are active or replying.

### 🔐 Secure & Smart Authentication
*   **JWT Security**: Robust session management.
*   **Email Verification**: Secure signup flow with OTP.
*   **Password Recovery**: Automated email-based reset system.

### 🎨 Modern UI/UX
*   **Responsive Design**: Flawless experience on Mobile, Tablet, and Desktop.
*   **Theme Engine**: Switch between light, dark, and custom themes managed by `Zustand`.
*   **Interactive Notifications**: Get alerted instantly when messages arrive.

### 🛠️ Powerful Backend
*   **Cloudinary Integration**: Fast and secure image/file uploads.
*   **MongoDB Architecture**: Scalable schemas for Users, Messages, and Groups.
*   **Secure API**: Protected routes with Authorization middleware.

---

## 📸 Snapshots

*(Add your application screenshots here)*

| Login Screen | Chat Dashboard |
|:---:|:---:|
| <img src="https://via.placeholder.com/400x200?text=Login+Screen" alt="Login" width="400"/> | <img src="https://via.placeholder.com/400x200?text=Chat+Interface" alt="Chat" width="400"/> |

| Group Mode | Profile Settings |
|:---:|:---:|
| <img src="https://via.placeholder.com/400x200?text=Group+Chat" alt="Group" width="400"/> | <img src="https://via.placeholder.com/400x200?text=Profile+Page" alt="Profile" width="400"/> |

---

## 🏗️ Technology Stack

We use the best tools to create the best experience.

| Layer | Technology | Badge |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) |
| **State** | Zustand | ![State](https://img.shields.io/badge/State-Zustand-orange) |
| **Backend** | Node.js, Express | ![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) |
| **Database** | MongoDB | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) |
| **Real-time** | Socket.io | ![Socket](https://img.shields.io/badge/Socket.io-black?style=flat&logo=socket.io&logoColor=white) |

---

## ⚙️ Installation & Setup

Want to run this locally? Follow these simple steps.

### Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/sachinkumar2222/Socai-Talk.git
cd Socai-Talk
```

### 2. Install Dependencies
**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 3. Application Configuration
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

### 4. Ignite the Engines 🚀
Open two terminals:

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```

Visit `http://localhost:5173` to start chatting!

---

## 🤝 Contributing

Got ideas? We'd love to hear them!
1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### *Authored by [Sachin Kumar](https://github.com/sachinkumar2222)*
