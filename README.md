<div align="center">

<br/>

```
███████╗████████╗ █████╗ ██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗
██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝██║ ██╔╝
███████╗   ██║   ███████║ ╚████╔╝ ██║  ██║█████╗  ███████╗█████╔╝ 
╚════██║   ██║   ██╔══██║  ╚██╔╝  ██║  ██║██╔══╝  ╚════██║██╔═██╗ 
███████║   ██║   ██║  ██║   ██║   ██████╔╝███████╗███████║██║  ██╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
```

### **Manage smarter. Live better.**

*A modern, full-stack hostel management platform built for the real world*

<br/>

[![React](https://img.shields.io/badge/React-17.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-68A063?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux-4.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square)

<br/>

[🚀 Live Demo](#) · [📖 Documentation](#table-of-contents) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

<br/>

---

</div>

<br/>

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Why StayDesk?](#-why-staydesk)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Connect](#-connect)

<br/>

---

## 🏨 About the Project

**StayDesk** is a production-ready, full-stack hostel management platform designed to eliminate the chaos of managing hostels with paper registers, Excel sheets, and WhatsApp groups. 

Built with the **MERN stack** (MongoDB, Express, React, Node.js), StayDesk gives hostel owners, wardens, and administrators a single, clean dashboard to manage everything — from room allocation and student records to attendance tracking, complaint handling, and fee management.

> *"From managing 200 students across 50 rooms to tracking daily attendance and complaints — StayDesk handles it all in one place."*

<br/>

---

## 💡 Why StayDesk?

Most hostels in India still rely on:

| Old Way | StayDesk Way |
|---------|-------------|
| 📓 Paper registers for attendance | ✅ Digital daily attendance with history |
| 📊 Excel sheets for student records | ✅ Searchable, filterable student database |
| 📱 WhatsApp for complaints | ✅ Kanban complaint board with status tracking |
| 💵 Manual fee collection tracking | ✅ Fee tracker with overdue detection |
| 🔍 No visibility on room occupancy | ✅ Real-time room occupancy dashboard |

<br/>

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based secure authentication
- Protected routes — unauthorized users redirected to login
- Role-based access control (Admin / Warden)
- Password hashing with bcrypt
- Session persistence with localStorage tokens

---

### 📊 Dashboard
- **4 live metric cards** — Total Rooms, Occupied Rooms, Total Students, Today's Attendance %
- **Recent students** quick-view table
- **Room occupancy grid** — visual overview of all rooms (green = occupied, red = vacant)
- **Recent activity feed** — last 5 actions across the system

---

### 🏠 Room Management
- Add, edit, and delete rooms
- Set room capacity, floor number, and room type
- Visual occupancy progress bar per room
- Filter rooms: All / Occupied / Vacant / Partially Filled
- Occupancy status badges (Available / Full / Partially Filled)
- Room detail view with list of assigned students

---

### 👥 Student Management
- Complete student profiles — name, DOB, contact, email, address
- Room assignment during registration
- Real-time search and filter (by name, room number, status)
- Student status: Active / Inactive
- Multi-step "Add Student" form (Personal Info → Room Assignment → Review)
- Edit and delete with confirmation dialog
- Avatar initials auto-generated from student name

---

### 📋 Attendance Tracking
- Mark attendance **room-wise** — group all students by their room
- Present / Absent toggle per student
- **Bulk actions** — "Mark All Present" / "Mark All Absent" per room
- Date picker — view and edit any past date's attendance
- Attendance history calendar — heatmap of attendance % per day
- Download attendance data as **CSV** for any selected date

---

### 📝 Complaint Management *(New Feature)*
- Students / staff raise complaints with title, category, priority, and description
- **7 complaint categories** — Maintenance, Cleanliness, Food, Security, Electricity, Water, Other
- **Priority levels** — Low, Medium, High, Urgent (color coded)
- **Kanban board** — 4 columns: Open → In Progress → Resolved → Closed
- Admin adds resolution notes and updates status
- Filter by category, priority, and date range
- Complaint statistics on dashboard

---

### 💰 Fee / Rent Tracker *(New Feature)*
- Log monthly rent/fee for each student
- **Status tracking** — Paid / Pending / Overdue
- **Auto-overdue detection** — flags unpaid fees after the due month passes
- Record payment details — date, mode (Cash/UPI/Bank Transfer), receipt number
- Monthly summary — Total Collected / Total Pending / Total Overdue
- **Export fee report as CSV**
- Filter by month, year, and payment status

---

### 🎨 UI/UX
- Fully responsive — Mobile, Tablet, Desktop
- Professional dark-navy + coral-red design system
- Skeleton loaders on all API calls
- Toast notifications for all actions (success / error)
- Confirmation dialogs before all destructive actions
- Empty state illustrations with helpful messages
- Table pagination (10 / 25 / 50 per page)
- Smooth page transitions

<br/>

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React.js | 17.0.1 | UI framework |
| Redux | 4.x | Global state management |
| React Router | 5.x | Client-side routing |
| Material-UI | 4.x | Component library |
| Axios | latest | HTTP client |
| React Redux | 7.x | Redux bindings |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express.js | 4.x | Web framework |
| MongoDB | Atlas | Database |
| Mongoose | 6.x | ODM for MongoDB |
| JSON Web Token | latest | Authentication |
| bcryptjs | latest | Password hashing |
| dotenv | latest | Environment variables |
| cors | latest | Cross-origin requests |
| nodemon | 2.x | Dev server auto-restart |
| concurrently | latest | Run frontend + backend together |

<br/>

---

## 📁 Project Structure

```
StayDesk/
│
├── 📁 frontend/                    # React application
│   ├── 📁 public/
│   │   └── index.html              # App entry HTML
│   └── 📁 src/
│       ├── 📁 actions/             # Redux action creators
│       │   ├── attendanceActions.js
│       │   ├── roomActions.js
│       │   ├── studentActions.js
│       │   └── userActions.js
│       ├── 📁 components/          # Reusable UI components
│       │   ├── Sidebar.jsx         # Main navigation sidebar
│       │   ├── StatCard.jsx        # Dashboard metric cards
│       │   ├── ConfirmDialog.jsx   # Delete confirmation modal
│       │   └── Toast.jsx           # Notification component
│       ├── 📁 reducers/            # Redux reducers
│       │   ├── attendanceReducer.js
│       │   ├── roomReducer.js
│       │   ├── studentReducer.js
│       │   └── userReducer.js
│       ├── 📁 screens/             # Page components
│       │   ├── loginView.jsx       # Login page
│       │   ├── homeView.jsx        # Dashboard
│       │   ├── roomView.jsx        # Room management
│       │   ├── studentView.jsx     # Student management
│       │   ├── attendanceView.jsx  # Attendance tracking
│       │   ├── ComplaintView.jsx   # Complaint board (NEW)
│       │   ├── FeeView.jsx         # Fee tracker (NEW)
│       │   └── NotFound.jsx        # 404 page
│       ├── theme.js                # Material-UI custom theme
│       ├── store.js                # Redux store
│       └── App.js                  # Root component + routes
│
├── 📁 server/                      # Express backend
│   ├── 📁 controllers/             # Business logic
│   │   ├── attendanceController.js
│   │   ├── complaintController.js  # (NEW)
│   │   ├── feeController.js        # (NEW)
│   │   ├── roomController.js
│   │   ├── studentController.js
│   │   └── userController.js
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorHandler.js        # Global error handler
│   ├── 📁 models/                  # Mongoose schemas
│   │   ├── Attendance.js
│   │   ├── Complaint.js            # (NEW)
│   │   ├── Fee.js                  # (NEW)
│   │   ├── Room.js
│   │   ├── Student.js
│   │   └── User.js
│   ├── 📁 routes/                  # Express API routes
│   │   ├── attendanceRoutes.js
│   │   ├── complaintRoutes.js      # (NEW)
│   │   ├── feeRoutes.js            # (NEW)
│   │   ├── roomRoutes.js
│   │   ├── studentRoutes.js
│   │   └── userRoutes.js
│   └── index.js                    # Server entry point
│
├── .env                            # Environment variables (never commit!)
├── .gitignore
├── package.json                    # Root package (runs both)
└── README.md
```

<br/>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node --version    # v16.0.0 or higher (v16.20.0 recommended)
npm --version     # v7.0.0 or higher
git --version     # any recent version
```

> ⚠️ **Important:** This project works best on **Node.js v16**. If you have Node v18+ and face issues, use [NVM](https://github.com/coreybutler/nvm-windows) to switch versions.

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/StayDesk.git
cd StayDesk
```

**2. Install backend dependencies**
```bash
npm install
```

**3. Install frontend dependencies**
```bash
cd frontend
npm install --legacy-peer-deps
cd ..
```

> The `--legacy-peer-deps` flag is required because some packages have peer dependency conflicts with newer npm versions.

---

### Running the App

**Development mode** (runs both frontend + backend together):
```bash
npm run dev
```

This starts:
- 🟢 Backend API at `http://localhost:5000`
- 🔵 React frontend at `http://localhost:3000`

**Run backend only:**
```bash
npm run server
```

**Run frontend only:**
```bash
npm run client
```

<br/>

---

## 🔧 Environment Variables

Create a `.env` file in the **root directory** (same level as `package.json`):

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT Secret — use any long random string
JWT_SECRET=your_super_secret_key_here_make_it_long

# Frontend URL (for CORS in production)
FRONTEND_URL=http://localhost:3000
```

### How to get your MONGO_URI

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign up (free)
2. Create a free **M0 cluster** → choose **AWS Mumbai (ap-south-1)**
3. Create a database user with username + password
4. Go to **Network Access** → Add IP → Allow from Anywhere (`0.0.0.0/0`)
5. Click **Connect** → **Drivers** → **Node.js**
6. Copy the connection string and replace `<password>` with your actual password

> 🔒 **Never commit your `.env` file to GitHub.** Make sure `.env` is listed in `.gitignore`.

<br/>

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/login` | Login and get JWT token | ❌ |
| `POST` | `/api/users/register` | Register new admin | ❌ |
| `GET` | `/api/users/profile` | Get logged-in user info | ✅ |

### Rooms
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/rooms` | Get all rooms | ✅ |
| `GET` | `/api/rooms/:id` | Get room by ID | ✅ |
| `POST` | `/api/rooms` | Add new room | ✅ |
| `PUT` | `/api/rooms/:id` | Update room details | ✅ |
| `DELETE` | `/api/rooms/:id` | Delete room | ✅ |

### Students
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/students` | Get all students | ✅ |
| `GET` | `/api/students/:id` | Get student by ID | ✅ |
| `POST` | `/api/students` | Add new student | ✅ |
| `PUT` | `/api/students/:id` | Update student | ✅ |
| `DELETE` | `/api/students/:id` | Delete student | ✅ |

### Attendance
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/attendance` | Get attendance (filter by date) | ✅ |
| `POST` | `/api/attendance` | Mark attendance for a date | ✅ |
| `GET` | `/api/attendance/download` | Download attendance CSV | ✅ |

### Complaints *(New)*
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/complaints` | Get all complaints | ✅ |
| `GET` | `/api/complaints/stats` | Get complaint counts by status | ✅ |
| `POST` | `/api/complaints` | Create new complaint | ✅ |
| `PUT` | `/api/complaints/:id` | Update status / add note | ✅ |
| `DELETE` | `/api/complaints/:id` | Delete complaint | ✅ |

### Fees *(New)*
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/fees` | Get all fees (filter by month/year) | ✅ |
| `GET` | `/api/fees/stats` | Get total paid/pending/overdue | ✅ |
| `POST` | `/api/fees` | Add fee record | ✅ |
| `PUT` | `/api/fees/:id` | Mark as paid / update details | ✅ |
| `DELETE` | `/api/fees/:id` | Delete fee record | ✅ |
| `GET` | `/api/fees/export` | Export fee report as CSV | ✅ |

<br/>

---

## 📸 Screenshots

> *Add your screenshots here after running the project*

| Page | Preview |
|------|---------|
| 🔐 Login | *Add screenshot* |
| 📊 Dashboard | *Add screenshot* |
| 🏠 Rooms | *Add screenshot* |
| 👥 Students | *Add screenshot* |
| 📋 Attendance | *Add screenshot* |
| 📝 Complaints | *Add screenshot* |
| 💰 Fee Tracker | *Add screenshot* |

**To add screenshots:**
1. Take screenshots of each page while running locally
2. Create a `screenshots/` folder in the repo
3. Upload images and replace `*Add screenshot*` above with:
   ```md
   ![Dashboard](./screenshots/dashboard.png)
   ```

<br/>

---

## 🗺 Roadmap

### ✅ Completed
- [x] JWT Authentication & protected routes
- [x] Room management (CRUD)
- [x] Student management with search & filter
- [x] Daily attendance tracking with CSV download
- [x] Dashboard with live statistics
- [x] Complaint management system (Kanban board)
- [x] Fee / Rent tracker with overdue detection
- [x] Responsive design for mobile & tablet

### 🔄 In Progress
- [ ] Professional UI redesign (StayDesk theme)
- [ ] Skeleton loaders on all pages
- [ ] Toast notifications replacing all alerts

### 📅 Planned
- [ ] Email notifications for overdue fees (Nodemailer)
- [ ] SMS alerts via Twilio for emergency notices
- [ ] Mess menu management module
- [ ] Visitor log register
- [ ] Bulk student import via CSV upload
- [ ] Dark mode toggle
- [ ] Print-friendly reports (PDF export)
- [ ] Multi-hostel support (SaaS mode)

<br/>

---

## 🤝 Contributing

Contributions make open source great. Any contribution you make is **genuinely appreciated**.

**How to contribute:**

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add: AmazingFeature with brief description'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

**Commit message convention:**
```
Add: new feature description
Fix: bug description  
Update: what was changed
Remove: what was removed
```

<br/>

---

## 🐛 Found a Bug?

If you find a bug, please open an issue with:
- A clear title describing the problem
- Steps to reproduce it
- Expected vs actual behavior
- Screenshots if applicable

👉 [Open an Issue](../../issues/new)

<br/>

---

## 📄 License

Distributed under the **MIT License**.

```
MIT License — You are free to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of this software.
```

See [`LICENSE`](./LICENSE) for full details.

<br/>

---

## 👨‍💻 Connect

<div align="center">

**Built with ❤️ by Jeet Darji**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_LINKEDIN)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://YOUR_PORTFOLIO_URL)

<br/>

*If this project helped you, please consider giving it a ⭐ — it means a lot!*

</div>

<br/>

---

<div align="center">

```
StayDesk — Manage smarter. Live better.
```

*Made with React · Node · Express · MongoDB*

</div>
