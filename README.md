<div align="center">

# 📝 Todo List Application

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=2196F3&center=true&vCenter=true&width=500&lines=Full+Stack+MERN+Application;User+Authentication;CRUD+Operations;Modern+UI%2FUX)](https://git.io/typing-svg)

**Full-Stack Todo Management System** | **MERN Stack** | **JWT Authentication** 🚀

</div>

---

## ✨ Features

**🔐 User Authentication**
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Persistent login sessions

**📋 Todo Management**
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Priority levels (Low, Medium, High)
- Due date tracking
- Real-time todo filtering by user

**🎨 Responsive UI**
- Clean and intuitive interface
- Form validation and error handling
- Loading states and user feedback
- Mobile-friendly design

---

<div align="center">

## 🛠️ Tech Stack

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/bcrypt-338?style=for-the-badge&logo=letsencrypt&logoColor=white" />
<img src="https://img.shields.io/badge/CORS-FF6C37?style=for-the-badge&logo=cors&logoColor=white" />
</p>

</div>

---

## 📁 Project Structure

```
todo-app/
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   │   ├── User/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── Pages/
│   │   │       └── Todo.js
│   │   └── App.js
│   └── public/
│       └── index.html
└── backend/
    ├── config/
    │   └── mongodb.js
    ├── controller/
    │   └── controller.js
    ├── middleware/
    │   └── middleware.js
    ├── model/
    │   └── model.js
    ├── route/
    │   └── route.js
    └── server.js
```

---

## 🚀 Installation & Setup

### Prerequisites
```bash
Node.js (v14 or higher)
MongoDB (local installation or MongoDB Atlas)
npm or yarn package manager
```

### Backend Setup

**1. Clone and navigate to backend**
```bash
git clone <repository-url>
cd todo-app/backend
```

**2. Install dependencies**
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

**3. Environment Configuration**
Create `.env` file in backend root:
```env
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

**4. Start backend server**
```bash
node server.js
```
Server runs on `http://localhost:5000`

### Frontend Setup

**1. Navigate to frontend**
```bash
cd ../frontend
```

**2. Install dependencies**
```bash
npm install react react-dom
```

**3. Start development server**
```bash
npm start
```
Application opens on `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |

### Todos (Protected Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | Get all user todos |
| `GET` | `/api/todos/:id` | Get specific todo |
| `POST` | `/api/todos` | Create new todo |
| `PUT` | `/api/todos/:id` | Update todo |
| `DELETE` | `/api/todos/:id` | Delete todo |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API status |
| `GET` | `/health` | Health check |

---

## 📊 Data Models

### User Model
```javascript
{
  username: String (required, 3-15 characters),
  email: String (required, unique, lowercase),
  password: String (required, min 6 characters, hashed),
  timestamps: true
}
```

### Todo Model
```javascript
{
  title: String (required, max 50 characters),
  description: String (required, max 500 characters),
  completed: Boolean (default: false),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  dueDate: Date (required),
  userId: ObjectId (reference to User),
  timestamps: true
}
```

---

<div align="center">

## 🔒 Security Features

<table>
<tr>
<td align="center">🔐</td>
<td><strong>Password Hashing</strong><br/>bcrypt for secure password storage</td>
</tr>
<tr>
<td align="center">🎫</td>
<td><strong>JWT Authentication</strong><br/>Token-based user sessions</td>
</tr>
<tr>
<td align="center">🛡️</td>
<td><strong>Protected Routes</strong><br/>Middleware-based API protection</td>
</tr>
<tr>
<td align="center">✅</td>
<td><strong>Input Validation</strong><br/>Data sanitization and validation</td>
</tr>
<tr>
<td align="center">🌐</td>
<td><strong>CORS Configuration</strong><br/>Secure cross-origin requests</td>
</tr>
</table>

</div>

---

## 📱 Usage Guide

**🔹 Registration**
Create new account with username, email, and password

**🔹 Login**
Sign in with email and password

**🔹 Dashboard**
View all todos in organized list

**🔹 Create Todo**
Add new todos with title, description, priority, and due date

**🔹 Manage Todos**
Edit, complete, or delete existing todos

**🔹 Logout**
Securely end session

---

## 🎯 Development Features

- Environment-based configuration
- Comprehensive error handling
- RESTful API design
- Responsive UI components
- Real-time data updates
- Form validation and feedback

---

## 🌐 Browser Support

<p align="center">
<img src="https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" />
<img src="https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white" />
<img src="https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=safari&logoColor=white" />
<img src="https://img.shields.io/badge/Edge-0078D4?style=for-the-badge&logo=microsoftedge&logoColor=white" />
</p>

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

---

<div align="center">

## 📄 License

This project is open source and available under the **MIT License**.

---

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**⚠️ Important:** Keep your JWT secret secure and never commit sensitive environment variables to version control.

**⭐ If you find this project helpful, please give it a star! ⭐**

</div>
