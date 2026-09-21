# ✈️ TripPlanner - Full-Stack Travel Planning & Expense Management

<div align="center">

![TripPlanner Banner](https://img.shields.io/badge/TripPlanner-v1.0.0-6366f1?style=for-the-badge&logo=compass&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=black)

<p align="center">
  <b>A modern, responsive full-stack travel planner and budget manager built with the MERN stack (MongoDB, Express, React, Node.js).</b>
  <br />
  Plan itineraries day-by-day, organize activities, track expenses in multiple currencies, visualize spending breakdowns, and keep your adventures seamless.
</p>

[Key Features](#-key-features) •
[Tech Stack](#-tech-stack) •
[Project Structure](#-project-structure) •
[Quick Start](#-quick-start-local-development) •
[API Reference](#-api-endpoints) •
[Deployment Guide](#-deployment-guide)

</div>

---

## 🌟 Key Features

- **🗺️ Intuitive Trip Dashboard**: View all upcoming, ongoing, and completed trips at a glance with destination tags, date countdowns, traveler counts, and quick budget indicators.
- **📅 Day-by-Day Itinerary Builder**:
  - Automatically calculates trip duration and organizes activities by individual calendar days.
  - Categorize activities by type (*Attraction, Restaurant, Hotel, Transport, Shopping, Other*).
  - Chronological time scheduling, estimated costs, exact locations, and custom travel notes.
- **💰 Smart Expense & Budget Tracker**:
  - Log expenses categorized by *Food, Transport, Accommodation, Activities, Shopping, and Other*.
  - Real-time budget progress bar with warning indicators when approaching or exceeding limits.
  - Interactive spending visualization charts powered by **Recharts** (category distributions and totals).
- **🔄 Multi-Currency Support**: Plan in USD ($), EUR (€), GBP (£), JPY (¥), INR (₹), and more.
- **⚡ Resilient & Cold-Start Friendly**:
  - Axios configured with a 60-second timeout to gracefully handle Render free-tier cold starts.
  - Automatic MongoDB database initialization and seeding on first run.
  - Built-in fallback demo data in Zustand store to ensure UI responsiveness at all times.
- **📱 Fully Responsive Design**: Crafted with modern Tailwind CSS, Lucide icons, glassmorphism UI accents, modal sheets, and smooth notifications with `react-hot-toast`.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Core Framework**: React 18 (Vite SPA)
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **State Management**: Zustand
- **Routing**: React Router DOM v6 (with client rewrites configured for Vercel)
- **Charts & Visuals**: Recharts
- **Icons & Notifications**: Lucide React, React Hot Toast
- **HTTP Client**: Axios (with smart API URL normalization & timeout handling)

### Backend (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4
- **Database & ODM**: MongoDB Atlas & Mongoose 8
- **Middleware**: CORS (dynamic origin matching), Morgan (HTTP request logger), Dotenv
- **Data Seeder**: Pre-configured rich travel data for rapid demo testing

---

## 📁 Project Structure

```text
TripPlanner/
├── client/                     # Frontend React + Vite application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # Reusable UI components (Modals, Cards, Charts, Navbar)
│   │   ├── pages/              # Route pages (Dashboard, CreateTrip, TripOverview, Itinerary, Expenses)
│   │   ├── services/           # Axios API services (api.js, tripService.js, activityService.js, expenseService.js)
│   │   ├── store/              # Zustand global state store (tripStore.js)
│   │   ├── utils/              # Helper functions & date/currency formatters
│   │   ├── App.jsx             # Main router & app layout
│   │   ├── index.css           # Tailwind CSS styles & custom utility classes
│   │   └── main.jsx            # React root mount
│   ├── .env.example            # Frontend environment variable template
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── vercel.json             # Vercel SPA routing rewrites
│   ├── vite.config.js          # Vite config with local dev proxy
│   └── package.json
│
├── server/                     # Backend Express.js REST API
│   ├── src/
│   │   ├── config/             # Database connection (db.js)
│   │   ├── controllers/        # Request handlers (trip, activity, expense)
│   │   ├── models/             # Mongoose schemas (Trip, Activity, Expense)
│   │   ├── routes/             # REST API routes
│   │   ├── seeds/              # Sample data generator (seedData.js)
│   │   └── server.js           # Express app entrypoint & middleware
│   ├── .env.example            # Backend environment variable template
│   └── package.json
│
├── .gitignore                  # Git ignore rules for node_modules, .env secrets, and builds
├── package.json                # Root package.json with concurrent dev scripts
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance running on `mongodb://localhost:27017/tripplanner`)
- [Git](https://git-scm.com/)

---

### 1. Clone & Setup Workspace

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd TripPlanner
```

### 2. Backend Setup (`/server`)

1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the `server` directory:
   ```bash
   # Windows PowerShell:
   Copy-Item .env.example .env
   # Or Bash:
   cp .env.example .env
   ```

3. Configure your `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tripplanner?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   > The API will start on **`http://localhost:5000`**. On first boot, it will automatically connect to MongoDB and seed initial sample trips!

---

### 3. Frontend Setup (`/client`)

1. Open a second terminal and navigate to the client folder:
   ```bash
   cd client
   npm install
   ```

2. Create a `.env` file in the `client` directory (optional for local dev, defaults to `/api` proxy):
   ```bash
   # Windows PowerShell:
   Copy-Item .env.example .env
   # Or Bash:
   cp .env.example .env
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > The client will run on **`http://localhost:5173`** with hot module reloading.

---

## 📡 API Endpoints

### System & Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status check and available routes |
| `GET` | `/api/health` | Health check endpoint |
| `POST` | `/api/seed` | Reset & re-seed database with sample trips |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | Fetch all trips |
| `POST` | `/api/trips` | Create a new trip |
| `GET` | `/api/trips/:id` | Fetch single trip with nested activities & expenses |
| `PUT` | `/api/trips/:id` | Update trip details |
| `DELETE` | `/api/trips/:id` | Delete trip and cascade delete its activities & expenses |

### Activities
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/activities` | Fetch all activities for a trip |
| `POST` | `/api/trips/:tripId/activities` | Add an activity to a trip |
| `PUT` | `/api/activities/:id` | Update an activity |
| `DELETE` | `/api/activities/:id` | Delete an activity |

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips/:tripId/expenses` | Fetch all expenses for a trip |
| `POST` | `/api/trips/:tripId/expenses` | Log an expense for a trip |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |

---

## 🌐 Deployment Guide

This project is architected for seamless multi-cloud deployment:
- **Backend**: Hosted on [Render](https://render.com/) (Node.js Web Service)
- **Database**: Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Frontend**: Hosted on [Vercel](https://vercel.com/) (High-speed Global Edge CDN)

### Step 1: Push Code to GitHub
Ensure all code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: complete TripPlanner application"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Deploy Backend to Render
1. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Name**: `tripplanner-api` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables**:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/tripplanner?retryWrites=true&w=majority`
   - `CLIENT_URL` = `*` (or your Vercel URL once generated)
5. Click **Deploy Web Service**. Once deployed, copy your backend URL (e.g., `https://tripplanner-api.onrender.com`).

### Step 3: Deploy Frontend to Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/) and click **Add New...** -> **Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select **`client`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-render-service-name>.onrender.com/api`
5. Click **Deploy**.
6. Once deployed, test your live application! Update `CLIENT_URL` on Render with your live Vercel URL (e.g. `https://your-trip-planner.vercel.app`) to lock down CORS if desired.

---

## 🔐 Environment Variables Reference

### Backend (`server/.env`)
| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | Optional | Port for the Express server (Render sets this dynamically) | `5000` |
| `MONGODB_URI` | **Yes** | MongoDB Atlas connection URI with credentials | `mongodb+srv://user:pass@cluster.mongodb.net/tripplanner` |
| `CLIENT_URL` | Optional | Allowed CORS origin (Vercel domain in production) | `https://tripplanner.vercel.app` |

### Frontend (`client/.env` or Vercel Environment Variables)
| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | **Yes (Prod)** | Full URL of the deployed Render backend API | `https://tripplanner-api.onrender.com/api` |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ for passionate travelers worldwide.</sub>
</div>
