# Team Task Manager 🚀

A comprehensive, production-ready Full-Stack Project Management application designed for high-performance team collaboration. This application features a robust Express.js backend, a modern React frontend, and role-based access control (RBAC) to streamline task delegation and tracking.

---

## 🌟 Key Features

### Authentication & Authorization
- **Secure Auth**: JWT-based authentication with password hashing (Bcrypt).
- **Profile Management**: Update personal details (Name, Email) and change password.
- **Team Management**: View organizational members, change roles (Admin/Member), and remove users.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` and `MEMBER` roles.
- **Protected Routes**: Secure navigation for authenticated users only.

### Admin Capabilities
- **Project Management**: Create, edit, and delete projects. Deletion automatically cleans up associated tasks.
- **Team Management**: Add existing members to specific projects.
- **Task Delegation**: Create, describe, and assign tasks to team members with due dates.
- **Task Management**: Full edit capabilities for task title, description, due date, priority, and assignee.
- **Task Deletion**: Secure removal of tasks with confirmation prompts.
- **Global Overview**: Access to all project and task data.

### Member Capabilities
- **Personalized View**: See only tasks assigned directly to you.
- **Status Updates**: Update task progress (Pending, In Progress, Completed).
- **Project Context**: View project details for assigned tasks.

### Analytics Dashboard
- **Real-time Stats**: Track Total, Completed, Pending, and Overdue tasks.
- **Progress Visualization**: Visual completion rate indicator.
- **Role-Specific Data**: Admins see global stats; Members see personal stats.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (with Glassmorphism & Premium UI)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API (AuthContext)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod (Request body validation)
- **Security**: JWT, BcryptJS, CORS, Morgan

---

## 📁 Folder Structure

```text
team-task-manager/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Cards, ProtectedRoute)
│   │   ├── context/        # Auth state management
│   │   ├── pages/          # View components (Dashboard, Projects, etc.)
│   │   ├── services/       # Axios API configuration
│   │   └── utils/          # Frontend helpers
│   └── .env.example        # Client environment template
├── server/                 # Express Backend
│   ├── prisma/             # DB Schema & Migrations
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth, Roles, Error handling
│   │   ├── routes/         # API Endpoint definitions
│   │   └── utils/          # Prisma client & utility functions
│   └── .env.example        # Server environment template
└── README.md               # Project Documentation
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your_secure_random_secret"
JWT_EXPIRES_IN="7d"
PORT=5000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

### Frontend (`client/.env`)
```env
VITE_API_URL="http://127.0.0.1:5000/api"
```

---

## 🚀 Local Setup

### Step 1: Clone & Install
```bash
# Clone the repository
git clone [YOUR_REPO_URL]
cd team-task-manager

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### Step 2: Database Initialization
```bash
# In server directory
npx prisma generate
npx prisma migrate dev --name init
```

### Step 3: Start Application
**Run Backend:**
```bash
cd server
npm run dev
```

**Run Frontend:**
```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user (Admin/Member)
- `POST /api/auth/login` - Authenticate user & get token

### Projects (Admin Only)
- `GET /api/projects` - Get all projects (Filtered for Members)
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details with members & tasks
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `GET /api/tasks` - Get assigned tasks (Member) or all tasks (Admin)
- `POST /api/tasks` - Create and assign task (Admin Only)
- `PATCH /api/tasks/:id/status` - Update task status (Member/Admin)
- `DELETE /api/tasks/:id` - Delete task (Admin Only)

### Dashboard
- `GET /api/dashboard/stats` - Get role-based analytics summary

---

## 🧪 Testing
The project includes a comprehensive E2E user flow test script.
```bash
cd server
node test-user-flow.js
```

---

## ☁️ Deployment (Railway)

### Backend Deployment
1. Connect your GitHub repository to Railway.
2. Set the Root Directory to `server`.
3. Add Environment Variables from your `.env`.
4. Railway will automatically detect the `start` script.

### Frontend Deployment
1. Connect the same repo as a new service.
2. Set the Root Directory to `client`.
3. Add `VITE_API_URL` pointing to your deployed Backend URL.
4. Set Build Command: `npm run build`.
5. Set Publish Directory: `dist`.

---

## 🔗 Links
- **GitHub Repository**: [Your Link Here]
- **Live Demo**: [Your Link Here]

---
**Developed with ❤️ for Full-Stack Assessment.**
